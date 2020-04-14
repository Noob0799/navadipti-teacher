import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import landing from './Components/Landing/landing';
import timetable from '../src/Components/teacher/Timetable/timetable';
import TimetableRecord from '../src/Components/teacher/Timetable/timetablerecord';
import syllabus from '../src/Components/teacher/Syllabus/syllabus';
import SyllabusRecord from '../src/Components/teacher/Syllabus/syllabusrecord';
import homework from '../src/Components/teacher/Homework/homework';
import HomeworkRecord from '../src/Components/teacher/Homework/homeworkrecord';
import AnnouncementRecord from '../src/Components/teacher/Announcement/announcementrecord';
import announcement from './Components/teacher/Announcement/announcement';
import query from '../src/Components/teacher/Query/query';

const App = () => (
  <Router>
      <Fragment>
        <Route exact path='/' component={landing}/>
        <Route exact path='/timetable' component={timetable}/>
        <Route exact path='/timetablerecord' component={TimetableRecord}/>
        <Route exact path='/syllabus' component={syllabus}/>
        <Route exact path='/syllabusrecord' component={SyllabusRecord}/>
        <Route exact path='/homework' component={homework}/>
        <Route exact path='/homeworkrecord' component={HomeworkRecord}/>
        <Route exact path='/announcement' component={announcement}/>
        <Route exact path='/announcementrecord' component={AnnouncementRecord}/>
        <Route exact path='/query' component={query}/>
      </Fragment>
    </Router>
);

export default App;
