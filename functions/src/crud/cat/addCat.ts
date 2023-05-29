import { Response } from "express";
import { admin, db } from "../../config/firebase";
import { Request } from "../../config/interface";

/**
 * Adds a new cat to the database and uploads its image to Cloud Storage, then sends a JSON response to the client with the status and data of the new cat.
 * @async
 * @function
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
const addCat = async (req: Request, res: Response) => {
  const { name, breed, gender, dateOfBirth, imageUrl } = req.body;

  try {
    // Create a new entry in the "cat" collection with the cat's information
    const entry = db.collection("cat").doc();
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

    // Set path and convert base 64 image
    const destinationPath = `cats/${entry.id}.jpg`;
    const bucket = admin.storage().bucket();
    const base64Data = imageUrl.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ""
    );
    const buffer = Buffer.from(base64Data, "base64");
    const file = bucket.file(destinationPath);

    // Upload the file to Cloud Storage
    await file.save(buffer, {
      metadata: {},
      contentType: "image/jpeg",
    });

    // Get the signed URL for the file
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: "03-17-2025",
    });

    // Update the entry with the image URL
    entryObject.image_url = url;
    await entry.set(entryObject);

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
