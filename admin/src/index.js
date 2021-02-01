const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const request = require("request")
const R = require("ramda")

const app = express()

app.use(bodyParser.json({limit: "10mb"}))

app.get("/users/:id", (req, res) => {
  const {id} = req.params
  request.get(`${config.holdings}/holdings`, (e, r, holdings) => {
    if (e) {
      console.error(e)
      res.send(500)
    } else {
      const userHoldings = R.filter(R.propEq("user", id), JSON.parse(holdings))
      res.send(userHoldings)
    }
  })
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
