import { Response } from "express";
import { db } from "../../config/firebase";
import { AuthRequest } from "../../validation/user";

/**
 * Updates the specified user's information in the database and sends a JSON response to the client with a success message.
 * @async
 * @function
 * @param {AuthRequest} req - The authenticated HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
const updateUserInfo = async (req: AuthRequest, res: Response) => {
  // Get a reference to the user document in the "users" collection with the specified UID
  const userRef = await db
    .collection("users")
    .where("uid", "==", req.uid)
    .get();
  const user = userRef.docs[0].ref;

  // Update the user's name and email in the database
  await user.update({
    name: req.body.name,
    email: req.body.email,
  });
  // Send a success response with a status message
  return res.status(200).send({
    status: "success",
    message: "user data has been updated",
  });
};

export default updateUserInfo;
