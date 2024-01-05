
- The new route in the admin service handling the generation of the csv report should return the csv as text with content type `text/csv`
- Ensure use of up to date packages and libraries (the service is known to use deprecated packages but there is no expectation to replace them)
- Make effective use of git

We prefer:
- Functional code
- Ramda.js (this is not a requirement but feel free to investigate)
- Unit testing

EVERYTHING TO BE DONE IN THE ADMIN SERVICE!!

TODO:
- Fix at node 20
- Change to async / await
- Do the API call to get all investments
- Do the api call to the financial companies
- prepare the data
- create the csv
- do the post request to the export api end
- add unit tests

* update readme
- Your new routes
- How to run any additional scripts or tests you may have added
- Relating to the task please add answers to the following questions;
    1. How might you make this service more secure?
    2. How would you make this solution scale to millions of records?
    3. What else would you have liked to improve given more time?