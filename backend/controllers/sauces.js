const Sauce = require('../models/sauce');
const fs = require('fs');


//creation d'une sauce
exports.createSauce = (req, res, next) => {
    const sauceObjet = JSON.parse(req.body.sauce);
    delete sauceObjet._id;
    const sauce = new Sauce({
        ...sauceObjet,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).JSON({ message: 'Sauce enregistrée!' }))
        .catch((error) => res.status(400).JSON({error: erreur}));
};


//Récupération de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).JSON(sauces))
        .catch((error) => res.status(400).JSON({error: erreur}));
};


//consultation d'une sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => res.status(200).JSON(sauce))
        .catch((error) => res.status(404).JSON({error: erreur}));
};


//Modifier une sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {...req.body};
        Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
        .then(() => res.status(201).json({message: 'Sauce modifiée !'}))
        .catch((error) => res.status(400).json({error: error}));
};


//Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (!sauce) {
                res.status(404).json({error: new Error('Sauce non trouvée')});
            }
            if (sauce.userId !== req.auth.userId) {
                res.status(400).json({error: new Error('Requête non autorisée')});
            }
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée'}))
                    .catch(error => res.status(400).json({error}));
            });
        })
        .catch(error => res.status(500).json({ error }));
};