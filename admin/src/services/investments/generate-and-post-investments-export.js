const {jsonToCsv} = require("../../utils/json-to-csv")
const {fetchInvestmentsData} = require("./fetch-investments-data")
const {processInvestmentsDataForExport} = require("./process-investment-data-for-export")
const {postInvestmentsExport} = require("./post-investments-export")
const {INVESTMENTS_EXPORT_COLUMS} = require("../../consts")

async function generateAndPostInvestmentsExport() {
  const investmentsData = await fetchInvestmentsData()

  const processedData = await processInvestmentsDataForExport(investmentsData)
  const csvText = jsonToCsv(processedData, INVESTMENTS_EXPORT_COLUMS)

  await postInvestmentsExport(csvText)
}

module.exports.generateAndPostInvestmentsExport = generateAndPostInvestmentsExport
