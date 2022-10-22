import fetch from "node-fetch"

const sampleResponse = {
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
}
  
    getTransacData(sampleResponse).then((value) => {
        console.log(value);
    })
  
    async function getTransacData(response) {
        let merchantToDollars = []
        let transactions = response["transactions"]
        let category
        let ticker
        for (let x in transactions) {
            let transac = transactions[x]
            let response2 = await fetch("https://api.sec-api.io/mapping/name/" + transac.merchant_name + "?token=70d25ca5879d3667a2004fe79b97e51e02add7e9313af187b3fb4906c7572165")
            let data = await response2.json()
            data = data[0]
            category = data["sector"]
            ticker = data["ticker"]
            let doesHave
            for(let x in merchantToDollars) {
                if (merchantToDollars[x]["ticker"].equals(ticker)) {
                    merchantToDollars[x]["amount"] += transac.amount
                    doesHave = true
                }
            }
            if (!doesHave) {
              merchantToDollars.push({"ticker":ticker, "category":category, "name":transac.merchant_name, "amount":transac.amount})
            }
        }
        return getStockData(merchantToDollars)
    }
  
async function getStockData(inputs) {
    let totalOutput = []
    let response
    let data
    let data2
    let data3
    const API_KEY = "ad437953e6e888808a7a29140dcf2ab7"
    for (let input in inputs) {
        input = inputs[input]
        response = await fetch(`http://api.marketstack.com/v1/eod?access_key=${API_KEY}&symbols=${input["ticker"]}`)
        data = await response.json()
      
        let dateObj = new Date();
        let currDate = dateObj.toJSON().slice(0,10)
        dateObj.setDate(dateObj.getDate() - 2)
        let yesterdayDate = dateObj.toJSON().slice(0,10)
        dateObj.setDate(dateObj.getDate() - 29)
        let monthBefore = dateObj.toJSON().slice(0,10)
      
        response = await fetch(`http://api.marketstack.com/v1/eod?access_key=${API_KEY}&symbols=${input["ticker"]}&date_from=${yesterdayDate}&date_to=${currDate}`)
        data2 = await response.json()
  
        response = await fetch(`http://api.marketstack.com/v1/eod?access_key=${API_KEY}&symbols=${input["ticker"]}&date_from=${monthBefore}&date_to=${currDate}`)
        data3 = await response.json()
    
        let currData = data["data"][0]["close"]
        let yestData = data2["data"][data2["data"].length - 1]["close"]
        let monthData = data3["data"][data3["data"].length - 1]["close"]
  
        let yestPercent = Math.round(yestData/currData * 10000.0) / 100.0
        let monthPercent = Math.round(monthData/currData * 10000.0) / 100.0
  
        totalOutput.push({"ticker":input["ticker"], "category":input["category"], "name":input["name"], "amount":input["amount"],
                            "currentPrice":currData, "yesterdayPercent":yestPercent, "monthPercent":monthPercent})
    }
      
    return totalOutput
}