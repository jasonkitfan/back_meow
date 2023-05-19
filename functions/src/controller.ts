import { Response } from "express";
import { db } from "./config/firebase";

type EntryType = {
  title: string;
  text: string;
};

type Request = {
  body: EntryType;
  params: {
    entryId: string;
  };
};

const addEntry = async (req: Request, res: Response) => {
  const { title, text } = req.body;
  try {
    const entry = db.collection("entries").doc();
    const entryObject = {
      id: entry.id,
      title,
      text,
    };

    entry.set(entryObject);

    res.status(200).send({
      status: "success",
      message: "entry added",
      data: entryObject,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message);
    } else {
      res.status(500).send({
        message: "unknown error",
      });
      console.log(error);
    }
  }
};

export { addEntry };
