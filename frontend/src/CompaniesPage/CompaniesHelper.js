/* eslint-disable no-param-reassign */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable dot-notation */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
function getCompanyDetails(givenData) {
  let output = [];
  for (let i of givenData["ownedStocks"]) {
    output.push({
      name: i["tickerId"]["name"],
      ticker: i["tickerId"]["ticker"],
      capital: (i["tickerId"]["price"] * i["amount"]).toLocaleString(),
      date: null,
      percentDayChange: i["tickerId"]["percentDayBefore"],
      percentMonthChange: i["tickerId"]["percentMonthBefore"],
      totalGrowth: null,
    });
  }
  output.sort(function (a, b) {
    return parseFloat(b["capital"]) - parseFloat(a["capital"]);
  });
  return output;
}

function trimCompanies(givenData) {
  givenData = givenData.slice(0, 3);
  return givenData.map((x) => ({
    name: x["name"],
    capital: (x["capital"]).toLocaleString(),
    percentDayChange: x["percentDayChange"],
  }));
}

export { getCompanyDetails, trimCompanies };
