const rateLimit = require("express-rate-limit");

exports.passwordLimiter = rateLimit({ 
  // Maximum 3 requêtes toutes les 10 minutes
  windowMs: 10 * 60 * 1000, 
  max: 3,
});