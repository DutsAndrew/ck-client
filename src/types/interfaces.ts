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
    personal_calendar: calendarObject,
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
  saveAllUserCalendarsToUser: (populatedCalendars: calendarObject[], populatedPendingCalendars: calendarObject[], populatedPersonalCalendar: calendarObject) => void,
  updateCalendarInUser: (newCalendar: calendarObject) => void,
  removeCalendarFromUser: (calendarId: string) => void,
  addNewCalendarNoteToCalendar: (calendarId: string, updatedCalendar: calendarObject, calendarType: 'calendars' | 'personal_calendar') => void,
  updateCalendarNote: (calendarId: string, updatedNote: calendarNote) => void,
  calendarDatesData: object,
};

interface calendarEditorState {
  active: boolean,
  calendar: {} | calendarObject,
};

interface EditCalendarProps {
  userId: string,
  selectedCalendar: {} | calendarObject,
  handleDeactivateCalendarEditor: Function,
  updateCalendarInUser: (newCalendar: calendarObject) => void
  handleCalendarEditorChange: (updatedCalendar: calendarObject) => void,
  removeCalendarFromUser: (calendarId: string) => void,
};

interface userListProps {
  users: userCalendarInstance[],
  type: string,
  userId: string,
  authUserIds: string[],
  selectedCalendarId: string,
  updateCalendarInUser: (newCalendar: calendarObject) => void,
  handleCalendarEditorChange: (updatedCalendar: calendarObject) => void,
};

type userListState = {} | userInstance;

interface AddUserToCalendarListProps {
  handleAddUserClick: () => void,
  addUserActivated: boolean,
  selectedCalendarId: string,
  type: string,
  updateCalendarInUser: (newCalendar: calendarObject) => void,
  handleCalendarEditorChange: (updatedCalendar: calendarObject) => void,
};

type calendarFormStatus = {
  event: boolean,
  note: boolean,
  calendar: boolean,
};

type calendarNoteEditRequest = {
  calendarId: string,
  note: {} | calendarNoteWithCalendarName,
  status: boolean,
}

interface calendarNavProps {
  userCalendars: userCalendars,
  currentView: string,
  activeCalendars: calendarObject[],
  calendarDatesData: CalendarDatesData | {},
  userId: string,
  calendarFormStatus: calendarFormStatus,
  calendarNoteEditRequest: calendarNoteEditRequest,
  changeCurrentView: Function,
  handleCalendarTimeChangeRequest: Function,
  handleActiveCalendarChange: Function,
  handleActivateCalendarEditor: Function,
  appendNewCalendarToUser: (calendar: calendarObject) => void,
  addNewCalendarNoteToCalendar: (calendarId: string, updatedCalendar: calendarObject, calendarType: 'calendars' | 'personal_calendar') => void,
  handleCalendarFormDataCleanup: () => void,
  updateCalendarNote: (calendarId: string, updatedNote: calendarNote) => void,
};

interface navLeftContainerProps {
  currentView: string,
  userCalendars: userCalendars,
  userId: string,
  calendarFormStatus: calendarFormStatus,
  calendarNoteEditRequest: calendarNoteEditRequest,
  handleCalendarTimeChangeRequest: Function,
  appendNewCalendarToUser: (calendar: calendarObject) => void,
  addNewCalendarNoteToCalendar: (calendarId: string, updatedCalendar: calendarObject, calendarType: 'calendars' | 'personal_calendar') => void,
  handleCalendarFormDataCleanup: () => void,
  updateCalendarNote: (calendarId: string, updatedNote: calendarNote) => void,
};

interface addFormModalProps {
  userCalendars: userCalendars,
  userId: string,
  calendarFormStatus: calendarFormStatus,
  calendarNoteEditRequest: calendarNoteEditRequest,
  handleCloseModalRequest: Function,
  appendNewCalendarToUser: (calendar: calendarObject) => void,
  addNewCalendarNoteToCalendar: (calendarId: string, updatedCalendar: calendarObject, calendarType: 'calendars' | 'personal_calendar') => void,
  updateCalendarNote: (calendarId: string, updatedNote: calendarNote) => void,
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
  activeCalendars: calendarObject[],
  handleNotesForCalendarRequestToAddNewNote: () => void,
  handleCalendarNoteModificationRequest: (calendarId: string, calendarNote: calendarNoteWithCalendarName) => void,
};

interface weekViewProps {
  currentDay: string,
  activeCalendars: calendarObject[],
  handleNotesForCalendarRequestToAddNewNote: () => void,
  handleCalendarNoteModificationRequest: (calendarId: string, calendarNote: calendarNoteWithCalendarName) => void,
};

interface monthViewProps {
  currentDay: string,
  activeCalendars: calendarObject[],
  calendarDatesData: {} | CalendarDatesData,
  handleNotesForCalendarRequestToAddNewNote: () => void,
  handleCalendarNoteModificationRequest: (calendarId: string, calendarNote: calendarNoteWithCalendarName) => void,
};

