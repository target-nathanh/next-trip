# NextTrip: A Nextrip Project

Based on the [NexTrip app](https://www.metrotransit.org/nextripbadge.aspx) by Metro Transit,
this app was built using the Create React App project and uses TypeScript

Built using node version 15.10.0

## Running the app

To run the app, first run:

### `npm install`

After installing your dependencies you can run the app using: 

### `npm start`

To launch the test runner run:

### `npm test`

## Assumptions during development

1. Large companies like Target often make use of internal component libraries, so I used a common library for this project
2. IE11 would be the oldest browser I would try to target
3. This app will be built as an MVP of a more robust application. To make this "Production Ready", I would include:
    1. Implementing WCAG accessibility standards
    2. Log Errors to an outside service
    3. Get user location for map centering
    4. More robust error handling for API being down, bad routes, etc
   




