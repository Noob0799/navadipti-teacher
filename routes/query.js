const express = require('express');
const router = express.Router();
const Query = require('../models/query');

router.post('/add', (req,res,next) => {
    console.log(req.body.data);  
    const query = new Query({name: req.body.data.name, text: req.body.data.text, token: req.body.data.token, id: req.body.data.id, reply: req.body.data.reply, date: req.body.data.date});
    query.save()
        .then((result) => {
            console.log(result._id);
            res.status(201).json({message: "Text added successfully!!"});
        })
})

router.get('/find', (req,res,next) => {
    Query.find({})
        .then((response) => {
            res.status(201).json({message: "Chats received successfully!!", body: response});
        })
})

router.put('/update', (req,res,next) => {
    console.log('Chat id to be updated:', req.body.data._id);
    Query.updateOne({'_id': req.body.data._id}, {reply: req.body.data.reply}).then(result => {
        console.log(result._id);
        res.status(201).json({message: "Chat updated successfully!!"});
      });
})

module.exports = router;