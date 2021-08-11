const { mapUserHoldingsReportData, pivotToCsv } = require('./generate-user-holdings-report')

describe('generate-user-holdings-report', () => {
  describe('mapUserHoldingsReportData', () => {
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

      const results = mapUserHoldingsReportData(investments, companies)

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

      expect(() => mapUserHoldingsReportData(investments, companies)).toThrow('Error generating report - could not find company with ID 2 for holding under investment with ID 30')
    })
  })

  describe('pivotToCsv', () => {

    it('can generate a CSV', () => {
      const data = [{
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
      }]

      const result = pivotToCsv(data)

      const expected = `"User","First Name","Last Name","Date","Holding","Value"
"1","Billy","Bob","2020-01-01","The Small Investment Company",1400
"2","Sheila","Aussie","2020-01-01","The Big Investment Company",10000
"2","Sheila","Aussie","2020-01-01","The Small Investment Company",10000`

      expect(result).toEqual(expected)
    })
  })
})