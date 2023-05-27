import { Response } from "express";
import { db } from "../../config/firebase";
import { AuthRequest } from "../../validation/user";

const getUserInfo = async (req: AuthRequest, res: Response) => {
  console.log("getting user infomation");
  try {
    const snapshot = await db
      .collection("users")
      .where("uid", "==", req.uid)
      .limit(1)
      .get();
    if (snapshot.docs.length === 0) {
      console.log("No user found");
      return res.status(404).send("User not found");
    }
    const userData = snapshot.docs[0].data();
    console.log("User data:", userData);
    console.log(userData.name);
    console.log(userData.email);
    return res.status(200).send({
      name: userData.name,
      email: userData.email,
      role: userData.role,
    });
  } catch (error) {
    console.error("Error getting user data:", error);
    return res.status(500).send("Error getting user data");
  }
};

export default getUserInfo;
