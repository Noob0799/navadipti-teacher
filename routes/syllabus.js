const express = require('express');
const router = express.Router();
const Syllabus = require('../models/syllabus');
var ObjectId = require('mongodb').ObjectID;

router.post('/add', (req,res,next) => {
    console.log(req.body.data);  
    const syllabus = new Syllabus({class: req.body.data.class, subject: req.body.data.subject, term: req.body.data.term, details: req.body.data.details});
    syllabus.save()
        .then((result) => {
            console.log(result._id);
            res.status(201).json({message: "New syllabus added successfully!!"});
        })
})

router.get('/get', (req,res,next) => {  
    Syllabus.find({})
        .then((result) => {
            res.status(201).json({message: "Syllabus fetched successfully!!", data: result});
        })
})

router.delete('/delete', (req,res,next) => {
    console.log('Syllabus Id to be deleted:', req.body.id);
    Syllabus.deleteOne({'_id': ObjectId(req.body.id)})
        .then((result) => {
            res.status(201).json({message: "Syllabus deleted successfully!!"});
        })
})

router.put('/edit', (req,res,next) => {
    console.log('Syllabus Id to be edited:', req.body.data.data._id);
    Syllabus.updateOne({'_id': ObjectId(req.body.data.data._id)}, {class: req.body.data.data.class, subject: req.body.data.data.subject, term: req.body.data.data.term, details: req.body.data.data.details})
        .then(result => {
            res.status(201).json({message: "Syllabus updated successfully!!"});
        });
})


module.exports = router;