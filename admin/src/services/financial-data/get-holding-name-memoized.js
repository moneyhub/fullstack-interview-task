const memoize = require("memoizee")
const config = require("config")
const {getHoldingName} = require("./get-holding-name")

const getHoldingNameMemoized = memoize(getHoldingName, {maxAge: config.fetchHoldingNameMemoTimeout})

module.exports.getHoldingNameMemoized = getHoldingNameMemoized
