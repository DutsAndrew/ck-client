import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Calendar from './components/Calendar/Calendar';
import ClassManager from './components/ClassManager/ClassManager';
import LessonManager from './components/LessonManager/LessonManager';
import TaskManager from './components/TaskManager/TaskManager';
import Footer from './components/Footer/Footer';
import AnnouncementBar from './components/AnnouncementBar/AnnouncementBar';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import LoadingBar from './pages/LoadingBar';
import { userInstance } from './types/interfaces';

// lazy loaded items - ALL non essential functionality of the app
const JenkinsAI = lazy(() => import('./components/JenkinsAI/JenkinsAI'));
const NoteTaker = lazy(() => import('./components/NoteTaker/NoteTaker'));
const TeamMessaging = lazy(() => import('./components/TeamMessaging/TeamMessaging'));
const Account = lazy(() => import('./components/Account/Account'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Pricing = lazy(() => import('./pages/Pricing'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Feedback = lazy(() => import('./pages/Feedback'));

function App() {


  const [auth, setAuth] = useState(false),
        [user, setUser] = useState({});

  const saveLoggedInUser = (user: userInstance) => {
    setUser(user);
    setAuth(true);
  };

  const handleSignOut = () => {
    setUser({});
    setAuth(false);
  };

  return (
    <Router>
      <Header auth={auth} handleSignOut={handleSignOut} />
      <AnnouncementBar />
      <Routes>
        <Route 
          path='/' 
          element={<Welcome />}
        />
        <Route 
          path='/dashboard'
          element={<Dashboard />}
        />
        <Route
          path='/calendar'
          element={<Calendar />}
        />
        <Route 
          path='/class-manager'
          element={<ClassManager />}
        />
        <Route 
          path='/lesson-manager'
          element={<LessonManager />}
        />
        <Route
          path='/task-manager'
          element={<TaskManager />}
        />
        <Route
          path='/login'
          element={<Login saveLoggedInUser={saveLoggedInUser} />}
        />
        <Route
          path="/jenkins-ai"
          element={
            <Suspense fallback={<LoadingBar />}>
              <JenkinsAI />
            </Suspense>
          }
        />
        <Route
          path="/note-taker"
          element={
            <Suspense fallback={<LoadingBar />}>
              <NoteTaker />
            </Suspense>
          }
        />
        <Route
          path="/team-messaging"
          element={
            <Suspense fallback={<LoadingBar />}>
              <TeamMessaging />
            </Suspense>
          }
        />
        <Route
          path="/account"
          element={
            <Suspense fallback={<LoadingBar />}>
              <Account />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<LoadingBar />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<LoadingBar />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="/pricing"
          element={
            <Suspense fallback={<LoadingBar />}>
              <Pricing />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<LoadingBar />}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="/feedback"
          element={
            <Suspense fallback={<LoadingBar />}>
              <Feedback />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;