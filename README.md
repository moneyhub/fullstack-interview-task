# Moneyhub Tech Test - Investments and Holdings

At Moneyhub we use microservices to partition and separate the concerns of the codebase. In this exercise we have given you an example `admin` service and some accompanying services to work with. In this case the admin service backs a front end admin tool allowing non-technical staff to interact with data.

A request for a new admin feature has been received

## Requirements

- An admin is able to generate a csv formatted report showing the values of all user holdings
    - The report should be sent to the `/export` route of the holdings service
    - The holdings service expects the report to be sent as csv text
    - The csv should contain a row for each holding matching the following headers
    |User|First Name|Last Name|Date|Holding|Value|
    - The holding value can be calculated by `investmentTotal * investmentPercentage`
    - The holding should be the name of the holding account given by the financial-companies service
- Ensure use of up to date packages and libraries (the service is known to use deprecated packages)
- Make effective use of git

We prefer:
- Functional code 
- Ramda.js (this is not a requirement but feel free to investigate)
- Unit testing

### Notes
All of you work should take place inside the `admin` microservice
For the purposes of this task we would assume there are sufficient security middleware, permissions access and PII safe protocols
You are free to use any packages that would help with this task
We're interested in how you break down the work and build your solution in a clean and reusable manner rather than seeing a perfect example, try to only spend arouns *1-2 hours* working on it
Some questions we'd also like you to consider around this task:
1. What could you do to make this more secure?
2. How would you make this solution scale to millions of records?
3. What else would you have liked to improve given more time?
On completion email a link to your repository to your contact at Moneyhub and ensure it is publicly accessible.

## Getting Started
To develop against all the services each one will need to be started in each service run

```bash
npm start
or
npm run develop
```

The develop command will run nodemon allowing you to make changes without restarting
The services will try to use ports 8081, 8082 and 8083

Use Postman or any API tool of you choice to trigger your endpoints (this is how we will test your new route). Please add your new routes to the readme

### Existing routes
We have provided a series of routes 

Holdings - localhost:8081
`/holdings` get all holdings
`/holdings/:userId` get holdings for a user
`/holdings/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082
`/companies` get all companies details
`/companies/:id` get company by id

Admin - localhost:8083
`/user/:id` get users holdings