[![Build Status](https://travis-ci.com/Bolstad09/16-basic-authentication.svg?branch=brittany)](https://travis-ci.com/Bolstad09/16-basic-authentication)

![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) 16: Basic Auth
===

## Links
  * Travis: https://travis-ci.com/Bolstad09/17-bearer-authentication.svg?branch=brittany
  * Heroku: https://bearer-17.herokuapp.com/
  * PR: https://github.com/Bolstad09/17-bearer-authorization/pull/1

## Learning Objectives  
* students will be able to create basic authorization middleware
* students will be able to test basic authorization for signup/signin routes

## Server Endpoints
#Incorporate the authentication and authorization model, routes and middleware into your express server, putting auth in front of every API route, ensuring they all require a login for access.

### `/api/resource-name`
* `POST` request
* pass data as stringifed JSON in the body of a post request to create a new resource

### `/api/resource-name/:id`
* GET request
pass the id of a resource though the url endpoint to req.params to fetch a resource
* PUT request
pass data as stringifed JSON in the body of a put request to update a resource
* DELETE request
pass the id of a resource though the url endpoint (using req.params) to delete a resource

## Tests
* create a test to ensure that your API returns a status code of 404 for routes that have not been registered
* create a series of tests to ensure that your /api/resource-name endpoint responds as described for each condition below:
* GET - test **200**, for a request made with a valid id
* GET - test **401**, if no token was provided
* GET - test **404**, for a valid request with an id that was not found
* PUT - test **200**, for a post request with a valid body
* PUT - test **401**, if no token was provided
* PUT - test **400**, if the body was invalid
* PUT - test **404**, for a valid request made with an id that was not found
* POST - test **200**, for a post request with a valid body
* POST - test **401**, if no token was provided
* POST - test **400**, if no body was provided or if the body was invalid