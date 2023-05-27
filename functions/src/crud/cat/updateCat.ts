import { Response } from "express";
import { db } from "../../config/firebase";
import { Request } from "../../config/interface";

const updateCat = async (req: Request, res: Response) => {
  const {
    body: { name, breed, gender, dateOfBirth, imageUrl },
    params: { entryId },
  } = req;

  try {
    const entry = db.collection("entries").doc(entryId);
    const currentData = (await entry.get()).data() || {};
    const entryObject = {
      name: name || currentData.name,
      breed: breed || currentData.breed,
      gender: gender || currentData.breed,
      dob: dateOfBirth || currentData.dob,
      image_url: imageUrl || currentData.image_url,
    };
    await entry.set(entryObject);

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
