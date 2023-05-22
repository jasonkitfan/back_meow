import * as functions from "firebase-functions";
import * as express from "express";
import { addEntry, getCatList, updateEntries, deleteEntry } from "./controller";

const app = express();

// Add CORS middleware
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.post("/shelter", addEntry);
app.get("/shelter", getCatList);
app.patch("/shelter/:entryId", updateEntries);
app.delete("/shelter/:entryId", deleteEntry);

exports.app = functions.region("asia-east2").https.onRequest(app);
