const express = require('express');
const router = express.Router();
const Announcement = require('../models/announcement');

router.post('/add', (req,res,next) => {
    console.log(req.body.data);  
    const announcement = new Announcement({class: req.body.data.class, author: req.body.data.author, date: req.body.data.date, details: req.body.data.details});
    announcement.save()
        .then((result) => {
            console.log(result._id);
            res.status(201).json({message: "New announcement added successfully!!"});
        })
})

module.exports = router;