import * as functions from "firebase-functions";
import * as express from "express";
import { addCat } from "./crud/cat/addCat";
import { getCat } from "./crud/cat/getCat";
import { updateCat } from "./crud/cat/updateCat";
import { deleteCat } from "./crud/cat/deleteCat";
import { updateUserRole } from "./crud/user/updateUserRole";
import { validUser } from "./validation/user";
import updateUserInfo from "./crud/user/updateUserInfo";
import getUserInfo from "./crud/user/getUserInfo";

const app = express();

// Add CORS middleware
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.post("/shelter", validUser, addCat);
app.get("/shelter", getCat);
app.post("/shelter/modifyCat", validUser, updateCat);
app.delete("/shelter/:entryId", validUser, deleteCat);

app.post("/shelter/userRole", validUser, updateUserRole);
app.post("/shelter/userInfo", validUser, updateUserInfo);
app.get("/shelter/userInfo", validUser, getUserInfo);

exports.app = functions.region("asia-east2").https.onRequest(app);
