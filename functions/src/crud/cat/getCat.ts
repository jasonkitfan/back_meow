import { Response } from "express";
import { db } from "../../config/firebase";
import { Request, EntryType } from "../../config/interface";

/**
 * Retrieves all cat entries from the database, sorts them by the "createAt" field in descending order, and sends a JSON response to the client with the entries.
 * @async
 * @function
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
const getCat = async (req: Request, res: Response) => {
  try {
    // Create an empty array to hold the cat entries
    const allEntries: EntryType[] = [];

    // Query the "cat" collection for all entries, ordered by the "createAt" field in descending order
    const querySnapshot = await db
      .collection("cat")
      .orderBy("createAt", "desc")
      .get();

    // Loop through the query snapshot and add each entry to the array
    querySnapshot.forEach((doc: any) => allEntries.push(doc.data()));

    // Send a success response with the cat entries
    return res.status(200).json(allEntries);
  } catch (error) {
    // Handle errors and send an error response
    return res.status(500).send({
      status: "failed",
      message: error,
    });
  }
};

export { getCat };
