const fs = require("fs")
const { Parser } = require("json2csv")

const formatData = (investments, financials) => {
    const holdings = []
    
    for (let i = 0; i < investments.length; i++) {
      const currentUser = investments[i]
      const nestedHoldings = currentUser.holdings
    
      for (let j = 0; j < nestedHoldings.length; j++) {
        const currentNestedHoldings = nestedHoldings[j]
        const combinedObject = {
          "User": currentUser.userId,
          "First Name": currentUser.firstName,
          "Last Name": currentUser.lastName,
          "Date": currentUser.date,
          "Holding": currentNestedHoldings.id,
          "Value": currentNestedHoldings.investmentPercentage * currentUser.investmentTotal
        }
        holdings.push(combinedObject)
      }
    }
  
      holdings.map(element => {
         const holdingName = financials.find(item => item.id === element.Holding)
          element.Holding = holdingName.name
      })
      return holdings
  }
  
  const convertToCSV = (holdings) => {
    const fields = ["User", "First Name", "Last Name", "Date", "Holding", "Value"]
  
    const json2csvParser = new Parser({ fields, delimiter: '|' })
    const csv = json2csvParser.parse(holdings, { header: fields })
  
    fs.writeFileSync('holdings.csv', csv, 'utf-8')
    return csv
  }

  module.exports = { formatData, convertToCSV }