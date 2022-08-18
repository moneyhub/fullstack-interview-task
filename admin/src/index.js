const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const request = require("request")
const helmet = require("helmet")
const cors = require("cors")


const app = express()

// Use Helmet for security
app.use(helmet())

// Enable all CORS requests.
app.use(cors())

app.use(bodyParser.json({limit: "10mb"}))

app.get("/investments/:id", (req, res) => {
  const {id} = req.params
  request.get(
    `${config.investmentsServiceUrl}/investments/${id}`,
    (e, r, investments) => {
      if (e) {
        console.error(e)
        res.send(500)
      } else {
        res.send(investments)
      }
    },
  )
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on the port ${config.port}`)
})

module.exports = app
