import { Response } from "express";
import { db } from "../../config/firebase";
import { Request } from "../../config/interface";

/**
 * Updates the cat entry with the specified ID in the database, then sends a JSON response to the client with the status and updated data.
 * @async
 * @function
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
const updateCat = async (req: Request, res: Response) => {
  console.log("start updating cat info");

  // Get the ID, name, breed, gender, date of birth, and image URL from the request body
  const {
    body: { id, name, breed, gender, dateOfBirth, imageUrl },
  } = req;

  try {
    // Get the cat entry from the "cat" collection with the specified ID
    const entry = db.collection("cat").doc(id);

    // Get the current data for the cat entry
    const currentData = (await entry.get()).data() || {};

    // Create an object with the updated data for the cat entry
    const entryObject = {
      id: id || currentData.id,
      name: name || currentData.name,
      breed: breed || currentData.breed,
      gender: gender || currentData.breed,
      dob: dateOfBirth || currentData.dob,
      image_url: imageUrl || currentData.image_url,
    };

    // Update the cat entry in the "cat" collection with the updated data
    await entry.update(entryObject);

    // Send a success response with the status, message, and updated data
    return res.status(200).json({
      status: "success",
      message: "entry updated successfully",
      data: entryObject,
    });
  } catch (error) {
    // Handle errors and send an error response
    return res.status(500).json({
      status: "failed",
      message: error,
    });
  }
};

export { updateCat };
