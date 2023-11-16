import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AnnouncementBar from './components/AnnouncementBar/AnnouncementBar';
import Welcome from './pages/Welcome';
import LoadingBar from './pages/LoadingBar';
import ScrollToTopButton from './components/ScrollToTopButton';
import { CalendarDatesData, appDataState, calendarObject, userInstance } from './types/interfaces';

// lazy loaded items - ALL non essential functionality of the app
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const Calendar = lazy(() => import('./components/Calendar/Calendar'));
const Classes = lazy(() => import('./components/Classes/Classes'));
const Lessons = lazy(() => import('./components/Lessons/Lessons'));
const ProjectsAndTasksDashboard = lazy(() => import ('./components/ProjectsAndTasks/Dashboard'));
const JenkinsAI = lazy(() => import('./components/JenkinsAI/JenkinsAI'));
const Notes = lazy(() => import('./components/Notes/Notes'));
const Messaging = lazy(() => import('./components/Messaging/Messaging'));
const Account = lazy(() => import('./components/Account/Account'));
const Login = lazy(() => import('./pages/Login'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Pricing = lazy(() => import('./pages/Pricing'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Feedback = lazy(() => import('./pages/Feedback'));

function App() {

  const [auth, setAuth] = useState(false),
        [user, setUser] = useState({}),
        [appData, setAppData] = useState<appDataState>({
          calendarData: {},
        });

  const saveLoggedInUser = (user: userInstance) => {
    setUser(user);
    setAuth(true);
  };

  const saveCalendarDatesAndHolidaysData = (data: CalendarDatesData): void => {
    setAppData({
      calendarData: data,
    });
  };

  const saveAllUserCalendarsToUser = (populatedCalendars: calendarObject[], populatedPendingCalendars: calendarObject[], populatedPersonalCalendar: calendarObject): void => {
    return setUser((prevUser: userInstance) => ({
      ...prevUser,
      calendars: populatedCalendars,
      pending_calendars: populatedPendingCalendars,
      personal_calendar: populatedPersonalCalendar,
    }));
  };

  const updateCalendarInUser = (newCalendar: calendarObject) => {
    return setUser((prevUser: userInstance) => ({
      ...prevUser,
      calendars: prevUser.calendars.map((calendar) =>
        calendar._id === newCalendar._id ? newCalendar : calendar
      ),
    }));
  };

  const appendNewCalendarToUser = (calendar: calendarObject): void => {
    return setUser((prevUser: userInstance) => ({
      ...prevUser,
      calendars: [...prevUser.calendars, calendar]
    }));
  };

  const removeCalendarFromUser = (calendarId: string): void => {
    return setUser((prevUser: userInstance) => ({
      ...prevUser,
      calendars: prevUser.calendars.filter((calendar) => calendar._id !== calendarId),
      pending_calendars: prevUser.pending_calendars.filter((calendar) => calendar._id !== calendarId),
    }));
  };

  const handleSignOut = () => {
    setUser({});
    setAppData({
      ...appData,
      calendarData: {},
    });
    setAuth(false);
  };

  return (
    <Router>
      <Toaster 
          position="top-center"
      />
      <Header auth={auth} handleSignOut={handleSignOut} />
      <AnnouncementBar auth={auth} />
      <Routes>
        <Route 
          path='/' 
          element={<Welcome />}
        />
        <Route 
          path='/dashboard'
          element={
            <Suspense fallback={<LoadingBar />}>
              <Dashboard user={user} />
            </Suspense>
          }
        />
        <Route
          path='/calendar'
          element={
            <Suspense fallback={<LoadingBar />}>
              <Calendar
                usersFirstName={(user as userInstance).first_name}
                usersPersonalCalendar={(user as userInstance).personal_calendar}
                usersTeamCalendars={(user as userInstance).calendars}
                usersPendingCalendars={(user as userInstance).pending_calendars}
                userId={(user as userInstance)._id}
                appendNewCalendarToUser={appendNewCalendarToUser}
                saveCalendarDatesAndHolidaysData={saveCalendarDatesAndHolidaysData}
                saveAllUserCalendarsToUser={saveAllUserCalendarsToUser}
                updateCalendarInUser={updateCalendarInUser}
                removeCalendarFromUser={removeCalendarFromUser}
                calendarDatesData={appData.calendarData}
              />
            </Suspense>
          }
        />
        <Route 
          path='/classes'
          element={
            <Suspense fallback={<LoadingBar />}>
              <Classes user={user} />
            </Suspense>
          }
        />
        <Route 
          path='/lessons'
          element={
            <Suspense fallback={<LoadingBar />}>
              <Lessons user={user} />
            </Suspense>
          }
        />
        <Route
          path='/projects&tasks-dashboard'
          element={
            <Suspense fallback={<LoadingBar />}>
              <ProjectsAndTasksDashboard user={user} />
            </Suspense>
          }
        />
        <Route
          path='/login'
          element={
            <Suspense fallback={<LoadingBar />}>
              <Login saveLoggedInUser={saveLoggedInUser} />
            </Suspense>
          }
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
      <ScrollToTopButton />
      <Footer />
    </Router>
  );
}

export default App;