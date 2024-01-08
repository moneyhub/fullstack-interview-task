const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const axios = require("axios")
const helper = require('./helper.js')


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

app.get("/allHoldingsCsvGeneration", async (req, res) => {
  try {

    const investmentResponse = await fetch(`${config.investmentsServiceUrl}/investments`)
    const companyResponse = await fetch(`${config.financialCompaniesUrl}/companies`)

    const investmentData = await investmentResponse.json()
    const companyData = await companyResponse.json()

    const combinedData = helper.formatData(investmentData, companyData)
    const csv = helper.convertToCSV(combinedData)

    const jsonData = {
      csv: csv
    }

   await axios.post(`${config.investmentsServiceUrl}/investments/export`, jsonData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    res.send(csv)
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
