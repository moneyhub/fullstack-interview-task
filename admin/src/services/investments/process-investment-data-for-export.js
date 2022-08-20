const {getHoldingNameMemoized} = require("../financial-data")

async function processInvestmentsDataForExport(investmentsData) {
  return Promise.all(investmentsData.reduce((acc, elem) => {
    const promises = elem.holdings.map(async h => ({
      "First Name": elem.firstName,
      "Last Name": elem.lastName,
      "Date": elem.date,
      "Holding": await getHoldingNameMemoized(h.id),
      "Value": elem.investmentTotal * h.investmentPercentage,
    }))

    // doing it like this removes the need to flatten afterwards
    acc.push(...promises)

    return acc
  }, []))
}

module.exports.processInvestmentsDataForExport = processInvestmentsDataForExport
