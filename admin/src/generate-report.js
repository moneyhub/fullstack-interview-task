module.exports = (investments, companies) => {
  const companiesIdMap = companies.reduce((companyMap, company) => {
    return {
      ...companyMap,
      [company.id]: company.name
    }
  }, {})
  return investments
    .reduce((investments, investment) => {
      return [...investments, ...investment.holdings.map(holding => ({
        user: investment.userId,
        firstName: investment.firstName,
        lastName: investment.lastName,
        date: investment.date,
        holding: companiesIdMap[holding.id],
        value: investment.investmentTotal * holding.investmentPercentage
      }))]
    }, [])
}