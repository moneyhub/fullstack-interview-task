const generateCSV = require("../utils/utils");

describe('Test suite', () => {    
    describe('Generate CSV', () => {

        const investmentData = [
            {
                "id": "1",
                "userId": "1",
                "firstName": "Amin",
                "lastName": "Abdi",
                "investmentTotal": 2000,
                "date": "2024-01-01",
                "holdings": [
                    {
                        "id": "2",
                        "investmentPercentage": 0.8
                    }
                ]
            },
            {
                "id": "2",
                "userId": "2",
                "firstName": "Jane",
                "lastName": "Doe",
                "investmentTotal": 10000,
                "date": "2024-01-02",
                "holdings": [
                    {
                        "id": "1",
                        "investmentPercentage": 0.5
                    },
                    {
                        "id": "2",
                        "investmentPercentage": 0.3
                    }
                ]
            },
        ];

        const companies = [
            {
                "id": "1",
                "name": "ACME investments",
                "address": "78 wimbledon street",
                "postcode": "EA19PL",
                "frn": "276182"
            },
            {
                "id": "2",
                "name": "Shrek & Fiona LTD",
                "address": "14 park road",
                "postcode": "SW108UU",
                "frn": "927481"
            },
        ]

        it('should not return any data if the input is empty', () => {
            const data = generateCSV([], []);
            expect(data).toEqual('|User|First Name|Last Name|Date|Holding|Value|');
        });

        it('should not return any data if there is no matching holding and investments', () => {
            const investments = [
                {
                    "id": "1",
                    "userId": "1",
                    "firstName": "Amin",
                    "lastName": "Abdi",
                    "investmentTotal": 1000,
                    "date": "2024-01-01",
                    "holdings": [
                        {
                            "id": "9",
                            "investmentPercentage": 0.8
                        }
                    ]
                },
            ]
            const data = generateCSV(investments, []);
            expect(data).toEqual('|User|First Name|Last Name|Date|Holding|Value|');
        })

        it('should output zero investment total as 0', () => {
            const investments = [
                {
                    "id": "1",
                    "userId": "1",
                    "firstName": "Amin",
                    "lastName": "Abdi",
                    "investmentTotal": 0,
                    "date": "2024-01-01",
                    "holdings": [
                        {
                            "id": "2",
                            "investmentPercentage": 0.9
                        }
                    ]
                }
            ]
            const data = generateCSV(investments, companies);
            expect(data).toEqual('|User|First Name|Last Name|Date|Holding|Value|\n|1|Amin|Abdi|2024-01-01|Shrek & Fiona LTD|0|');
        })

        it('should generate correcct CSV data', () => {
            const expectedCSVData = '|User|First Name|Last Name|Date|Holding|Value|\n|1|Amin|Abdi|2024-01-01|Shrek & Fiona LTD|1600|\n|2|Jane|Doe|2024-01-02|ACME investments|5000|\n|2|Jane|Doe|2024-01-02|Shrek & Fiona LTD|3000|';
            const result = generateCSV(investmentData, companies);
            expect(result).toEqual(expectedCSVData);
        });        
    })
})

