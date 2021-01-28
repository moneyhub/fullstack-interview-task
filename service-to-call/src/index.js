const express = require("express")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const config = require("config")
const people = require("./data")

const app = express()

app.use(bodyParser.json({limit: "10mb"}))

app.get("/people", (req, res) => {
  res.send(people)
})

app.get("/people/:id", (req, res) => {
  const {id: requestedId} = req.params
  const person = people.find(({id}) => id === requestedId)
  res.send(person)
})

app.post(
  "/people/export",
  fileUpload(),
  (req, res) => {
    console.log("Body received", req.body)
    res.sendStatus(204)
  },
)

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
