const mongoose = require('mongoose');

const syllabusSchema = mongoose.Schema({
    class: {type: String, required: true},
    subject: {type: String, required: true},
    term: {type: String, required: true},
    details: {type: String, required: true}
});

module.exports = mongoose.model('Syllabus', syllabusSchema);