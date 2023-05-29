import * as functions from "firebase-functions";
import express from "express";
import { addCat } from "./crud/cat/addCat";
import { getCat } from "./crud/cat/getCat";
import { updateCat } from "./crud/cat/updateCat";
import { deleteCat } from "./crud/cat/deleteCat";
import { updateUserRole } from "./crud/user/updateUserRole";
import { validUser } from "./validation/user";
import updateUserInfo from "./crud/user/updateUserInfo";
import getUserInfo from "./crud/user/getUserInfo";
import { adoptCat } from "./crud/cat/adoptCat";
import { getAdoptionRecord } from "./crud/cat/getAdoptionRecord";
import { handlePayment } from "./payment/stripePayment";
import { getBreedInfo } from "./catBreedDetection/zyla";
import { serve, setup } from "swagger-ui-express";
import YAML from "yamljs";

const app = express();
const swaggerDocument = YAML.load("src/documentation/openai.yaml");

// Add CORS middleware
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// set up documentation
app.use("/api-docs", serve);
app.get(
  "/api-docs",
  setup(swaggerDocument, { swaggerOptions: { url: "/api-docs" } })
);

// new visitor
app.get("/shelter", getCat);

// stripe payment
app.post("/shelter/donate", handlePayment);

// registed user
app.post("/shelter/adoptCat", validUser, adoptCat);
app.get("/shelter/adoptCat", validUser, getAdoptionRecord);

// employee
app.post("/shelter", validUser, addCat);
app.post("/shelter/modifyCat", validUser, updateCat);
app.delete("/shelter/:entryId", validUser, deleteCat);

// all registed user
app.post("/shelter/userRole", validUser, updateUserRole);
app.post("/shelter/userInfo", validUser, updateUserInfo);
app.get("/shelter/userInfo", validUser, getUserInfo);

// identify cat breed
app.post("/shelter/identifyBreed", validUser, getBreedInfo);

exports.app = functions.region("asia-east2").https.onRequest(app);
