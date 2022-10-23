import fetch from "node-fetch"
import csv from "csv-parser"
import fs from "fs"

/*const sampleResponse = {
    "accounts": [
        {
            "account_id": "BxBXxLj1m4HMXBm9WZZmCWVbPjX16EHwv99vp",
            "balances": {
                "available": 110,
                "current": 110,
                "iso_currency_code": "USD",
                "limit": null,
                "unofficial_currency_code": null
            },
            "mask": "0000",
            "name": "Plaid Checking",
            "official_name": "Plaid Gold Standard 0% Interest Checking",
            "subtype": "checking",
            "type": "depository"
        }
    ],
    "transactions": [
        {
            "account_id": "BxBXxLj1m4HMXBm9WZZmCWVbPjX16EHwv99vp",
            "amount": 2307.21,
            "iso_currency_code": "USD",
            "unofficial_currency_code": null,
            "category": [
                "Shops",
                "Computers and Electronics"
            ],
            "category_id": "19013000",
            "check_number": null,
            "date": "2017-01-29",
            "datetime": "2017-01-27T11:00:00Z",
            "authorized_date": "2017-01-27",
            "authorized_datetime": "2017-01-27T10:34:50Z",
            "location": {
                "address": "300 Post St",
                "city": "San Francisco",
                "region": "CA",
                "postal_code": "94108",
                "country": "US",
                "lat": 40.740352,
                "lon": -74.001761,
                "store_number": "1235"
            },
            "name": "Apple Store",
            "merchant_name": "Apple",
            "payment_meta": {
                "by_order_of": null,
                "payee": null,
                "payer": null,
                "payment_method": null,
                "payment_processor": null,
                "ppd_id": null,
                "reason": null,
                "reference_number": null
            },
            "payment_channel": "in store",
            "pending": false,
            "pending_transaction_id": null,
            "account_owner": null,
            "transaction_id": "lPNjeW1nR6CDn5okmGQ6hEpMo4lLNoSrzqDje",
            "transaction_code": null,
            "transaction_type": "place"
        }
    ],
    "item": {
        "available_products": [
            "balance",
            "identity",
            "investments"
        ],
        "billed_products": [
            "assets",
            "auth",
            "liabilities",
            "transactions"
        ],
        "consent_expiration_time": null,
        "error": null,
        "institution_id": "ins_3",
      "item_id": "eVBnVMp7zdTJLkRNr33Rs6zr7KNJqBFL9DrE6",
        "update_type": "background",
        "webhook": "https://www.genericwebhookurl.com/webhook"
    },
    "total_transactions": 1,
    "request_id": "45QSn"
}*/
  
    /*getTransacData(sampleResponse).then((value) => {
        console.log(value);
    })*/

function getCSVData() {
    let csvData = [];
    return new Promise((resolve) => {
        fs.createReadStream('src/res/nasdaq.csv')
            .pipe(csv())
            .on('data', (data) => csvData.push(data))
            .on('end', () => resolve(csvData));
    })
}

export async function getOwnedStockData(response) {
    let transactions = response.transactions
    const csvData = await getCSVData();
    const ownedStockDataObject = {}
    
    console.log(transactions.length)
    console.log(csvData.length)
    for (const transaction of transactions) {
        // console.log(transaction)
        const ownedStockDatum = {};
        const matchingString = transaction.merchant_name
        for (const csvDatum of csvData) {
            //console.log("csv", csvDatum.length)
            //console.log("blah", csvDatum, matchingString);
            if ((` ${csvDatum.Name} `).indexOf(` ${matchingString} `) != -1) {
                console.log(matchingString + " Matched with a NASDAQ Company")
                ownedStockDatum.ticker = csvDatum.Symbol
                ownedStockDatum.category = csvDatum.Sector
                break;
            }
        }
        if (!ownedStockDatum.ticker) {
            continue;
        }
        if (ownedStockDataObject[ownedStockDatum.ticker]) {
            ownedStockDataObject[ownedStockDatum.ticker].amount += transaction.amount;
            continue;
        }
        ownedStockDatum.name = transaction.merchant_name;
        ownedStockDatum.amount = transaction.amount;

        const todaysDate = new Date().toJSON().slice(0, 10)
        let monthDate = new Date();
        monthDate.setMonth(monthDate.getMonth() - 1);

        // const URL = `https://data.nasdaq.com/api/v3/datasets/WIKI/${ownedStockDatum.ticker}/data.json?api_key=AnS6v5PkzHb8LLFnMYhJ&start_date=${monthDate}&end_date=${todaysDate}`
        const monthlyURL = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${ownedStockDatum.ticker}&apikey=FJW7OJZ1KVSNW6VJ`
        const dailyURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ownedStockDatum.ticker}&apikey=FJW7OJZ1KVSNW6VJ`


        try {
            let dailyResponse = await fetch(dailyURL)
            dailyResponse = await dailyResponse.json()
            dailyResponse = dailyResponse['Time Series (Daily)']
            dailyResponse = Object.values(dailyResponse)
            console.log("Daily Response: ", dailyResponse)

            let monthlyResponse = await fetch(monthlyURL)
            monthlyResponse = await monthlyResponse.json()
            monthlyResponse = monthlyResponse['Monthly Time Series']
            monthlyResponse = Object.values(monthlyResponse)
            console.log("Monthly Response: ", monthlyResponse)

            const openingToday = Object.values(dailyResponse[0])[0] //get today's opening price
            const openingYesterday = Object.values(dailyResponse[1])[0] //get yesterday's opening price
            const openingMonthOld = Object.values(monthlyResponse[1])[0] //get the oldest response (1 month old) and get the open price

            ownedStockDatum.price = openingToday
            ownedStockDatum.percentDayBefore = Math.round(openingYesterday/openingToday * 10000.0) / 100.0
            ownedStockDatum.percentMonthBefore = Math.round(openingMonthOld/openingToday * 10000.0) / 100.0
        } catch (error) {
            console.log("ERROR for ticker ", ownedStockDatum.ticker, error)
            continue;
        }
        ownedStockDataObject[ownedStockDatum.ticker] = ownedStockDatum;
    }
    console.log(ownedStockDataObject);
    return Object.values(ownedStockDataObject);
}
