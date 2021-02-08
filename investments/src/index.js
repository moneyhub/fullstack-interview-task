const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const investments = require("./data")
const R = require("ramda")

const app = express()

app.use(bodyParser.json({limit: "10mb"}))

app.get("/investments", (req, res) => {
  res.send(investments)
})

app.get("/investments/:id", (req, res) => {
  const {id} = req.params
  const investment = R.filter(R.propEq("id", id), investments)
  res.send(investment)
})

app.post("/investments/export", (req, res) => {
  console.log("Body received", req.body)
  res.sendStatus(204)
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
