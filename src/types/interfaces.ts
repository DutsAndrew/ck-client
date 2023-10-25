interface AuthStatus {
  status: boolean;
};

interface appDataState {
  calendarData: CalendarDatesData | {}
};

interface CalendarData {
  [year: string]: {
    [month: string]: {
      days: number;
      month_starts_on: string;
    };
  };
};

interface populatedUserCalendars {
  calendars: calendarObject[],
  pending_calendars: calendarObject[],
};

interface Holiday {
  date: string;
  name: string;
  type: string;
}

interface HolidayDates {
  [year: string]: Holiday[];
};

interface CalendarDatesData {
  _id: string;
  app_data_type: string;
  calendar_dates: CalendarData;
  holiday_dates: HolidayDates;
};

interface calendarApiResponse {
  detail: string;
  data: CalendarDatesData;
};

interface allUserCalendarsPopulatedApiResponse {
  detail: string,
  updated_user: {
    calendars: calendarObject[],
    pending_calendars: calendarObject[],
    _id: string,
  },
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
  usersPendingCalendars: allUserCalendars,
  userId: string,
  appendNewCalendarToUser: (calendar: calendarObject) => void,
  saveCalendarDatesAndHolidaysData: (data: CalendarDatesData) => void,
  saveAllUserCalendarsToUser: (populatedCalendars: calendarObject[], populatedPendingCalendars: calendarObject[]) => void,
  calendarDatesData: object,
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
  calendarDatesData: CalendarDatesData | {},
  userId: string,
  changeCurrentView: Function,
  handleCalendarTimeChangeRequest: Function,
  handleActiveCalendarChange: Function,
  handleActivateCalendarEditor: Function,
  appendNewCalendarToUser: (calendar: calendarObject) => void,
};

interface navLeftContainerProps {
  currentView: string,
  userCalendars: userCalendars,
  userId: string,
  handleCalendarTimeChangeRequest: Function,
  appendNewCalendarToUser: (calendar: calendarObject) => void,
};

interface addFormModalProps {
  userCalendars: userCalendars,
  userId: string,
  handleCloseModalRequest: Function,
  appendNewCalendarToUser: (calendar: calendarObject) => void,
};

interface addCalendarFormState {
  calendarName: string,
  createdBy: string,
  authorizedUsers: userQuery[],
  viewOnlyUsers: userQuery[],
}

type calendarUserQueryResults = userQuery[]

interface userQuery {
  user: {
    company: string,
    email: string,
    first_name: string,
    job_title: string,
    last_name: string,
    _id: string,
  }
}

interface navRightContainerProps {
  userCalendars: userCalendars,
  currentView: string,
  activeCalendars: calendarObject[],
  calendarDatesData: CalendarDatesData | {},
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
  calendarDatesData: {} | CalendarDatesData,
};

interface yearViewProps {
  currentDay: string,
  calendars: userCalendars,
  activeCalendars: calendarObject[],
  calendarDatesData: {} | CalendarDatesData,
};

interface selectedCalendarModalProps {
  userCalendars: userCalendars,
  activeCalendars: calendarObject[],
  handleChangeActiveCalendars: Function,
  handleCalendarEditRequest: Function,
};

interface calendarViewModalProps {
  handleChangeViewRequest: Function,
};

interface yearModalProps {
  calendarYears: any[],
  handleChangeYearRequest: Function,
};

type activeCalendarState = calendarObject[];

interface calendarModalState {
  list: calendarObject[],
};

interface addEventFormProps {
  userCalendars: userCalendars,
  userId: string,
  handleCloseModalRequest: Function,
};

interface addCalendarFormProps {
  userId: string,
  appendNewCalendarToUser: (calendar: calendarObject) => void,
  handleCloseModalRequest: Function,
};

interface calendarFormSwitchProps {
  userCalendars: userCalendars,
  userId: string,
  appendNewCalendarToUser: (calendar: calendarObject) => void,
  handleCloseModalRequest: Function,
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
  calendars: calendarObject[],
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
  pending_calendars: calendarObject[],
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
  calendar_type: string,
  created_by: string,
  created_on: string,
  events: eventObject[],
  name: string,
  pending_users: userCalendarInstance[],
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
  pendingCalendars: calendarObject[],
  teamCalendars: calendarObject[],
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
  appDataState,
  populatedUserCalendars,
  calendarApiResponse,
  allUserCalendarsPopulatedApiResponse,
  CalendarDatesData,
  calendarEditorState,
  EditCalendarProps,
  userListProps,
  calendarNavProps,
  navLeftContainerProps,
  addFormModalProps,
  addCalendarFormState,
  calendarUserQueryResults,
  navRightContainerProps,
  dayViewProps,
  weekViewProps,
  monthViewProps,
  yearViewProps,
  selectedCalendarModalProps,
  calendarViewModalProps,
  yearModalProps,
  activeCalendarState,
  calendarModalState,
  addEventFormProps,
  addCalendarFormProps,
  calendarFormSwitchProps,
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