interface yearViewProps {
  currentDay: string,
  activeCalendars: calendarObject[],
  calendarDatesData: {} | CalendarDatesData,
  handleNotesForCalendarRequestToAddNewNote: () => void,
  handleCalendarNoteModificationRequest: (calendarId: string, calendarNote: calendarNoteWithCalendarName) => void,
};

interface notesForCalendarProps {
  calendarNotes: calendarNotesWithName,
  handleNotesForCalendarRequestToAddNewNote: () => void,
  handleCalendarNoteModificationRequest: (calendarId: string, calendarNote: calendarNoteWithCalendarName) => void,
};

type notesForCalendarState = {
  notes: calendarNotesWithName | [],
  set: number[],
};

type calendarViewStateForCalendarNotes = calendarNotesWithName;

interface selectedCalendarModalProps {
  userCalendars: userCalendars,
  activeCalendars: calendarObject[],
  handleChangeActiveCalendars: Function,
  handleCalendarEditRequest: Function,
  handleModalDeactivation: () => void,
};

interface dropDownCalendarItemsProps {
  selectedCalendars: {
    list: calendarObject[],
  },
  handleUserSelection: (calendar: calendarObject, e: React.MouseEvent<HTMLLIElement, MouseEvent> | React.ChangeEvent<HTMLInputElement>) => void,
  handleEditRequestForSelectedCalendar: (selectedCalendar: calendarObject) => any,
  calendars: calendarObject[],
};

interface calendarViewModalProps {
  handleChangeViewRequest: Function,
  handleModalDeactivation: () => void,
};

interface yearModalProps {
  calendarYears: any[],
  handleChangeYearRequest: Function,
  handleModalDeactivation: () => void,
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
  calendarFormStatus: calendarFormStatus,
  calendarNoteEditRequest: calendarNoteEditRequest,
  appendNewCalendarToUser: (calendar: calendarObject) => void,
  addNewCalendarNoteToCalendar: (calendarId: string, updatedCalendar: calendarObject, calendarType: 'calendars' | 'personal_calendar') => void,
  updateCalendarNote: (calendarId: string, updatedNote: calendarNote) => void,
  handleCloseModalRequest: Function,
};

interface addNoteFormProps {
  userId: string,
  userCalendars: userCalendars,
  addNewCalendarNoteToCalendar: (calendarId: string, updatedCalendar: calendarObject, calendarType: 'calendars' | 'personal_calendar') => void,
  updateCalendarNote: (calendarId: string, updatedNote: calendarNote) => void,
  calendarNoteEditRequest: calendarNoteEditRequest,
};

interface addNoteFormDataState {
  note: string,
  selectedDay: string,
  selectedWeek: string,
  selectedMonth: string,
  selectedYear: string,
  selectedCalendar: string,
  selectedCalendarId: string,
}

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

interface userCalendarNoteInstance {
  company: string,
  email: string,
  first_name: string,
  job_title: string,
  last_name: string,
};

interface userCalendarPendingUserInstance {
  type: string,
  user: userCalendarInstance,
};

interface calendarObject {
  authorized_users: userCalendarInstance[],
  calendar_notes: calendarNotes,
  calendar_type: string,
  created_by: string,
  created_on: string,
  events: eventObject[],
  name: string,
  pending_users: userCalendarInstance[],
  view_only_users: userCalendarInstance[],
  _id: string,
}

interface calendarNote {
  _id: string,
  created_by: userCalendarNoteInstance,
  created_on: string,
  note: string,
  start_date: string,
  end_date: string,
  type: string,
}

interface calendarNoteWithCalendarName {
  _id: string,
  calendar_id: string,
  calendar_name: string,
  created_by: userCalendarNoteInstance,
  created_on: string,
  note: string,
  start_date: string,
  end_date: string,
  type: string,
}

type calendarNotes = calendarNote[];

type calendarNotesWithName = calendarNoteWithCalendarName[];

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
  userListState,
  AddUserToCalendarListProps,
  userCalendarPendingUserInstance,
  userCalendarInstance,
  calendarNavProps,
  navLeftContainerProps,
  addFormModalProps,
  addCalendarFormState,
  calendarUserQueryResults,
  userQuery,
  navRightContainerProps,
  dayViewProps,
  weekViewProps,
  monthViewProps,
  yearViewProps,
  notesForCalendarProps,
  notesForCalendarState,
  calendarNote,
  calendarNoteWithCalendarName,
  calendarNotesWithName,
  calendarViewStateForCalendarNotes,
  selectedCalendarModalProps,
  dropDownCalendarItemsProps,
  calendarViewModalProps,
  yearModalProps,
  activeCalendarState,
  calendarModalState,
  addEventFormProps,
  addCalendarFormProps,
  calendarFormSwitchProps,
  addNoteFormProps,
  addNoteFormDataState,
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
};