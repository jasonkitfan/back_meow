import { Response } from "express";
import { db } from "../../config/firebase";
import { AuthRequest } from "../../validation/user";

const adoptCat = async (req: AuthRequest, res: Response) => {
  console.log("start adopting cat");
  console.log(req.body);

  try {
    // change the adoptable boolean to false in db
    const entry = db.collection("cat").doc(req.body.id);
    const doc = await entry.get();

    // check if the cat is still adoptable first
    if (doc.data()!.adoptable === false) {
      return res.status(500).send({
        status: "failed",
        message: "This cat has been adopted",
      });
    }

    // adoptable process continue
    const entryObject = {
      adoptable: false,
    };
    await entry.update(entryObject);

    // create a adoption record in db
    const newRecord = {
      catId: req.body.id,
      catName: req.body.name,
      catBreed: req.body.breed,
      catGender: req.body.gender,
      catDob: req.body.dob,
      catImageUrl: req.body.imageUrl,
      catPickUpDate: req.body.pickUpDate,
      pickUpOwner: req.uid,
      createAt: Date.now(),
    };
    console.log(newRecord);

    console.log("creating new adoption record");
    await db.collection("adoption").doc().set(newRecord);

    // return success status
    return res.status(200).json({
      status: "success",
      message: "cat adopt success",
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: `unable to adopt with error: ${error}`,
    });
  }
};

export { adoptCat };
