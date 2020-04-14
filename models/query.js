const mongoose = require('mongoose');

const querySchema = mongoose.Schema({
    name: {type: String, required: true},
    text: {type: String, required: true},
    token: {type: String, required: false},
    id: {type: String, required: false},
    reply: {type: [], required: false},
    date: {type: String, required: true}
});

module.exports = mongoose.model('Query', querySchema);