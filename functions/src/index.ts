import * as functions from "firebase-functions";
import * as express from "express";
import { addEntry } from "./controller";

const app = express();

app.get("/", (req, res) => res.status(200).send("hello"));
app.post("/entries", addEntry);

exports.app = functions.region("asia-east2").https.onRequest(app);
