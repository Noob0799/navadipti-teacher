const express = require('express');
const router = express.Router();
const Homework = require('../models/homework');

router.post('/add', (req,res,next) => {
    console.log(req.body.data);  
    const homework = new Homework({class: req.body.data.class, subject: req.body.data.subject, date: req.body.data.date, details: req.body.data.details});
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


module.exports = router;