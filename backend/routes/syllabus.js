const express = require('express');
const router = express.Router();
const Syllabus = require('../models/syllabus');

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


module.exports = router;