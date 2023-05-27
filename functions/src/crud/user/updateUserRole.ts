import { Response } from "express";
import { db } from "../../config/firebase";
import { AuthRequest } from "../../validation/user";

const updateUserRole = async (req: AuthRequest, res: Response) => {
  const uid = req.uid;
  const code = req.body.code;

  // get the new role of the user if the code is exist in db
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

  // get the user data
  const usersRef = db.collection("users");
  const query = usersRef.where("uid", "==", uid);
  query
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        return res.status(404).send({
          status: "failed",
          message: "No matching documents",
        });
      } else {
        // update the new role
        const docRef = querySnapshot.docs[0].ref;
        const updateData = { role: newRole };
        docRef
          .update(updateData)
          .then(() => {
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
