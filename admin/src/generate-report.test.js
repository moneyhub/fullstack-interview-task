const { companies, investments } = require('./generate-report.fixtures')
const generateReport = require('./generate-report')

describe('generate-report', () => {
  it('maps holding accounts', () => {
    const investments = [{
      "userId": "1",
      "firstName": "Billy",
      "lastName": "Bob",
      "investmentTotal": 1400,
      "date": "2020-01-01",
      "holdings": [{ "id": "2", "investmentPercentage": 1 }]
    }, {
      "userId": "2",
      "firstName": "Sheila",
      "lastName": "Aussie",
      "investmentTotal": 20000,
      "date": "2020-01-01",
      "holdings": [{ "id": "1", "investmentPercentage": 0.5 }, { "id": "2", "investmentPercentage": 0.5 }]
    }]

    const companies = [{
      "id": "1",
      "name": "The Big Investment Company"
    }, {
      "id": "2",
      "name": "The Small Investment Company"
    }]

    const results = generateReport(investments, companies)

    expect(results).toEqual([{
      user: "1",
      firstName: "Billy",
      lastName: "Bob",
      date: "2020-01-01",
      holding: 'The Small Investment Company',
      value: 1400
    }, {
      user: "2",
      firstName: "Sheila",
      lastName: "Aussie",
      date: "2020-01-01",
      holding: 'The Big Investment Company',
      value: 10000
    }, {
      user: "2",
      firstName: "Sheila",
      lastName: "Aussie",
      date: "2020-01-01",
      holding: 'The Small Investment Company',
      value: 10000
    }])
  })

  it('throws an error when company ID does not exist', () => {
    const investments = [{
      "id": 30,
      "userId": "1",
      "firstName": "Billy",
      "lastName": "Bob",
      "investmentTotal": 1400,
      "date": "2020-01-01",
      "holdings": [{ "id": "2", "investmentPercentage": 1 }]
    }]

    const companies = [{
      "id": "4",
      "name": "The Big Investment Company"
    }]

    expect(() => generateReport(investments, companies)).toThrow('Error generating report - could not find company with ID 2 for holding under investment with ID 30')
  })

})