const axios = require("axios")
const config = require("config")
const FormData = require("form-data")

function postInvestmentsExport(csvContents) {
  const formData = new FormData()

  const fileName = `${Date.now()}-investmentsExport.csv`
  formData.append("investmentsExport", Buffer.from(csvContents), fileName)

  return axios.post(`${config.investmentsServiceUrl}/investments/export`, formData, {
    headers: {
      ...formData.getHeaders(),
    },
  })
}

module.exports.postInvestmentsExport = postInvestmentsExport
