import express from "express";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import mongoose, { Schema } from "mongoose";
import { config as envConfig } from "dotenv";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";
import { readFile } from "fs/promises";
import { createUser } from "./utils/driver.js";
import { User } from "./app/models.js";

envConfig();

const app = express();
app.use(express.json());
const port = 5000;

mongoose
  .connect("mongodb://localhost:27017/dexity")
  .then(console.log("Connected to the MongoDB database"))
  .catch((e) => console.log("Error starting database " + e));

const serviceAccount = JSON.parse(
  await readFile(new URL("serviceAccountKey.json", import.meta.url))
);
const firebaseApp = initializeApp({
  credential: admin.credential.cert(serviceAccount),
}); // firebase
const auth = getAuth(firebaseApp);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const config = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {  
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(config);

app.get("/api/create_link_token", async (req, res) => {
  const tokenResponse = await plaidClient.linkTokenCreate({
    user: { client_user_id: "blahblah" },
    client_name: "Dexity",
    language: "en",
    products: ["transactions"],
    country_codes: ["US"],
  });
  console.log(tokenResponse.data);
  res.json(tokenResponse.data);
});

const assertAuthenticated = async (token) => {
  try {
    const resp = await auth.verifyIdToken(token);
    return resp.uid;
  } catch (e) {
    console.log(e);
    return null;
  }
};

// Exchanges the public token from Plaid Link for an access token
app.post("/api/exchange_public_token", async (req, res) => {
  const idToken = req.get("Authorization").substring(7);
  const uid = await assertAuthenticated(idToken);
  if (!uid) {
    return res.status(400).send({ message: "User id token is invalid" });
  }

  console.log("hello :D");
  console.log(req["body"]);
  const exchangeResponse = await plaidClient.itemPublicTokenExchange({
    public_token: req.body.public_token,
  });

  const accessToken = exchangeResponse.data.access_token;

  // create new user
  await createUser(uid, accessToken);
  await new Promise((r) => setTimeout(r, 2000));

  res.json(true);
});

// returns if user exists and has plaid key
app.get("/me", async (req, res) => {
  const idToken = req.get("Authorization").substring(7);
  const uid = await assertAuthenticated(idToken);
  if (!uid) {
    return res.json({ success: false });
  }

  const existingUser = await User.findOne({ firebaseId: uid });
  if (!existingUser) {
    return res.json({ success: false });
  }

  return res.json({ success: true });
});
