import { Response } from "express";
import { db } from "../../config/firebase";
import { Request } from "../../config/interface";

const deleteCat = async (req: Request, res: Response) => {
  const { entryId } = req.params;

  try {
    const entry = db.collection("entries").doc(entryId);
    await entry.delete();

    return res.status(200).json({
      status: "success",
      message: "entry deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error_message: error,
    });
  }
};

export { deleteCat };
