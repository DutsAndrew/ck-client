import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Calendar from './components/Calendar/Calendar';
import Classes from './components/Classes/Classes';
import Lessons from './components/Lessons/Lessons';
import ProjectsAndTasksDashboard from './components/ProjectsAndTasks/Dashboard';
import Footer from './components/Footer/Footer';
import AnnouncementBar from './components/AnnouncementBar/AnnouncementBar';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import LoadingBar from './pages/LoadingBar';
import { userInstance } from './types/interfaces';

// lazy loaded items - ALL non essential functionality of the app
const JenkinsAI = lazy(() => import('./components/JenkinsAI/JenkinsAI'));
const Notes = lazy(() => import('./components/Notes/Notes'));
const Messaging = lazy(() => import('./components/Messaging/Messaging'));
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
          element={<Dashboard user={user} />}
        />
        <Route
          path='/calendar'
          element={<Calendar user={user} />}
        />
        <Route 
          path='/classes'
          element={<Classes user={user} />}
        />
        <Route 
          path='/lessons'
          element={<Lessons user={user} />}
        />
        <Route
          path='/projects&tasks-dashboard'
          element={<ProjectsAndTasksDashboard user={user} />}
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
          path="/notes"
          element={
            <Suspense fallback={<LoadingBar />}>
              <Notes user={user} />
            </Suspense>
          }
        />
        <Route
          path="/messaging"
          element={
            <Suspense fallback={<LoadingBar />}>
              <Messaging />
            </Suspense>
          }
        />
        <Route
          path="/account"
          element={
            <Suspense fallback={<LoadingBar />}>
              <Account user={user} />
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