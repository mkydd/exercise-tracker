const setRateLimit = require("express-rate-limit");

const rateLimiter = setRateLimit({
  windowMs: 60 * 1000,
  max: 25,
  message: "You’ve hit the request limit. Please wait and try again in a few moments",
  headers: true,
});

module.exports = rateLimiter;