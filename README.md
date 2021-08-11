# Moneyhub Tech Test - Investments and Holdings

At Moneyhub we use microservices to partition and separate the concerns of the codebase. In this exercise we have given you an example `admin` service and some accompanying services to work with. In this case the admin service backs a front end admin tool allowing non-technical staff to interact with data.

A request for a new admin feature has been received

## Requirements

- An admin is able to generate a csv formatted report showing the values of all user holdings
  - The report should be sent to the `/export` route of the investments service
  - The investments service expects the report to be sent as csv text
  - The csv should contain a row for each holding matching the following headers
    |User|First Name|Last Name|Date|Holding|Value|
  - The holding should be the name of the holding account given by the financial-companies service
  - The holding value can be calculated by `investmentTotal * investmentPercentage`
- Ensure use of up to date packages and libraries (the service is known to use deprecated packages)
- Make effective use of git

We prefer:

- Functional code
- Ramda.js (this is not a requirement but feel free to investigate)
- Unit testing

### Notes

All of you work should take place inside the `admin` microservice

For the purposes of this task we would assume there are sufficient security middleware, permissions access and PII safe protocols, you do not need to add additional security measures as part of this exercise.

You are free to use any packages that would help with this task

We're interested in how you break down the work and build your solution in a clean, reusable and testable manner rather than seeing a perfect example, try to only spend around _1-2 hours_ working on it

Relating to the task we'd also like you to write some answers to the following questions;

1. How might you make this service more secure?
   This would depend on the auth strategy, and where we think the auth should sit logically in the architecture. We would either secure the `admin` service as the only public-facing entry point and ring-fence the `investments` and `financial-companies` (we gain an operational benefit of centralised auth at the expense of `admin` having to know authorisation details of `investments` and `financial-companies`), or we would delegate the auth to the internal services themselves, which means `investments` and `financial-companies` would both need their own testing infrastructure to ensure endpoints remain secure, which could be more effort in the short term but may scale more easily. Either way would use some form of signed token (JWT).
2. How would you make this solution scale to millions of records?
   - Provided the number of financial companies from `/companies` endpoint remains small, we could look at using streams to pipe the response from `investments`, transform into a CSV on the fly, and pipe the request containing the CSV rows straight to the `/investments/export` endpoint. Additionally could make it an offline process to avoid server timeouts/cloudflare things. It becomes harder if the number of companies is also large. In this case we would have to keep a local cache of companies and keep it updated as the new records come in from the `investments` endpoint. We would have to keep an eye on memory usage in this case.
   - If the report is generated automatically, periodically, we could also look at using date-filters on `investment` endpoint (only last 24 hours say).
   - Logically, we are reading the investments data from `investments` service, then adding company name to it, then putting it straight back into `investments`. Perhaps this aggreation operation belongs better in `investements` service - `investments` could just take the `financial-companies` data directly, and generate the holding report itself (still triggered from `admin`)? This would avoid the HTTP overhead.
3. What else would you have liked to improve given more time?
   I would have liked to have used ramda for the mapping! Possibly I would have injected a data-acquisition dependency into the `services/generate-user-holdings-report.js`, to avoid making the requests to `investments` and `financial-companies` the `admin` route, but the route is already handling http anyway so maybe it's not such a big deal that they're there.

## Getting Started

Please clone this service and push it to your own github (or other) public repository

On completion email a link to your repository to your contact at Moneyhub and ensure it is publicly accessible.

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

Investments - localhost:8081

- `/investments` get all investments
- `/investments/:id` get an investment record by id
- `/investments/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082

- `/companies` get all companies details
- `/companies/:id` get company by id

Admin - localhost:8083

- `/investments/:id` get an investment record by id
- POST `/generateUserHoldingsReport` generate an investment holdings report for all users and send to `http://investments/investments/export`
