const express = require('express');
let bodyParser = require('body-parser');
const eventRoutes = require('./routes/event');
const syllabusRoutes = require('./routes/syllabus');
const homeworkRoutes = require('./routes/homework');
const announcementRoutes = require('./routes/announcement');
const queryRoutes = require('./routes/query');
const mongoose = require('mongoose');
const path = require("path");
const app = express();
const port = process.env.PORT || "5000";

app.use(express.json({limit: '10MB', extended: true}))
app.use(express.urlencoded({limit: '10MB', extended: true}))
app.use(express.static(path.join(__dirname, "frontend", "build")))

mongoose.connect("mongodb+srv://noob:XHfaVoZsq8AvbqC8@cluster0-atyzx.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true,  useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use('*', (req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Accept, Content-type");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});
app.use('/event', eventRoutes);
app.use('/syllabus', syllabusRoutes);
app.use('/homework', homeworkRoutes);
app.use('/announcement', announcementRoutes);
app.use('/query', queryRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
module.exports = app;