import { Response } from "express";
import { db } from "../../config/firebase";
import { Request } from "../../config/interface";

/**
 * Deletes a cat entry from the database with the specified ID, then sends a JSON response to the client with the status and message of the deletion.
 * @async
 * @function
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
const deleteCat = async (req: Request, res: Response) => {
  console.log("start deleting cat");
  // Get the ID of the cat entry to delete from the request parameters
  const { entryId } = req.params;

  try {
    // Delete the cat entry from the "cat" collection with the specified ID
    const entry = db.collection("cat").doc(entryId);
    await entry.delete();

    // Send a success response with the status and message of the deletion
    return res.status(200).json({
      status: "success",
      message: "entry deleted successfully",
    });
  } catch (error) {
    // Handle errors and send an error response
    return res.status(500).json({
      error_message: error,
    });
  }
};

export { deleteCat };
