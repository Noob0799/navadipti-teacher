const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({
    class: {type: String, required: true},
    date: {type: String, required: true},
    author: {type: String, required: true},
    details: {type: String, required: true}
});

module.exports = mongoose.model('Announcement', announcementSchema);