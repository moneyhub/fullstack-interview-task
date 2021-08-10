const { Parser } = require('json2csv')

const generateReport = (investments, companies) => {
  const companiesIdMap = companies.reduce((companyMap, company) => {
    return {
      ...companyMap,
      [company.id]: company.name
    }
  }, {})
  return investments
    .reduce((investments, investment) => {
      return [...investments, ...investment.holdings.map(holding => {
        if (!companiesIdMap[holding.id]) {
          throw new Error(`Error generating report - could not find company with ID ${holding.id} for holding under investment with ID ${investment.id}`)
        }
        return {
          user: investment.userId,
          firstName: investment.firstName,
          lastName: investment.lastName,
          date: investment.date,
          holding: companiesIdMap[holding.id],
          value: investment.investmentTotal * holding.investmentPercentage
        }
      })]
    }, [])
}

const generateCsv = (data) => {
  const fields = [{
    label: 'User',
    value: 'user'
  }, {
    label: 'First Name',
    value: 'firstName'
  }, {
    label: 'Last Name',
    value: 'lastName'
  }, {
    label: 'Date',
    value: 'date'
  }, {
    label: 'Holding',
    value: 'holding'
  }, {
    label: 'Value',
    value: 'value'
  }]
  const json2csvParser = new Parser({ fields })
  return json2csvParser.parse(data)
}

module.exports = {
  generateReport,
  generateCsv
}
