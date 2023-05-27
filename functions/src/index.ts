import * as functions from "firebase-functions";
import * as express from "express";
import { addCat } from "./crud/addCat";
import { getCat } from "./crud/getCat";
import { updateCat } from "./crud/updateCat";
import { deleteCat } from "./crud/deleteCat";
import { updateUserRole } from "./crud/updateUserRole";
import { validUser } from "./validation/user";

const app = express();

// Add CORS middleware
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.post("/shelter", addCat);
app.get("/shelter", getCat);
app.patch("/shelter/:entryId", updateCat);
app.delete("/shelter/:entryId", deleteCat);
app.post("/shelter/userRole", validUser, updateUserRole);

exports.app = functions.region("asia-east2").https.onRequest(app);
