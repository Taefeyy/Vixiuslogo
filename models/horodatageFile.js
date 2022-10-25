const mongoose = require('mongoose');

const horodatage = mongoose.Schema({
    id: String,
    heure: String,
});

module.exports = mongoose.model('horodatage', horodatage);