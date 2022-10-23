import express from "express";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import mongoose, { Schema } from "mongoose";
import { config as envConfig } from "dotenv";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";
import { readFile } from "fs/promises";
import { upsertUser } from "./utils/driver.js";
import { User, Stock } from "./app/models.js";
import { getTransactionData } from "./utils/plaidApiUtils.js";
import { getOwnedStockData } from "./TransactionMethods.js";

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

app.post("/api/create_link_token", async (req, res) => {
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

  //initialize stock data for user
  const plaidTransactionData = await getTransactionData(accessToken)
  // console.log(plaidTransactionData)
  const stockTransactionData = await getOwnedStockData(plaidTransactionData)
  console.log("Stock Transaction Data (index.js): ", stockTransactionData)

  const ownedStocks = stockTransactionData.map(async (stockDatum) => {
    let matchingStock = await Stock.findOne({ticker : stockDatum.ticker});
    if (matchingStock) {
      matchingStock.price = stockDatum.price;
      matchingStock.percentDayBefore = stockDatum.percentDayBefore
      matchingStock.percentMonthBefore = stockDatum.percentMonthBefore
    } else {
      const newStock = new Stock({
        ticker: stockDatum.ticker,
        name: stockDatum.name,
        category: stockDatum.category,
        price: stockDatum.price,
        percentDayBefore : stockDatum.percentDayBefore,
        percentMonthBefore : stockDatum.percentMonthBefore
      })
      matchingStock = newStock;
    }
    console.log(matchingStock)
    await matchingStock.save();

    return {
      tickerId: matchingStock._id,
      amount: stockDatum.amount
    }
  });

  // create new user
  await upsertUser(uid, accessToken, ownedStocks);

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

app.get("/test", async (req, res) => {
  return res.json({
    categoryWeights: [
      {
        name: "Technology",
        value: 0.2,
      },
      { name: "Financial Services", value: 0.2 },
      { name: "Industrials", value: 0.2 },
      { name: "Basic Materials", value: 0.2 },
      { name: "Energy", value: 0.2 },
    ],
    ownedStocks: [
      {
        amount: 2.3,
        tickerId: {
          ticker: "AAPL",
          name: "Apple Inc.",
          category: "Technology",
          price: 423.1,
          percentDayBefore: 0.32,
          percentMonthBefore: 10.32,
        },
      },
      {
        amount: 10,
        tickerId: {
          ticker: "AMD",
          name: "Advanced Micro Devices",
          category: "Technology",
          price: 4.03,
          percentDayBefore: 0.1,
          percentMonthBefore: 12,
        },
      },
      {
        amount: 10,
        tickerId: {
          ticker: "PLD",
          name: "Plaid",
          category: "Financial Services",
          price: 23,
          percentDayBefore: -0.5,
          percentMonthBefore: 2.32,
        },
      },
      {
        amount: 1,
        tickerId: {
          ticker: "KMB",
          name: "Kimberly Clark",
          category: "Industrials",
          price: 113.96,
          percentDayBefore: 1.42,
          percentMonthBefore: 10.32,
        },
      },
      {
        amount: 100,
        tickerId: {
          ticker: "SHW",
          name: "The Sherwin-Williams Company",
          category: "Basic Materials",
          price: 207.82,
          percentDayBefore: -1,
          percentMonthBefore: -4.32,
        },
      },
      {
        amount: 5,
        tickerId: {
          ticker: "XOM",
          name: "Exxon Mobil Corp",
          category: "Energy",
          price: 105.86,
          percentDayBefore: 1.88,
          percentMonthBefore: 2.4,
        },
      },
    ],
  });
});


app.get("/api/get_stock_data", async (req, res) => {
  const idToken = req.get("Authorization").substring(7);
  const uid = await assertAuthenticated(idToken);
  if (!uid) {
    return res.json({ success: false });
  }

  const existingUser = await User.findOne({ firebaseId: uid }).populate('ownedStocks.tickerId');
  res.json(existingUser.ownedStocks);
});