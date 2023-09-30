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
  sendUserId: Function,
};

interface calendarEditorState {
  active: boolean,
  calendar: {} | calendarObject,
};

interface EditCalendarProps {
  selectedCalendar: {} | calendarObject,
  handleDeactivateCalendarEditor: Function,
};

interface userListProps {
  calendar: userCalendarInstance[],
  type: string,
};

interface calendarNavProps {
  userCalendars: userCalendars,
  currentView: string,
  activeCalendars: calendarObject[],
  changeCurrentView: Function,
  handleCalendarTimeChangeRequest: Function,
  handleActiveCalendarChange: Function,
  handleActivateCalendarEditor: Function,
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
  activeCalendars: calendarObject[],
  changeCurrentView: Function,
  handleActiveCalendarChange: Function,
  handleActivateCalendarEditor: Function,
};

interface dayViewProps {
  currentDay: string,
  calendars: userCalendars,
  activeCalendars: calendarObject[],
};

interface weekViewProps {
  currentDay: string,
  calendars: userCalendars,
  activeCalendars: calendarObject[],
};

interface monthViewProps {
  currentDay: string,
  calendars: userCalendars,
  activeCalendars: calendarObject[],
};

interface yearViewProps {
  currentDay: string,
  calendars: userCalendars,
  activeCalendars: calendarObject[],
};

interface calendarModalProps {
  userCalendars: userCalendars,
  activeCalendars: calendarObject[],
  handleChangeActiveCalendars: Function,
  handleCalendarEditRequest: Function,
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

type activeCalendarState = calendarObject[];

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

interface userReferenceInstance {
  company: string,
  email: string,
  first_name: string,
  job_title: string,
  joined: string,
  last_contributed: string,
  last_name: string,
  last_online: string,
  total_completed_projects: number,
  total_completed_tasks: number,
  total_completed_subtasks: number,
  yearly_completed_projects: number,
  yearly_completed_tasks: number,
  yearly_completed_subtasks: number,
  _id: string,
};

interface userCalendarInstance {
  company: string,
  email: string,
  first_name: string,
  job_title: string,
  last_name: string,
  _id: string,
};

interface calendarObject {
  authorized_users: userCalendarInstance[],
  calendar_holidays: [],
  calendar_type: string,
  calendar_years_and_dates: [],
  created_by: string,
  created_on: string,
  events: eventObject[],
  name: string,
  pending_authorized_users: userCalendarInstance[],
  view_only_users: userCalendarInstance[],
  _id: string,
}

interface eventObject {
  calendar: string,
  created_by: string,
  event_date_and_time: string,
  event_description: string,
  event_name: string,
  patterns: string,
  repeats: boolean,
  _id: string,
}

type personalCalendar = calendarObject;

type allUserCalendars = calendarObject[];

interface userCalendars {
  personalCalendar: personalCalendar,
  teamCalendars: allUserCalendars,
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
  calendarEditorState,
  EditCalendarProps,
  userListProps,
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
  activeCalendarState,
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
  userReferenceInstance,
  userCalendars,
  calendarObject,
  scrollToTopProps,
};