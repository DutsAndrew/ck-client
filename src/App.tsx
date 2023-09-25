import React, { lazy, Suspense, useState, useEffect } from 'react';
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
import ScrollToTopButton from './components/ScrollToTopButton';
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
        [user, setUser] = useState({}),
        [scrollStatus, setScrollStatus] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollStatus);
    return () => window.removeEventListener('scroll', handleScrollStatus);
  }, []);

  const saveLoggedInUser = (user: userInstance) => {
    setUser(user);
    setAuth(true);
  };

  const sendUserId = () => {
    return (user as userInstance)._id;
  };

  const handleSignOut = () => {
    setUser({});
    setAuth(false);
  };

  const handleScrollStatus = () => {
    const topOfPage = window.scrollY;
    if (topOfPage > 50) {
      setScrollStatus(true);
    } else {
      setScrollStatus(false);
    };
  };

  const handleScrollToTop = () => {
    window.scrollTo(0, document.body.scrollHeight - document.body.scrollHeight);
  };

  return (
    <Router>
      <Header auth={auth} handleSignOut={handleSignOut} />
      <AnnouncementBar auth={auth} />
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
          element={<Calendar
            usersFirstName={(user as userInstance).first_name}
            usersPersonalCalendar={(user as userInstance).personal_calendar}
            usersTeamCalendars={(user as userInstance).calendars}
            sendUserId={sendUserId}
          />}
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
      {scrollStatus === true ? <ScrollToTopButton handleScrollToTop={handleScrollToTop} /> : ''}
      <Footer />
    </Router>
  );
}

export default App;