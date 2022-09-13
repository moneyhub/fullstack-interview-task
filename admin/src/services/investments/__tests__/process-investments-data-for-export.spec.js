
// necessary because jest config is setup to reset mocks after every test
function setupMocks() {
  jest.mock("../../financial-data/get-holding-name-memoized", () =>{
    return {
      getHoldingNameMemoized: jest.fn().mockReturnValue("generic holding"),
    }
  })
}

describe("processInvestmentsDataForExport", () => {
  beforeEach(() => {
    setupMocks()
  })

  it("generates the expected data for a given input", async () => {
    const {mockInvestments} = require("../../../__tests__/testData")
    const {processInvestmentsDataForExport} = require("../process-investments-data-for-export")

    const result = await processInvestmentsDataForExport(mockInvestments)

    expect(JSON.stringify(result, null, 2)).toMatchSnapshot()
  })

  it("calls getHoldingNameMemoized with the correct parameter for each holding for each record", async () => {
    const {mockInvestments} = require("../../../__tests__/testData")
    const {processInvestmentsDataForExport} = require("../process-investments-data-for-export")

    const input = [
      mockInvestments[0],
      mockInvestments[1],
    ]

    await processInvestmentsDataForExport(input)

    const {getHoldingNameMemoized} = require("../../financial-data/get-holding-name-memoized")

    expect(getHoldingNameMemoized).toHaveBeenNthCalledWith(1, "2")
    expect(getHoldingNameMemoized).toHaveBeenNthCalledWith(2, "1")
    expect(getHoldingNameMemoized).toHaveBeenNthCalledWith(3, "2")
  })
})
