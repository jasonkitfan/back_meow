import { Response } from "express";
import { db } from "../../config/firebase";
import { Request } from "../../config/interface";

const updateCat = async (req: Request, res: Response) => {
  console.log("start updating cat info");
  const {
    body: { id, name, breed, gender, dateOfBirth, imageUrl },
  } = req;

  try {
    const entry = db.collection("cat").doc(id);
    const currentData = (await entry.get()).data() || {};
    const entryObject = {
      id: id || currentData.id,
      name: name || currentData.name,
      breed: breed || currentData.breed,
      gender: gender || currentData.breed,
      dob: dateOfBirth || currentData.dob,
      image_url: imageUrl || currentData.image_url,
    };
    await entry.update(entryObject);

    return res.status(200).json({
      status: "success",
      message: "entry updated successfully",
      data: entryObject,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error,
    });
  }
};

export { updateCat };
