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

## Getting Started

Please clone this service and push it to your own github (or other) public repository

To develop against all the services each one will need to be started in each service run

```bash
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

## Deliverables 
### Script to run the tests
```
npm run test
```
### How might you make this service more secure?
1. HTTPS (SSL/TLS):
    - Make use of HTTPS to encrypt data transmitted between the client and server. This prevents eavesdropping and man-in-the-middle attacks.
2. Dependency Security:
    - Regularly update and monitor dependencies (e.g., Express, Axios) for security vulnerabilities using tools such as npm audit. This service has many deprecated packages and it is very vital to update or replace them as soon as possible to avoid service crashes and make the service future proof.
3. Rate Limiting:
    - Implement rate limiting to prevent abuse or denial-of-service attacks. Limit the number of requests a user or IP address can make in a specific time period. 
4. Environment Variables:
    - Avoid pushing the environment variables to the repository as this can lead to sensitive information (API keys, URLs) being leaked.
4. Cross-Origin Resource Sharing (CORS):
    - Configure CORS to restrict which domains can access the /generate-report route. Whitelist only trusted origins.
5. Remove all the unnecessary logs in the code as they can be a security risk. 
    -   Attackers can use them to gain insigts into the inner workings of the service.

### How would you make this solution scale to millions of records?
1. Load Balancing:
    - Efficiently disribute the incoming network traffic across multiple servers. Making sure each server handles an appropriate amount of load leads to better response times and improved overall performance.  
2. Content Delivery Networks (CDN):
    - using CDNs for the reports that are static or change infrequently. This will result in a reduction of load on the servers.
3. Distributed File Storage:
    - Use a distributeed file storage system to store and retrive the generated csv reports efficiently. 
4. Caching:
    - cache the results for a specific amount of time. It reduces the need to repeatedly fetching data from  data sources, such as databases or external APIs.

### What else would you have liked to improve given more time?
1. I would add more tests such as API acceptance test to ensure the responses from the route is correct. I would have used the axios-mock-adapter package to mock the requests from axios and test what the response of the route would be:
    - I would test for the case when the route works as expected and should return the appropriate csv  report. 
    ```
    it('should generate CSV and send to /investments/export', async () => {  
        const expectedCSV = `|User|First Name|Last Name|Date|Holding|Value|\n`;
            
        // Mock Axios requests with the test data
        mock.onGet(investmentsTestUrl).reply(200, investmentsMockData);
        mock.onGet(companiesTestUrl).reply(200, holdingsMockData);
        mock.onPost(investmentsTestExportUrl).reply(200, { message: 'CSV data received successfully' });
            
        const response = await supertest(app)
            .get('/generate-csv-report')
            .expect(200);

        expect(response.body).toEqual({ message: 'CSV data sent to investments/export successfully' });
        expect(mock.history.post.length).toBe(1);
        expect(mock.history.post[0].data).toEqual(JSON.stringify({ csv: expectedCSV }));
        
    });
    ```

    - I would check if the correct error message and status code is returned if there is an internal server error. Something like this:
    ```
        it('should handle errors gracefully', async () => {
            mock.onGet(investmentsTestUrl).reply(500);
            const response = await supertest(app)
                .get('/generate-report')
                .expect(500);

            expect(response.body).toEqual({ error: 'Internal Server Error' });
        });
    ```
    
    **The above code snippets are just an example of the tests i would write and how I would structure them.**

2. I would have upgraded or removed most of the outdated and deprecated packages to ensure that everything works smoothly.

3. I would have added documentation for the route I created using OpenAPI specification.

4. Data Validation - I would spend more time validating the data that is sent from the investments and financial services companies.

5. I would have dedicated additional time and effort to conduct thorough research and delve deeper into the functionalities and applications of Ramda.js. This would have involved a comprehensive exploration of its documentation, tutorials, and real-world use cases.


## Additional Notes;
I encountered challenges during the package installation process due to outdated or deprecated dependencies within the project. After systematic troubleshooting and experimentation, I successfully resolved the issues by installing both Jest and Axios as development dependencies. I apologise for any inconvenience this may have caused.