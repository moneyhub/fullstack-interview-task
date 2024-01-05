const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")

const app = express()

app.use(bodyParser.json({limit: "10mb"}))

app.get("/investments/:id", async (req, res) => {
  try {
    const {id} = req.params
    const response = await fetch(`${config.investmentsServiceUrl}/investments/${id}`)
    const data = await response.json()
    res.send(data)
  } catch (error) {
    console.log(error)
    res.send(500)
  }
})

app.get("/investments", async (req, res) => {
  try {

    const investmentResponse = await fetch(`${config.investmentsServiceUrl}/investments`)
    const companyResponse = await fetch(`${config.financialCompaniesUrl}/companies`)

    const investmentData = await investmentResponse.json()
    const companyData = await companyResponse.json()

    const combinedData = formatData(investmentData, companyData)

    // This would need to be converted to a CSV string to be sent over to the 
    // `${config.financialCompaniesUrl}/investments/export` URL 

    res.send(combinedData)
  } catch (error) {
    console.log(error)
    res.send(500)
  }
})


app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})

// Helper functions
const formatData = (investments, financials) => {
  const holdings = [];
  
  for (let i = 0; i < investments.length; i++) {
    const currentUser = investments[i]
    const nestedHoldings = currentUser.holdings
  
    for (let j = 0; j < nestedHoldings.length; j++) {
      const currentNestedHoldings = nestedHoldings[j]
      const combinedObject = {
        'User': currentUser.userId,
        'First Name': currentUser.firstName,
        'Last Name': currentUser.lastName,
        'Date': currentUser.date,
        'Holding': currentNestedHoldings.id,
        'Value': currentNestedHoldings.investmentPercentage * currentUser.investmentTotal
      };
      holdings.push(combinedObject)
    }
  }

    holdings.map(element => {
       const holdingName = financials.find(item => item.id === element.Holding)
        element.Holding = holdingName.name
    })
    return holdings
}