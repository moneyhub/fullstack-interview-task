const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const helmet = require("helmet")
const cors = require("cors")
const {convertArrayToCSV} = require("convert-array-to-csv")
const axios = require("axios")


const app = express()

// Use Helmet for security
app.use(helmet())

// Enable all CORS requests.
app.use(cors())

app.use(bodyParser.json({limit: "10mb"}))

app.get("/investments/:id", async (req, res) => {
  const {id} = req.params
  const response = await axios.get(`${config.investmentsServiceUrl}/investments/${id}`)
  if (response.data.length) {
    res.send(response.data)
  } else {
    res.status(500).send("not found")
  }
})

// eslint-disable-next-line max-statements
app.get("/getcsv", async (_req, res) => {

  try {
    // get all investments
    const allInvestments = (await axios.get(`${config.investmentsServiceUrl}/investments`)).data

    // get all financial companies
    const allFinancialCompanies = (await axios.get(`${config.financialCompaniesServiceUrl}/companies`)).data

    // transform the comapanies into an array indexed by id to stop looping through the whole array to find the financial company name
    const transformedCompaniesArray = []
    allFinancialCompanies.forEach(company => {
      transformedCompaniesArray[company.id] = company.name
    })


    const userInvestmentsDataArray = []
    for (const investment of allInvestments) {
      for (const holdingsData of investment.holdings) {
        userInvestmentsDataArray.push({
          "User": investment.userId,
          "First Name": investment.firstName,
          "Last Name": investment.lastName,
          "Date": investment.date,
          // find name of holings by id
          "Holding": transformedCompaniesArray[holdingsData.id],
          "Value": investment.investmentTotal * holdingsData.investmentPercentage,
        })
      }
    }
    const csvFromArrayOfObjects = convertArrayToCSV(userInvestmentsDataArray)

    const response =  await axios.post(`${config.investmentsServiceUrl}/investments/export`,
      csvFromArrayOfObjects,
      {
        headers: {"Content-Type": "text/csv"},
      },
    )
    if (response.status === 204) {
      res.status(200).send("csv report sent")
    } else {
      console.log(res.status)
      res.status(500).send("report not sent")
    }
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on the port ${config.port}`)
})

module.exports = app
