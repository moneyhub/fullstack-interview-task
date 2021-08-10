module.exports = (investments, companies) => {
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