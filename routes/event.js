const express = require('express');
const router = express.Router();
const Event = require('../models/event');
var ObjectId = require('mongodb').ObjectID;

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

router.delete('/delete', (req,res,next) => {
    console.log('Event Id to be deleted:', req.body.id);
    Event.deleteOne({'_id': ObjectId(req.body.id)})
        .then((result) => {
            res.status(201).json({message: "Event deleted successfully!!"});
        })
})

router.put('/edit', (req,res,next) => {
    console.log('Event Id to be edited:', req.body.data.data._id);
    Event.updateOne({'_id': ObjectId(req.body.data.data._id)}, {class: req.body.data.data.class, name: req.body.data.data.name, time: req.body.data.data.time, date: req.body.data.data.date, details: req.body.data.data.details})
        .then(result => {
            res.status(201).json({message: "Event updated successfully!!"});
        });
})

module.exports = router;