import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Calendar from './components/Calendar/Calendar';
import ClassManager from './components/ClassManager/ClassManager';
import TaskManager from './components/TaskManager/TaskManager';
import JenkinsAI from './components/JenkinsAI/JenkinsAI';
import NoteTaker from './components/NoteTaker/NoteTaker';
import Account from './components/Account/Account';
import TeamMessaging from './components/TeamMessaging/TeamMessaging';
import Footer from './components/Footer/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/class-manager' element={<ClassManager />} />
        <Route path='/task-manager' element={<TaskManager />} />
        <Route path='/jenkins-ai' element={<JenkinsAI />} />
        <Route path='/note-taker' element={<NoteTaker />} />
        <Route path='/account' element={<Account />} />
        <Route path='/team-messaging' element={<TeamMessaging />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
