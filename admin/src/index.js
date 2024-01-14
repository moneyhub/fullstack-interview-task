const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const request = require("request")
const axios = require('axios');
const generateCSV = require('./utils/utils');

const companiesUrl = `${config.companiesServiceUrl}/companies`;
const investmentsUrl = `${config.investmentsServiceUrl}/investments`;
const investmentsExportUrl = `${config.investmentsServiceUrl}/investments/export`;


const app = express()

app.use(bodyParser.json({limit: "10mb"}))


const getInvestments = async () => {
    const investmentsResponse = await axios.get(investmentsUrl);
    return investmentsResponse.data;
};

const getCompanies = async () => {
    const companiesResponse = await axios.get(companiesUrl);
    return companiesResponse.data;
}

app.get("/investments/:id", (req, res) => {
    const {id} = req.params
    request.get(`${config.investmentsServiceUrl}/investments/${id}`, (e, r, investments) => {
      if (e) {
        console.error(e)
        res.send(500)
      } else {
        res.send(investments)
      }
    })
});

app.get("/generate-report", async(req, res) => {
    try {
        const investments = await getInvestments();
        const companies = await getCompanies();

        const csvData = generateCSV(investments, companies);

        res.setHeader('Content-Type', 'text/csv');
        
        axios.post(investmentsExportUrl, { csv: csvData }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        res.status(200).json({message: 'CSV data has been successfully sent'});
    } catch (error) {
        console.error('Error has occured:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})
