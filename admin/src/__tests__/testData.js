const mockInvestments = [
  {
    "id": "1",
    "userId": "1",
    "firstName": "Billy",
    "lastName": "Bob",
    "investmentTotal": 1400,
    "date": "2020-01-01",
    "holdings": [
      {
        "id": "2",
        "investmentPercentage": 1,
      },
    ],
  },
  {
    "id": "2",
    "userId": "2",
    "firstName": "Sheila",
    "lastName": "Aussie",
    "investmentTotal": 20000,
    "date": "2020-01-01",
    "holdings": [
      {
        "id": "1",
        "investmentPercentage": 0.5,
      },
      {
        "id": "2",
        "investmentPercentage": 0.5,
      },
    ],
  },
  {
    "id": "3",
    "userId": "1",
    "firstName": "Billy",
    "lastName": "Bob",
    "investmentTotal": 1300,
    "date": "2020-02-01",
    "holdings": [
      {
        "id": "2",
        "investmentPercentage": 1,
      },
    ],
  },
  {
    "id": "4",
    "userId": "2",
    "firstName": "Sheila",
    "lastName": "Aussie",
    "investmentTotal": 22000,
    "date": "2020-02-01",
    "holdings": [
      {
        "id": "1",
        "investmentPercentage": 0.5,
      },
      {
        "id": "2",
        "investmentPercentage": 0.5,
      },
    ],
  },
  {
    "id": "5",
    "userId": "1",
    "firstName": "Billy",
    "lastName": "Bob",
    "investmentTotal": 12000,
    "date": "2020-03-01",
    "holdings": [
      {
        "id": "2",
        "investmentPercentage": 1,
      },
    ],
  },
  {
    "id": "6",
    "userId": "2",
    "firstName": "Sheila",
    "lastName": "Aussie",
    "investmentTotal": 21500,
    "date": "2020-03-01",
    "holdings": [
      {
        "id": "1",
        "investmentPercentage": 0.5,
      },
      {
        "id": "2",
        "investmentPercentage": 0.3,
      },
      {
        "id": "3",
        "investmentPercentage": 0.2,
      },
    ],
  },
  {
    "id": "7",
    "userId": "3",
    "firstName": "John",
    "lastName": "Smith",
    "investmentTotal": 150000,
    "date": "2020-03-01",
    "holdings": [
      {
        "id": "1",
        "investmentPercentage": 0.8,
      },
      {
        "id": "3",
        "investmentPercentage": 0.2,
      },
    ],
  },
]

module.exports = {
  mockInvestments,
}
