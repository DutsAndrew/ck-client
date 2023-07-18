import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Calendar from './components/Calendar/Calendar';
import ClassManager from './components/ClassManager/ClassManager';
import TaskManager from './components/TaskManager/TaskManager';
import JenkinsAI from './components/JenkinsAI/JenkinsAI';
import NoteTaker from './components/NoteTaker/NoteTaker';
import Account from './components/Account/Account';
import TeamMessaging from './components/TeamMessaging/TeamMessaging';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/class-manager' element={<ClassManager />} />
        <Route path='/task-manager' element={<TaskManager />} />
        <Route path='/jenkins-ai' element={<JenkinsAI />} />
        <Route path='/note-taker' element={<NoteTaker />} />
        <Route path='/account' element={<Account />} />
        <Route path='/team-messaging' element={<TeamMessaging />} />
      </Routes>
    </Router>
  );
}

export default App;
