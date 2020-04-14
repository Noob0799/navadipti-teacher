const express = require('express');
const router = express.Router();
const Event = require('../models/event');

router.post('/add', (req,res,next) => {
    console.log(req.body.data);  
    const event = new Event({date: req.body.data.date, name: req.body.data.name, class: req.body.data.class, time: req.body.data.time, details: req.body.data.details});
    event.save()
        .then((result) => {
            console.log(result._id);
            res.status(201).json({message: "Event added successfully!!"});
        })
})

router.get('/get', (req,res,next) => {
    Event.find({})
        .then((result) => {
            res.status(201).json({message: "Events fetched successfully!!", data:result});
        })
})

module.exports = router;