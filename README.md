# Moneyhub Tech Test - Investments and Holdings

At Moneyhub we use microservices to partition and separate the concerns of the codebase. In this exercise we have given you an example `admin` service and some accompanying services to work with. In this case the admin service backs a front end admin tool allowing non-technical staff to interact with data.

A request for a new admin feature has been received

## Requirements

- As an admin, I want to be able to generate a CSV report showing the values of all user investment holdings
    - Any new routes should be added to the **admin** service
    - The csv report should be sent to the `/export` route of the **investments** service
    - The investments `/export` route expects the following:
        - content-type as `application/json`
        - JSON object containing the report as csv string, i.e, `{csv: '|User|First Name|...'}`
    - The csv should contain a row for each holding matching the following headers
    |User|First Name|Last Name|Date|Holding|Value|
    - The **Holding** property should be the name of the holding account given by the **financial-companies** service
    - The **Value** property can be calculated by `investmentTotal * investmentPercentage`
    - The new route in the admin service handling the generation of the csv report should return the csv as text with content type `text/csv`
- Ensure use of up to date packages and libraries (the service is known to use deprecated packages but there is no expectation to replace them)
- Make effective use of git

We prefer:
- Functional code
- Ramda.js (this is not a requirement but feel free to investigate)
- Unit testing

### Notes
All of you work should take place inside the `admin` microservice

For the purposes of this task we would assume there are sufficient security middleware, permissions access and PII safe protocols, you do not need to add additional security measures as part of this exercise.

You are free to use any packages that would help with this task

We're interested in how you break down the work and build your solution in a clean, reusable and testable manner rather than seeing a perfect example, try to only spend around *1-2 hours* working on it

On completion email a link to your repository to your contact at Moneyhub and ensure it is publicly accessible.

## Getting Started

Please clone this service and push it to your own github (or other) public repository

To develop against all the services each one will need to be started in each service run

```bash
nvm use 20
npm start
or
npm run develop
```

The develop command will run nodemon allowing you to make changes without restarting

The services will try to use ports 8081, 8082 and 8083

Use Postman or any API tool of you choice to trigger your endpoints (this is how we will test your new route).

### Existing routes
We have provided a series of routes

Investments - localhost:8081
- `/investments` get all investments
- `/investments/:id` get an investment record by id
- `/investments/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082
- `/companies` get all companies details
- `/companies/:id` get company by id

Admin - localhost:8083
- `/investments/:id` get an investment record by id
- `/allHoldingsCsvGeneration` gets all investment holding data, combined with the financial companies data

** Please note the service requires use of node 20, please ensure you are using the correct version of node when you run the admin project. 

### Testing

Please run 
```
npm run test
```
This will run the test suite, however this will currently also provide a holdings.csv file. This file will overwrite any existing data stored in this file.


- How to run any additional scripts or tests you may have added
To manually test the service, please ensure all 3 microservices are running. Once they are all running, please visit the following URL in your chosen browser 'http://localhost:8083/allHoldingsCsvGeneration'. You should then see the holdings data appear in your browser window in the requested csv format, plus also displayed in the terminal of the investments service. A CSV file has also been saved in the admin service, this will be regenerated and rewritten each time the url is hit. 

- Relating to the task please add answers to the following questions;

How might you make this service more secure?
Changing the id's would be a good way to start, changing them to uuid's sp they are harder to guess, but exposing genuine client ids through a url may not be idea. We could use a second service which keeps our internal id's we care about safe and we expose an external id, which can be changed quickly without the need to update the id's anywhere else the customer data is stored. 

How would you make this solution scale to millions of records?
The mapping should scale, however it may be better to create events for each of the services (financials and investments, so any time a record is update it emits an events with the most up to data version of the data). You could have a smaller proxy service, who's job is to listen out for these events and any time one has an update, it could fetch the data from the other service via an rpc call and generate a new complete event matching all the data points needed. This new event could be stored in a data warehouse which could be then either used for reporting. That way you also have the latest version in your data warehouse which anyone with the correct access could use if needed and exported. 

What else would you have liked to improve given more time?
I would like to add additional error handling, at the moment the code is wrapped in a try catch, so if any part errors it will catch the error, however ideally it extra error handling would be added to determine what type of error occurred and if it is recoverable. If the one of the api calls is unavailable, this might be temporary and it may be best to wait 5 seconds and retry. The code is also written in a way that relies on there being data being returned from the two other microservices, better error handling should be added here to indicate if there is missing data, what the missing data is. If not present, how should this be treated, should this be replaced with a null? At the moment the file would not be generated and the api response would be an error. This is not ideal for the end user, the more information we can provide in this situation would be more helpful in knowing what the next steps are needed to be taken. 

I would also have spent more time reading the Ramda documentation, this is not something I have come across yet (although I do have a learning day this week, so this will be something I look into!). I have made a start with the unit testing, however I decided to try using the node native test runner which is now available and stable on node 20, this is something I have not used before. I would like to have done a deeper dive into mocking, the current test will write the csv file, which it shouldn't do if mocked correctly. 

I would also change the way the csv file is created, so it would be given a unique name based on the exact use for it, whether that be linked to an admins user id, and then a file structure created so these can be stored incase they are needed again. They could either be stored locally in the service or in a storage bucket.