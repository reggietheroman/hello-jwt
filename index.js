'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 1337;
const secret = "abcdefg1029384756"; // !!! do not use this in an actual project

/* API Endpoints (Routes) */
app.get('/unauthenticated', (req, res) => {
  _logRouteCall('Unauthenticated');

});

app.get('/authenticate', async (req, res) => {
  _logRouteCall('Authenticate');
  let payload = {foo: 'bar', role: 'admin'};
  _sendJwt(payload, res);
});

app.get('/authenticated', (req, res) => {
  let token = req.query.token;
console.log(token);
  _logRouteCall('Authenticated');
  _verifyJwt(token, res);
});

app.get('/', (req, res) => {
  _logRouteCall('Index');
  res.send(`Server listening on port ${port}`);
});

/* Start UNIX socket and listen to connections on the given path */
app.listen(port, () => {
  console.info(`hello-jwt listening on port ${port}`);
});

/* Utility functions */
function _logRouteCall(route) {
  console.info(`Route ${route} called`);
};

function _sendJwt(payload, res) {
  // jsonwebtoken default algo is HS25A
  jwt.sign(payload, secret, function(err, token) {
    if (err) {
      console.error(`Err: ${err}`); 
    }
    console.info(`Sign callback: ${token}`);
    res.send(`JWT: ${token}`);
  });
};

function _verifyJwt(token, res) {
  jwt.verify(token, secret, function(err, decoded) {
    if (err) {
      console.error(`Err: ${err}`); 
    }
    console.info(`Verify callback:`);
    console.log(decoded);
    res.send(`Verified`);
  });
};
