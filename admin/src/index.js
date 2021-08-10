const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const got = require("got")
const { generateReport, generateCsv } = require('./generate-report')

const app = express()

app.use(bodyParser.json({ limit: "10mb" }))

app.get("/investments/:id", async (req, res) => {
  const { id } = req.params
  try {
    const investments = (await got(`${config.investmentsServiceUrl}/investments/${id}`)).body
    res.send(investments)
  } catch (e) {
    console.error(e)
    res.send(500)
  }
})

app.post("/generateUserHoldingsReport", async (req, res) => {
  try {
    const [investmentsResponse, companiesResponse] = await Promise.all([
      got(`${config.investmentsServiceUrl}/investments`).json(),
      got(`${config.financialCompaniesServiceUrl}/companies`).json()
    ])

    const csvData = generateCsv(generateReport(investmentsResponse, companiesResponse))

    await got.post(`${config.investmentsServiceUrl}/investments/export`, {
      headers: {
        'content-type': 'text/csv'
      },
      body: csvData
    })

    res.send('report generated')
  } catch (e) {
    console.error(e)
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
