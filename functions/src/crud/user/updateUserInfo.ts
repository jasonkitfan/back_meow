import { Response } from "express";
import { db } from "../../config/firebase";
import { AuthRequest } from "../../validation/user";

const updateUserInfo = async (req: AuthRequest, res: Response) => {
  const userRef = await db
    .collection("users")
    .where("uid", "==", req.uid)
    .get();
  const user = userRef.docs[0].ref;
  await user.update({
    name: req.body.name,
    email: req.body.email,
  });
  return res.status(200).send({
    status: "success",
    message: "user data has been updated",
  });
};

export default updateUserInfo;
