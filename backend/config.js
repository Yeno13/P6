const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

// exports pour retrouver les valeurs contenues dans fichier .env
module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    JWT_TOKEN_SECRET : process.env.JWT_TOKEN_SECRET,
    MONGO_DB_USERNAME : process.env.MONGO_DB_USERNAME,
    MONGO_DB_PASSWORD : process.env.MONGO_DB_PASSWORD,
    MONGO_DB_NAME : process.env.MONGO_DB_NAME,
    HOST : process.env.HOST || 'localhost',
    PORT : process.env.PORT || 3000
    
}