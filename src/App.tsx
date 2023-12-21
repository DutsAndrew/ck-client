import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AnnouncementBar from './components/AnnouncementBar/AnnouncementBar';
import Welcome from './pages/Welcome';
import LoadingBar from './pages/LoadingBar';
import ScrollToTopButton from './components/ScrollToTopButton';
import { CalendarDatesData, appDataState, calendarNote, calendarObject, userInstance } from './types/calendarTypes';

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

  const saveAllUserCalendarsToUser = (
    populatedCalendars: calendarObject[], 
    populatedPendingCalendars: calendarObject[], 
    populatedPersonalCalendar: calendarObject
  ): void => {
    return setUser((prevUser: userInstance) => ({
      ...prevUser,
      calendars: populatedCalendars,
      pending_calendars: populatedPendingCalendars,
      personal_calendar: populatedPersonalCalendar,
    }));
  };

  const updateCalendarInUser = (updatedCalendar: calendarObject) => {
    return setUser((prevUser: userInstance) => ({
      ...prevUser,
      calendars: prevUser.calendars.map((calendar) =>
        calendar._id === updatedCalendar._id ? updatedCalendar : calendar
      ),
      personal_calendar: prevUser.personal_calendar._id === updatedCalendar._id ? updatedCalendar : prevUser.personal_calendar,
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

  const addNewCalendarNoteToCalendar = (
    calendarId: string, 
    updatedCalendar: calendarObject, 
    calendarType: 'calendars' | 'personal_calendar'
  ) => {
    if (!user || !(user as userInstance)[calendarType]) {
      return;
    };

    if (calendarType === 'calendars') {
      return setUser((prevUser: userInstance) => ({
        ...prevUser,
        calendars: prevUser.calendars.map((calendar) => {
          if (calendar._id === calendarId) {
            return updatedCalendar;
          };
          return calendar;
        }),
      }));
    };

    if (calendarType === 'personal_calendar') {
      return setUser((prevUser: userInstance) => ({
        ...prevUser,
        personal_calendar: updatedCalendar,
      }));
    };
  };

  const updateCalendarNote = (previousCalendarId: string, updatedNote: calendarNote, calendarChange: boolean) => {
    if (calendarChange === true) {
      return updateCalendarNoteCalendarSwap(previousCalendarId, updatedNote);
    }  else {
      return setUser((prevUser: userInstance) => {
        const { personal_calendar } = prevUser;
  
        if (personal_calendar._id === updatedNote.calendar_id) {
          const updatedCalendarNotes = personal_calendar.calendar_notes.map((note) => {
            if (note._id === updatedNote._id) {
              return updatedNote;
            };
            return note;
          });
  
          const updatedPersonalCalendar = {
            ...personal_calendar,
            calendar_notes: updatedCalendarNotes,
          };
    
          return { 
            ...prevUser,
            personal_calendar: updatedPersonalCalendar 
          };
        };
  
        const updatedCalendars = prevUser.calendars.map((calendar) => {
          if (calendar._id === updatedNote.calendar_id) {
            const updatedCalendarNotes = calendar.calendar_notes.map((note) => {
              if (note._id === updatedNote._id) {
                return updatedNote; // Update the specific note
              }
              return note; // Return other notes as is
            });
            return { ...calendar, calendar_notes: updatedCalendarNotes };
          }
          return calendar; // Return other calendars as is
        });
        return {
          ...prevUser,
          calendars: updatedCalendars 
        };
      });
    };
  };

  const updateCalendarNoteCalendarSwap = (previousCalendarId: string, updatedNote: calendarNote) => {
    setUser((prevUser: userInstance) => {
      const { personal_calendar, calendars } = prevUser;

      // Filter and remove the note from its current location
      const updatedPersonalCalendarNotes = personal_calendar.calendar_notes.filter(
        note => (note._id !== updatedNote._id)
      );
      let updatedCalendars = calendars.map(calendar => ({
        ...calendar,
        calendar_notes: calendar.calendar_notes.filter(
          note => note._id !== updatedNote._id
        ),
      }));

      // Add note to it's matching calendar
      if (updatedNote.calendar_id === personal_calendar._id) {
        updatedPersonalCalendarNotes.push(updatedNote);
      } else {
        // add to calendar in calendars array
        updatedCalendars = updatedCalendars.map((calendar) => ({
          ...calendar,
          calendar_notes:
            calendar._id === updatedNote.calendar_id
              ? [...calendar.calendar_notes, updatedNote]
              : calendar.calendar_notes,
        }));
      };

      return {
        ...prevUser,
        personal_calendar: {
          ...personal_calendar,
          calendar_notes: updatedPersonalCalendarNotes,
        },
        calendars: updatedCalendars,
      };
    });
  };

  const removeCalendarNoteFromCalendar = (calendarId: string, noteId: string): void => {
    setUser((prevUser: userInstance) => {
      const { personal_calendar, calendars } = prevUser;

      // Filter and remove the note from its current location
      const updatedPersonalCalendarNotes = personal_calendar.calendar_notes.filter(
        note => (note._id !== noteId)
      );
      const updatedCalendars = calendars.map(calendar => ({
        ...calendar,
        calendar_notes: calendar.calendar_notes.filter(
          note => note._id !== noteId
        ),
      }));

      return {
        ...prevUser,
        personal_calendar: {
          ...personal_calendar,
          calendar_notes: updatedPersonalCalendarNotes,
        },
        calendars: updatedCalendars,
      };
    });
  };

  const handleSignOut = () => {
    setAuth(false);
    setUser({});
    setAppData({
      ...appData,
      calendarData: {},
    });
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
                addNewCalendarNoteToCalendar={addNewCalendarNoteToCalendar}
                updateCalendarNote={updateCalendarNote}
                removeCalendarNoteFromCalendar={removeCalendarNoteFromCalendar}
                calendarDatesData={appData.calendarData}
                usersPreferredCalendarColors={(user as userInstance).user_color_preferences}
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