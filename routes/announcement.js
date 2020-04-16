const express = require('express');
const router = express.Router();
const Announcement = require('../models/announcement');
var ObjectId = require('mongodb').ObjectID;

router.post('/add', (req,res,next) => {
    console.log(req.body.data);  
    const announcement = new Announcement({class: req.body.data.class, author: req.body.data.author, date: req.body.data.date, details: req.body.data.details});
    announcement.save()
        .then((result) => {
            console.log(result._id);
            res.status(201).json({message: "New announcement added successfully!!"});
        })
})

router.get('/get', (req,res,next) => {
    Announcement.find({})
        .then((result) => {
            res.status(201).json({message: "Announcements fetched successfully!!", data: result});
        })
})

router.delete('/delete', (req,res,next) => {
    console.log('Announcement Id to be deleted:', req.body.id);
    Announcement.deleteOne({'_id': ObjectId(req.body.id)})
        .then((result) => {
            res.status(201).json({message: "Announcement deleted successfully!!"});
        })
})

router.put('/edit', (req,res,next) => {
    console.log('Announcement Id to be edited:', req.body.data.data._id);
    Announcement.updateOne({'_id': ObjectId(req.body.data.data._id)}, {class: req.body.data.data.class, author: req.body.data.data.author, date: req.body.data.data.date, details: req.body.data.data.details})
        .then(result => {
            res.status(201).json({message: "Announcement updated successfully!!"});
        });
})

module.exports = router;