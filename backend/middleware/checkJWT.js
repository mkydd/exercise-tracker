const { auth } = require('express-oauth2-jwt-bearer');

const checkJWT = auth({
    audience: 'https://exercise-tracker/api',
    issuerBaseURL: 'https://dev-dqifzagy3qetw0s8.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

module.exports = checkJWT