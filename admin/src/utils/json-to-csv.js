const Papaparse = require("papaparse")

function jsonToCsv(json, columns) {
  return Papaparse.unparse(json, {columns})
}

module.exports = {
  jsonToCsv,
}
