const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const axios = require("axios")

const {generateAndPostInvestmentsExport} = require("./services/investments")

const app = express()

app.use(bodyParser.json({limit: "10mb"}))

app.use((req, res, next) => {
  console.log(new Date(Date.now()).toISOString(), req.method, req.path)
  return next()
})

app.get("/investments/:id", async (req, res, next) => {
  const {id} = req.params

  try {
    const response = await axios.get(`${config.investmentsServiceUrl}/investments/${id}`)
    res.send(response.data)
  } catch (e) {
    next(e)
  }
})

app.post("/investments/export", async (req, res, next) => {
  try {
    await generateAndPostInvestmentsExport()

    // created suits this use case, I think
    res.sendStatus(201)
  } catch (e) {
    next(e)
  }
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
