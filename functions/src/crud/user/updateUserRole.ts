import { Response } from "express";
import { db } from "../../config/firebase";
import { AuthRequest } from "../../validation/user";

/**
 * Updates the role of the specified user in the database based on a code and sends a JSON response to the client with the new role.
 * @async
 * @function
 * @param {AuthRequest} req - The authenticated HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns {Promise<void>}
 */
const updateUserRole = async (req: AuthRequest, res: Response) => {
  // Get the UID and code from the request body
  const uid = req.uid;
  const code = req.body.code;

  // Get the new role for the user based on the code
  let newRole: string;
  const findCode = await db.collection("code").where("code", "==", code).get();
  if (findCode.docs.length === 0) {
    return res.status(404).send({
      status: "failed",
      message: "Code not found",
    });
  } else {
    const doc = findCode.docs[0];
    newRole = doc.data().role;
  }

  // Query the "users" collection for the user with the specified UID
  const usersRef = db.collection("users");
  const query = usersRef.where("uid", "==", uid);

  // Execute the query and update the user's role in the database
  query
    .get()
    .then((querySnapshot) => {
      // If no matching document is found, send a 404 error response to the client
      if (querySnapshot.empty) {
        return res.status(404).send({
          status: "failed",
          message: "No matching documents",
        });
      } else {
        // Update the new role
        const docRef = querySnapshot.docs[0].ref;
        const updateData = { role: newRole };
        docRef
          .update(updateData)
          .then(() => {
            // If the update is successful, send a 200 success response to the client with the new role
            return res.status(200).send({
              status: "success",
              message: "Role successfully updated!",
              role: newRole,
            });
          })
          .catch((error) => {
            return res.status(500).send({
              status: "failed",
              message: error.message,
            });
          });
      }
    })
    .catch((error) => {
      return res.status(500).send({
        status: "failed",
        message: error.message,
      });
    });
};

export { updateUserRole };
