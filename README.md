# Moneyhub Tech Test - Investments and Holdings: João Chapa proposed solution

### You can access the original problem statement [here](README_OLD.md).

### This file contains only my comments, rationale and suggestions for further work.

The setup process is the same, but I have configured jest in the admin project, which means that you can now do `npm t` and see the test results for the test suite I implemented.

This test suite is intentionally incomplete due to time constraints, read below for more information.

#### Using (Removing) request

The (admin) project was using request, which is a deprecated library. I replaced it with axios, which is a known lib in the ecosystem, and one that I enjoy working with.

### Fixed the vulnerabilities that npm reported

Using npm 6.14.17 and node 14.20.0, I followed the steps suggested by npm to remove all the reported vulnerabilities, and committed the changes to package-lock.json

### Execution environment

I assumed that the application would be running in a somewhat sane (read: recent) environment, specifically node 14, which gave me access and ability to freely use async/await syntax and native Promise support. This is almost a given, but you never know...

### Error (lack of) handling

Due to time constraints, there is very little error handling in my solution. For instance,
the export is converted to a csv as a whole, and if one of the lines generates an error, the entire export errors out. But I think it is not a problem to submit the solution like this, because...

### The architecture of this solution is not ideal (as I am presenting it in this solution: it could be better, but I would need more time)

Right now, because I was specifically told to spend only 1-2 hours working on this, the only thing that happens is that when a request to the endpoint on the admin service (POST /investments/export), it is the route handling logic that fetches the information from the investments and financial companies endpoints, uses the Papaparse lib to convert it to a csv file, and generates a POST to investments `/investments/export`.

This works great if the size of the export that you are generating is relatively small, but if it is much larger, you will run into timeout problems occurring in calling code, or into UX problems from users having to wait in a blocking state for way too long.

The correct way of handling something like the generation and sending of CSV data is to have it be as an external process: the API request only _triggers_ the process, and then there is a mechanism that keeps track of the process over time and some other endpoint or set of endpoints (or some sort of event notification system) that api consumers can use to see the current status of the job and get the result when it is done (or, in this case, understand that the export was correctly submitted to the investments API).

Such a mechanism would also allow much better management of errors in processing, since we could give the choice to the consumer to understand what were the rows (elements) that failed and say whether they want to continue sending the result, even though those errors ocurred.

Another reason for using a background task system is that with this current implementation, we are putting into memory the entire export in order for it to be transformed into csv: if the csv is exceptionally large, this will result in the process running out of memory, and since this code is being executed in a request context, the entire service crashing.

A possible mitigation that would not require the implementation of a task system would be to use streams to process the data: for instance, Papaparse, the csv lib I chose, does support piping an http stream directly into their parser, such that a csv file can be converted into json.
Unfortunately, from what I was able to gather, it does not support streams to do the opposite operation, so I was not able to use them.

Another possible mitigation would be to spin up a child process just for the request + parsing + sending part of the operation, without the task managment system (we would just wait for the child process to be done with its operation) which would at least make it so that the size of the export were to be too large, only the child process would crash, instead of the entire service, thus increasing greatly the reliability of the service.  

### Code structure

In the admin dir, I ended up organizing the code in services, splitting them in terms of which api they are interacting with. 

I also ended up making it so that each function is in its separate file, because...

### Test setup (+ unit tests)

I set up Jest in the repository, in order to demonstrate how I would use unit tests to reach 100% code coverage.

Having the functions be in individual files makes it, and I cannot stress this enough, _so much easier_ to mock function dependencies, and thus unit test functions effectively.

You can see an example of this in the only test suite I wrote (time constraints) located at [process-investments-data-for-export.spec.js](./admin/src/services/investments/__tests__/process-investments-data-for-export.spec.js)

(I chose this file because it looked to me to be the crucial piece of logic that you wanted me to showcase)

In that test suite, you can see the two major types of testing that I've gotten used to doing with Jest: snapshot testing (easier than manually validating each field), and specific input testing (for easily validatable output).

Note how I mock the function dependencies effectively and make them return consistent results.
This approach could be easily extended to cover the rest of the code in the repository.

### Ramda

Also, notice that the processInvestmentsDataForExport function uses Ramda reduce and map.

I used them because you mentioned that you like Ramda. But for this case, I found it to be a bit pointless.

It's already been a few years since we had es6 and map/reduce/forEach natively in most JavaScript runtimes. I'm of the opinion that those are good enough, and we should use them instead of relying on libraries, but even though I've worked a lot with lodash, I have essentially no experience with Ramda, so maybe there are a bunch of use cases that I'm not seeing here. But I did read that they essentially fill in the same gap, with different approaches, so I don't know. Let's discuss this in the solution review, shall we?

### Conclusions

I liked this challenge, but the time constraint really made it feel like this solution I am submitting is very incomplete. But, still, I'm conformable submitting it as it is because this is essentially a POC feature: if I had an urgent request to implement something like this, this is how I would do it: if it is more important to have the feature, even though it is a bit clunky and unreliable, than not having the feature at all, then we need to respect the desires of stakeholders. I'm used to working in small companies, so I understand that urgency (time constraints) tends to cause tech debt that needs to be paid back later. But that needs to be a conscious tradeoff, and that conscious tradeoff is what I did here.







