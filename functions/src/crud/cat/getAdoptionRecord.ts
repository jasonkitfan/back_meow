import { Response } from "express";
import { db } from "../../config/firebase";
import { AuthRequest } from "../../validation/user";
import { AdoptionRecord } from "../../config/interface";

const getAdoptionRecord = (req: AuthRequest, res: Response) => {
  console.log("getting the adoption history");

  db.collection("adoption")
    .where("pickUpOwner", "==", req.uid)
    .get()
    .then((querySnapshot) => {
      console.log("finished query");

      if (querySnapshot.docs.length === 0) {
        console.log("no record found");
        return res.status(404).send("No adoption record found");
      } else {
        console.log("document found");
        console.log("getting the data");

        const allEntries: AdoptionRecord[] = [];

        querySnapshot.forEach((doc: any) => allEntries.push(doc.data()));

        // sort the array by createAt field in descending order as firebase not allow to use orderBy with different field
        allEntries.sort((a, b) => b.createAt - a.createAt);

        return res.status(200).json(allEntries);
      }
    })
    .catch((error) => {
      console.log("unable to get the adoption record", error);
      return res.status(500).send({
        status: "failed",
        message: `unable to get the adoption record, error: ${error}`,
      });
    });
};

export { getAdoptionRecord };
