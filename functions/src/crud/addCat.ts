import { Response } from "express";
import { admin, db } from "../config/firebase";
import { Request } from "../config/interface";

const addCat = async (req: Request, res: Response) => {
  const { name, breed, gender, dateOfBirth, imageUrl } = req.body;

  try {
    const entry = db.collection("adoption").doc();
    const entryObject = {
      id: entry.id,
      name: name,
      breed: breed,
      gender: gender,
      dob: dateOfBirth,
      image_url: "",
      createAt: Date.now(),
      adoptable: true,
    };

    const destinationPath = `/cats/${entry.id}.jpg`;
    const bucket = admin.storage().bucket();
    const buffer = Buffer.from(imageUrl, "base64");
    const file = bucket.file(destinationPath);
    const stream = file.createWriteStream({
      metadata: {
        contentType: "image/jpeg", // or 'image/png', 'image/gif', etc.
      },
    });
    stream.end(buffer);

    entry.set(entryObject);

    res.status(200).send({
      status: "success",
      message: "cat added",
      data: entryObject,
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({
        error: e.message,
        data: [name, breed, gender, dateOfBirth, imageUrl],
      });
    } else {
      res.status(500).send({
        message: "unknown error",
      });
      console.log(e);
    }
  }
};

export { addCat };
