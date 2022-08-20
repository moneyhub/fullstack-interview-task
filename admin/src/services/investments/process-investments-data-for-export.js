const {getHoldingNameMemoized} = require("../financial-data")
const R = require("ramda")

// this assumes that the data structure is consistent, i.e. all elements have all expected fields
async function processInvestmentsDataForExport(investmentsData) {
  return Promise.all(R.reduce((acc, investmentsDataElem) => {
    const promises = R.map(async holding => ({
      "First Name": investmentsDataElem.firstName,
      "Last Name": investmentsDataElem.lastName,
      "Date": investmentsDataElem.date,
      "Holding": await getHoldingNameMemoized(holding.id),
      "Value": investmentsDataElem.investmentTotal * holding.investmentPercentage,
    }), investmentsDataElem.holdings)

    // doing it like this removes the need to flatten afterwards
    acc.push(...promises)

    return acc
  }, [],  investmentsData))
}

module.exports.processInvestmentsDataForExport = processInvestmentsDataForExport
