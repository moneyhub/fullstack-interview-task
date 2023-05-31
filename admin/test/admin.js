
const chai = require("chai")
const chaiHttp = require("chai-http")

const app = require("../src/index")

const should = chai.should()
chai.use(chaiHttp)

describe("ADMIN", () => {
  describe("/getCSV", () => {
    it("it should get a CSV format of users investments data", (done) => {
      chai
        .request(app)
        .get("/getcsv")
        // eslint-disable-next-line max-nested-callbacks
        .end((_err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
})

