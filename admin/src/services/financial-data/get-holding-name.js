const axios = require("axios");
const config = require("config");

async function getHoldingName(companyId) {
  const response = await axios.get(`${config.financialCompaniesServiceUrl}/companies/${companyId}`)

  return response.data.name
}

module.exports.getHoldingName = getHoldingName