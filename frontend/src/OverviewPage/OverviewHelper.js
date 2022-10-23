/* eslint-disable guard-for-in */
/* eslint-disable no-empty */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable spaced-comment */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable dot-notation */
/* eslint-disable no-restricted-syntax */
function getSectorBreakdowns(givenData) {
    return givenData["categoryWeights"]
}

function getSectorDetails(givenData) {
    let categories = []
    for (let category of givenData["categoryWeights"]) {
        categories.push(category)
    }
    let output = []
    for (let i of givenData["ownedStocks"]) {
        let category = i["tickerID"]["category"]
        if (categories.includes(category)) {
            for (let item of output) {
                if (item["category"] === category) {
                    let amount1 = (i["tickerID"]["price"] * i["amount"])
                    item["capital"] += amount1
                    if (item["bigAmount"] < amount1) {
                        item["biggestCompany"] = i["tickerID"]["name"]
                        item["bigAmount"] = amount1
                    } else {
                        categories.push(category)
                        let amount = (i["tickerID"]["price"] * i["amount"])
                        output.push({"name":category, "capital":amount, "biggestCompany":i["tickerID"]["name"], "bigAmount":amount})
                    }
                }
            }
        } 
    }
    //Sort and Map 

    output.sort(function(a, b) {
        return parseFloat(b["capital"]) - parseFloat(a["capital"]);
    })
    output.map((x) => ({"name":x["name"], "capital":x["capital"], "biggestCompany":x["biggestCompany"]}))
    return output
}

function getSectorInvestments(givenData) {
    let categories = []
    for (let category of givenData["categoryWeights"]) {
        categories.push(category)
    }
    let output = []
    let lists = [[], [], [], [], []]

    for (let i of givenData["ownedStocks"]) {
        let temp = categories.indexOf(i["tickerID"]["category"])
        if (temp >= 0) {
            lists[temp].push({"name":i["tickerID"]["category"], "capital":(i["tickerID"]["price"] * i["amount"])})
        }
    }
    for(let i of lists){
        i.sort(function(a, b) {
            return parseFloat(b["capital"]) - parseFloat(a["capital"]);
        })
        i = i.slice(2)
    }
    for (let i in categories) {
        let category = categories[i]["category"]
        output.push({"category":category, "topComps":lists[i]})
    }
    return output
}



