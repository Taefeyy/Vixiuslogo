const mongoose = require('mongoose');

const mj = mongoose.Schema({
    id: String,
});

module.exports = mongoose.model('mj', mj);