import express from "express";
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { config as envConfig } from 'dotenv';
envConfig();

const app = express();
app.use(express.json())
const port = 5000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


const config = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET
    },
  },
});

const plaidClient = new PlaidApi(config);

app.get("/api/create_link_token", async (req, res) => {
  const tokenResponse = await plaidClient.linkTokenCreate({
    user: { client_user_id: "blahblah"},
    client_name: "Dexity",
    language: "en",
    products: ["transactions"],
    country_codes: ["US"]
  });
  console.log(tokenResponse.data);
  res.json(tokenResponse.data);
});

// Exchanges the public token from Plaid Link for an access token
app.post("/api/exchange_public_token", async (req, res) => {
  console.log("hello :D")
  console.log(req["body"])
  const exchangeResponse = await plaidClient.itemPublicTokenExchange({
    public_token: req.body.public_token,
  });

  const access_token = exchangeResponse.data.access_token;
  res.json(true);
});