/* eslint-disable no-param-reassign */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable dot-notation */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
function getCompanyDetails(givenData) {
    let output = []
    for (let i of givenData["ownedStocks"]) {
        output.push({"name":i["tickerID"]["name"],
                "ticker":i["tickerID"]["ticker"],
                "capital":(i["tickerID"]["price"] * i["amount"]),
                "date":null,
                "percentDayChange":i["tickerID"]["percentDayBefore"],
                "percentMonthChange":i["tickerID"]["percentMonthBefore"],
                "totalGrowth":null
        })
    }
    output.sort(function(a, b) {
        return parseFloat(b["capital"]) - parseFloat(a["capital"]);
    })
    return output
}

function trimCompanies(givenData) {
    givenData = givenData.slice(2)
    givenData.map((x) => ({"name":x["name"], "capital":x["capital"], "percentDayChange":x["percentDayChange"]}))
}