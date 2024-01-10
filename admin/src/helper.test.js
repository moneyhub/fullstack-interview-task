const { describe, it, mock } = require( "node:test")
const assert = require('node:assert')

const helper = require('../src/helper')
const fs = require("fs")

const investments = [
    {
        "id": "1",
        "userId": "1",
        "firstName": "Billy",
        "lastName": "Bob",
        "investmentTotal": 1400,
        "date": "2020-01-01",
        "holdings": [{"id": "2", "investmentPercentage": 1}]
      }, {
        "id": "2",
        "userId": "2",
        "firstName": "Sheila",
        "lastName": "Aussie",
        "investmentTotal": 20000,
        "date": "2020-01-01",
        "holdings": [{"id": "1", "investmentPercentage": 0.5}, {"id": "2", "investmentPercentage": 0.5}]
      }
]

const companys = [
    {
        "id": "1",
        "name": "The Big Investment Company",
        "address": "14 Square Place",
        "postcode": "SW18UU",
        "frn": "234165"
      }, {
        "id": "2",
        "name": "The Small Investment Company",
        "address": "12 Circle Square",
        "postcode": "SW18UD",
        "frn": "773388"
      }
]

const combined = [
    { 
        User: '1', 
        'First Name': 'Billy', 
        'Last Name': 'Bob', 
        Date: '2020-01-01', 
        Holding: 'The Small Investment Company',
         Value: 1400 
    }, { 
        User: '2', 
        'First Name':'Sheila', 
        'Last Name': 'Aussie', 
        Date: '2020-01-01', 
        Holding: 'The Big Investment Company', 
        Value: 10000 
    }, { 
        User: '2', 
        'First Name': 'Sheila', 
        'Last Name': 'Aussie', 
        Date: '2020-01-01', 
        Holding: 'The Small Investment Company',
        Value: 10000 
    } 
]

describe('formatData', () => {
    describe('When passed the investment and company arrays', () => {
        it('will combine the data in the format required', () => {
            assert.deepEqual(helper.formatData(investments, companys), combined)
        })
    })
})

const csvFile = '"User"|"First Name"|"Last Name"|"Date"|"Holding"|"Value"\r\n"1"|"Billy"|"Bob"|"2020-01-01"|"The Small Investment Company"|1400\r\n"2"|"Sheila"|"Aussie"|"2020-01-01"|"The Big Investment Company"|10000\r\n"2"|"Sheila"|"Aussie"|"2020-01-01"|"The Small Investment Company"|10000'

describe('convertToCSV', () => {
    describe('When passed the formatted data', () => {
        it('will return the data back as a csv file', () => {
            mock.method(fs, 'writeFileSync')
            assert.deepEqual(helper.convertToCSV(combined), csvFile)
        })
    })
})
