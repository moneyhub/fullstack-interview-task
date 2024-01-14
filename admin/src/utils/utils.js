const calculateInvestmentValue = (investmentTotal, investmentPercentage) => {
    return investmentTotal * investmentPercentage;
}

const generateCSV = (investments, holdings) => {
    const headers = ['|User|First Name|Last Name|Date|Holding|Value|'];
    const createCSVRow = (investment, holding, company) => (
      `|${investment.userId}|${investment.firstName}|${investment.lastName}|${investment.date}|${company.name}|${calculateInvestmentValue(investment.investmentTotal, holding.investmentPercentage)}|`
    )    
      const rows = investments.flatMap((investment) =>
        investment.holdings
          .map((holding) => ({
            holding,
            company: holdings.find((h) => h.id === holding.id),
          }))
          .filter(({ company }) => company)
          .map(({ holding, company }) => createCSVRow(investment, holding, company))
      );
  
    return [headers, ...rows].join('\n');
}


module.exports = generateCSV;