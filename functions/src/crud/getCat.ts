import { Response } from "express";
import { db } from "../config/firebase";
import { Request, EntryType } from "../config/interface";

const getCat = async (req: Request, res: Response) => {
  try {
    const allEntries: EntryType[] = [];
    const querySnapshot = await db.collection("adoption").get();
    querySnapshot.forEach((doc: any) => allEntries.push(doc.data()));
    return res.status(200).json(allEntries);
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: error,
    });
  }
};

export { getCat };
