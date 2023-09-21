interface AuthStatus {
  status: boolean;
};

interface announcementBarProps {
  auth: boolean,
};

interface NavBarProps {
  auth: boolean,
  handleSignOut: Function,
};

interface appNavBarProps {
  handleSignOut: Function,
};

interface HeaderProps {
  auth: boolean,
  handleSignOut: Function,
};

interface loginProps {
  saveLoggedInUser: Function,
};

interface dashboardProps {
  user: userInstance | {},
};

interface calendarProps {
  usersFirstName: string,
  usersPersonalCalendar: personalCalendar,
  usersTeamCalendars: allUserCalendars,
};

interface calendarNavProps {
  userCalendars: userCalendars,
  currentView: string,
  changeCurrentView: Function,
  handleCalendarTimeChangeRequest: Function,
};

interface calendarNavContainerLeftProps {
  currentView: string,
  handleCalendarTimeChangeRequest: Function,
};

interface addEventModalProps {
  handleCloseModalRequest: Function,
};

interface calendarNavContainerRightProps {
  userCalendars: userCalendars,
  currentView: string,
  changeCurrentView: Function,
};

interface dayViewProps {
  currentDay: string,
};

interface weekViewProps {
  currentDay: string,
};

interface monthViewProps {
  personalCalendar: personalCalendar,
  currentDay: string,
};

interface yearViewProps {
  personalCalendar: personalCalendar,
};

interface calendarModalProps {
  userCalendars: userCalendars,
  handleChangeActiveCalendars: Function,
};

interface calendarViewModalProps {
  handleChangeViewRequest: Function,
};

interface yearModalProps {
  userCalendarYears: {
    possiblePersonalCalendarYears: string[],
    possibleTeamCalendarYears: string[] | undefined,
  },
  handleChangeYearRequest: Function,
};

interface calendarModalState {
  list: calendarObject[],
};

interface classesProps {
  user: userInstance | {},
};


interface lessonsProps {
  user: userInstance | {},
};

interface projectsAndTasksDashboardProps {
  user: userInstance | {},
};

interface notesProps {
  user: userInstance | {},
};

interface accountProps {
  user: userInstance | {},
};

interface signUpData {
  email: string,
  first_name: string,
  last_name: string,
  password: string,
  job_title: string,
  company: string,
};

interface loginData {
  email: string,
  password: string,
};

interface signUpApiResponseObject {
  detail?: string,
  success?: boolean,
  user?: {
    email: string,
    first_name: string,
    last_name: string,
    job_title: string,
    company: string,
  },
};

interface loginApiResponseObject {
  headers: any,
  detail?: string,
  errors?: any,
  status?: boolean,
  user?: userInstance,
};

interface userInstance {
  account_type: string,
  calendars: [],
  chats: [],
  classes: [],
  company: string,
  email: string,
  first_name: string,
  job_title: string,
  joined: string,
  last_contributed: string,
  last_name: string,
  last_online: string,
  notes: [],
  pending_chats: [],
  pending_tasks: [],
  pending_teams: [],
  personal_calendar: personalCalendar,
  tasks: [],
  teams: [],
  total_completed_projects: number,
  total_completed_tasks: number,
  total_completed_subtasks: number,
  user_color_preferences: {
    calendars: [],
    chats: [],
    events: [],
    teams: [],
    user: {
      font_color: string,
      background_color: string,
    },    
  },
  verified_email: boolean,
  yearly_completed_projects: number,
  yearly_completed_tasks: number,
  yearly_completed_subtasks: number,
  _id: string,
};

interface personalCalendar {
  calendar_holidays: [],
  calendar_type: string,
  calendar_years_and_dates: [],
  events: [],
  name: string,
  type: string,
  _id: string,
};

interface calendarObject {
  calendar_holidays: [],
  calendar_type: string,
  calendar_years_and_dates: [],
  events: [],
  name: string,
  type: string,
  _id: string,
}

type allUserCalendars = calendarObject[];

interface userCalendars {
  personalCalendar: personalCalendar,
  allUserCalendars: allUserCalendars,
}

interface scrollToTopProps {
  handleScrollToTop: Function,
};

export type {
  AuthStatus,
  announcementBarProps,
  NavBarProps,
  appNavBarProps,
  HeaderProps,
  loginProps,
  dashboardProps,
  calendarProps,
  calendarNavProps,
  calendarNavContainerLeftProps,
  addEventModalProps,
  calendarNavContainerRightProps,
  dayViewProps,
  weekViewProps,
  monthViewProps,
  yearViewProps,
  calendarModalProps,
  calendarViewModalProps,
  yearModalProps,
  calendarModalState,
  classesProps,
  lessonsProps,
  projectsAndTasksDashboardProps,
  notesProps,
  accountProps,
  signUpData,
  loginData,
  signUpApiResponseObject,
  loginApiResponseObject,
  userInstance,
  userCalendars,
  calendarObject,
  scrollToTopProps,
};