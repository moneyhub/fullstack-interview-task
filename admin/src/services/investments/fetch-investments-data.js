const axios = require("axios")
const config = require("config")

async function fetchInvestmentsData() {
  const response = await axios.get(`${config.investmentsServiceUrl}/investments`)

  return response.data
}

module.exports.fetchInvestmentsData = fetchInvestmentsData
