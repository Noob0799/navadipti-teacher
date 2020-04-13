const mongoose = require('mongoose');

const homeworkSchema = mongoose.Schema({
    class: {type: String, required: true},
    subject: {type: String, required: true},
    date: {type: String, required: true},
    details: {type: String, required: true}
});

module.exports = mongoose.model('Homework', homeworkSchema);