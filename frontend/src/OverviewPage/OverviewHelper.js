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
  return givenData["categoryWeights"];
}

function getSectorDetails(givenData) {
  let categories = [];
  for (let category of givenData["categoryWeights"]) {
    categories.push({
      category: category.name,
      capital: 0,
      biggestCompany: null,
      bigAmount: -1,
    });
  }

  for (let i of givenData["ownedStocks"]) {
    let category = i["tickerId"]["category"];

    let index = categories.findIndex((full) => full.category === category);
    if (index > -1) {
      let amount = i["tickerId"]["price"] * i["amount"];
      categories[index]["capital"] += amount;
      if (categories[index]["bigAmount"] < amount) {
        categories[index]["biggestCompany"] = i["tickerId"]["name"];
        categories[index]["bigAmount"] = amount;
      }
    }
  }
  //Sort and Map
  categories.sort(function (a, b) {
    return parseFloat(b["capital"]) - parseFloat(a["capital"]);
  });

  categories = categories.map((x) => ({
    name: x["category"],
    capital: (x["capital"]).toLocaleString(),
    biggestCompany: x["biggestCompany"],
  }));
  return categories;
}

function getSectorInvestments(givenData) {
  let categories = givenData["categoryWeights"];
  let output = [];
  let lists = [[], [], [], [], []];

  for (let i of givenData["ownedStocks"]) {
    let temp = categories.findIndex(
      (full) => full.name === i["tickerId"]["category"]
    );
    if (temp >= 0) {
      lists[temp].push({
        name: i["tickerId"]["name"],
        capital: i["tickerId"]["price"] * i["amount"],
      });
    }
  }

  for (let i of lists) {
    i.sort(function (a, b) {
      return parseFloat(b["capital"]) - parseFloat(a["capital"]);
    });
    i = i.slice(0, 3);
    for (let j of i) {
        j.capital = (j.capital).toLocaleString()
    }
  }
  for (let i in categories) {
    let category = categories[i]["name"];
    output.push({ category, topComps: lists[i] });
  }
  return output;
}

export { getSectorBreakdowns, getSectorDetails, getSectorInvestments };
