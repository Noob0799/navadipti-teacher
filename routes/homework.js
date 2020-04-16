const express = require('express');
const router = express.Router();
const Homework = require('../models/homework');
var ObjectId = require('mongodb').ObjectID;

router.post('/add', (req,res,next) => {
    console.log(req.body.data);  
    const homework = new Homework({class: req.body.data.class, subject: req.body.data.subject, date: req.body.data.date, details: req.body.data.details, img: req.body.data.img});
    homework.save()
        .then((result) => {
            console.log(result._id);
            res.status(201).json({message: "New homework added successfully!!"});
        })
})

router.get('/get', (req,res,next) => {
    Homework.find({})
        .then((result) => {
            res.status(201).json({message: "Homework fetched successfully!!", data: result});
        })
})

router.delete('/delete', (req,res,next) => {
    console.log('Homework Id to be deleted:', req.body.id);
    Homework.deleteOne({'_id': ObjectId(req.body.id)})
        .then((result) => {
            res.status(201).json({message: "Homework deleted successfully!!"});
        })
})

router.put('/edit', (req,res,next) => {
    console.log('Homework Id to be edited:', req.body.data.data._id);
    Homework.updateOne({'_id': ObjectId(req.body.data.data._id)}, {class: req.body.data.data.class, subject: req.body.data.data.subject, date: req.body.data.data.date, details: req.body.data.data.details, img: req.body.data.data.img})
        .then(result => {
            res.status(201).json({message: "Homework updated successfully!!"});
        });
})


module.exports = router;