const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: {type: String, required: true},
    date: {type: String, required: true},
    class: {type: String, required: false},
    time: {type: String, required: false},
    details: {type: String, required: false}
});

module.exports = mongoose.model('Event', eventSchema);