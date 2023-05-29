import { Response } from "express";
import { db } from "../../config/firebase";
import { AuthRequest } from "../../validation/user";
import { AdoptionRecord } from "../../config/interface";

/**
 * Retrieves the adoption history for the authenticated user, sorts the records by the "createAt" field in descending order, and sends a JSON response to the client with the adoption records.
 * @function
 * @param {AuthRequest} req - The authenticated HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {void}
 */
const getAdoptionRecord = (req: AuthRequest, res: Response) => {
  console.log("getting the adoption history");

  // Query the "adoption" collection for records where the "pickUpOwner" field matches the authenticated user's UID
  db.collection("adoption")
    .where("pickUpOwner", "==", req.uid)
    .get()
    .then((querySnapshot) => {
      console.log("finished query");

      // If no records are found, send a 404 response
      if (querySnapshot.docs.length === 0) {
        console.log("no record found");
        return res.status(404).send("No adoption record found");
      } else {
        console.log("document found");
        console.log("getting the data");

        // Create an empty array to hold the adoption records
        const allEntries: AdoptionRecord[] = [];

        // Loop through the query snapshot and add each record to the array
        querySnapshot.forEach((doc: any) => allEntries.push(doc.data()));

        // Sort the array by the "createAt" field in descending order (Firebase does not allow "orderBy" with different fields)
        allEntries.sort((a, b) => b.createAt - a.createAt);

        // Send a success response with the adoption records
        return res.status(200).json(allEntries);
      }
    })
    .catch((error) => {
      // Handle errors and send an error response
      console.log("unable to get the adoption record", error);
      return res.status(500).send({
        status: "failed",
        message: `unable to get the adoption record, error: ${error}`,
      });
    });
};

export { getAdoptionRecord };
