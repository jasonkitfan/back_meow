import * as functions from "firebase-functions";
import * as express from "express";
import {
  addEntry,
  getAllEntries,
  updateEntries,
  deleteEntry,
} from "./controller";

const app = express();

app.get("/", (req, res) => res.status(200).send("hello"));
app.post("/entries", addEntry);
app.get("/entries", getAllEntries);
app.patch("/entries/:entryId", updateEntries);
app.delete("/entries/:entryId", deleteEntry);

exports.app = functions.region("asia-east2").https.onRequest(app);
