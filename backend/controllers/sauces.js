const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => { // Création d'une sauce
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré  !' }))
    .catch((error) => res.status(400).json({error: error}));
};

exports.getAllSauces = (req, res, next) => { // Récupération de toutes les sauces
  Sauce.find()
  .then((sauces) => res.status(200).json(sauces))
  .catch((error) => res.status(400).json({error: error}));
};

exports.getOneSauce = (req, res, next) => { // Consultation d'une sauce
  Sauce.findOne({_id: req.params.id})
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({error: error}));
};

exports.modifySauce = (req, res, next) => { // Modifier une sauce
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
  Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
    .then(() => res.status(201).json({message: 'Objet modifié !'}))
    .catch((error) => res.status(400).json({error: error}));
};

exports.deleteSauce = (req, res, next) => { // Suppression d'une sauce
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        res.status(404).json({error: new Error('Objet non trouvé !')});
      } 
      if (sauce.userId !== req.auth.userId) {
        res.status(400).json({error: new Error('Requête non autorisée !')});
      }
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id }) 
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};