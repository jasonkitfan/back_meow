import { Response } from "express";
import { db } from "../../config/firebase";
import { AuthRequest } from "../../validation/user";

/**
 * Retrieves the specified user's information from the database and sends a JSON response to the client with the user's name, email, and role.
 * @async
 * @function
 * @param {AuthRequest} req - The authenticated HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
const getUserInfo = async (req: AuthRequest, res: Response) => {
  console.log("getting user infomation");

  try {
    // Query the "users" collection for the user with the specified UID
    const snapshot = await db
      .collection("users")
      .where("uid", "==", req.uid)
      .limit(1)
      .get();

    // If no user is found, send a 404 response
    if (snapshot.docs.length === 0) {
      console.log("No user found");
      return res.status(404).send("User not found");
    }

    // Get the user's data from the snapshot
    const userData = snapshot.docs[0].data();

    // Send a success response with the user's name, email, and role
    return res.status(200).send({
      name: userData.name,
      email: userData.email,
      role: userData.role,
    });
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error getting user data:", error);
    return res.status(500).send("Error getting user data");
  }
};

export default getUserInfo;
