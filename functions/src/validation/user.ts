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
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (token) {
      admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
          req.uid = decodedToken.uid;
          next();
        })
        .catch((error) => {
          return res.status(500).send({
            status: "failed",
            message: "invalid token",
          });
        });
    } else {
      return res.status(500).send({
        status: "failed",
        message: "missing token",
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
