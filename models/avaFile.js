const mongoose = require('mongoose');

const ava = mongoose.Schema({
    name: String,
    jour: String,
    mois: String,
    heure: String,
    minutes: String,
    moment: String,
    lieu: String,
    jourDeLaSemaine: String,
});

module.exports = mongoose.model('ava', ava);