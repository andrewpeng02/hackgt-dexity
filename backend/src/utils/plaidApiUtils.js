import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { config as envConfig } from 'dotenv';
envConfig();

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

export const getTransactionData = async (accessToken) => {
  const transactionResponse = await plaidClient.transactionsGet({
    access_token: accessToken,
    start_date: '2021'+(new Date()).toJSON().slice(4, 10),
    end_date: (new Date()).toJSON().slice(0, 10)
  })
    console.log(transactionResponse.data);
    res.json(transactionResponse.data);
}