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
        categories.push({"category":category.name, "capital":0, "biggestCompany":null, "bigAmount":-1})
    }
    console.log(givenData)
    for (let i of givenData["ownedStocks"]) {
        let category = i["tickerId"]["category"]
        let index = categories.indexOf(category)
        if (index > -1) {
            let amount = (i["tickerId"]["price"] * i["amount"])
            categories[index]["capital"] += amount
            if (categories[index]["bigAmount"] < amount) {
                categories[index]["biggestCompany"] = i["tickerId"]["name"]
                categories[index]["bigAmount"] = amount
            }
        } 
    }
    //Sort and Map 

    categories.sort(function(a, b) {
        return parseFloat(b["capital"]) - parseFloat(a["capital"]);
    })
    categories.map((x) => ({"name":x["name"], "capital":x["capital"], "biggestCompany":x["biggestCompany"]}))
    return categories
}

function getSectorInvestments(givenData) {
    let categories = []
    for (let category of givenData["categoryWeights"]) {
        categories.push(category)
    }
    let output = []
    let lists = [[], [], [], [], []]

    for (let i of givenData["ownedStocks"]) {
        let temp = categories.indexOf(i["tickerId"]["category"])
        if (temp >= 0) {
            lists[temp].push({"name":i["tickerId"]["category"], "capital":(i["tickerId"]["price"] * i["amount"])})
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

export { getSectorBreakdowns, getSectorDetails, getSectorInvestments}