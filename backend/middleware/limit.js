const rateLimit = require("express-rate-limit");

exports.passwordLimiter = rateLimit({ 
  windowMs: 15 * 60 * 1000,
  max: 3,
});