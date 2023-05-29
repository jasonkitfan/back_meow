import { Request, Response, NextFunction } from "express";
import { admin } from "../config/firebase";

interface AuthRequest extends Request {
  uid?: string;
}

const validUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("validating user");
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (token) {
      admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
          req.uid = decodedToken.uid;
          console.log("valid user");
          next();
        })
        .catch((error) => {
          return res.status(401).send({
            status: "failed",
            message: "Invalid token",
          });
        });
    } else {
      return res.status(401).send({
        status: "failed",
        message: "Missing token",
      });
    }
  } catch (e) {
    return res.status(500).send({
      status: "failed",
      message: e,
    });
  }
};

export { validUser, AuthRequest };
