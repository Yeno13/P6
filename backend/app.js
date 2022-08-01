const express = require('express')
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

const app = express();

module.exports = app;

mongoose.connect('mongodb+srv://yeno:azertyuiop@cluster0.85gqf.mongodb.net/?retryWrites=true&w=majority',
        {   useNewUrlParser: true,
            useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use('/api/auth', userRoutes);