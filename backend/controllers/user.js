const dotenv = require("dotenv");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi"); // Pluggin permettant l'utilisation de Regex

const User = require("../models/user");

const schema = Joi.object({
  email: Joi.string().regex(
    /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/
  ),
  password: Joi.string().pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/
  ),
});

exports.signup = (req, res, next) => {
  schema
    .validateAsync({
      // Verification comparé au schéma Regex
      email: req.body.email,
      password: req.body.password,
    })
    .then(() => {
      bcrypt
        .hash(req.body.password, 10) // Récupération du password crypté avec Bcrypt
        .then((hash) => {
          const user = new User({
            email: req.body.email,
            password: hash,
          });
          user
            .save()
            .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => {
          res.status(500).json;
          console.log(error);
        });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.TOKEN, {
              expiresIn: "6h",
            }),
          });
        })
        .catch((error) => {
          res.status(500).json;
          console.log(error);
        });
    })
    .catch((error) => {
      res.status(500).json;
      console.log(error);
    });
};
