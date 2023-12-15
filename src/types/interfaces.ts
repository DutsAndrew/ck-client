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

interface newEventCreatedApiResponse {
  detail: string,
  updated_calendar: calendarObject,
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
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
  removeCalendarFromUser: (calendarId: string) => void,
  addNewCalendarNoteToCalendar: (calendarId: string, updatedCalendar: calendarObject, calendarType: 'calendars' | 'personal_calendar') => void,
  updateCalendarNote: (calendarId: string, updatedNote: calendarNote, calendarChange: boolean) => void,
  removeCalendarNoteFromCalendar: (calendarId: string, noteId: string) => void,
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
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
  handleCalendarEditorChange: (updatedCalendar: calendarObject) => void,
};

type userListState = {} | userInstance;

interface AddUserToCalendarListProps {
  handleAddUserClick: () => void,
  addUserActivated: boolean,
  selectedCalendarId: string,
  type: string,
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
  handleCalendarEditorChange: (updatedCalendar: calendarObject) => void,
};

type calendarFormStatus = {
  event: boolean,
  note: boolean,
  calendar: boolean,
};

type calendarNoteEditRequest = {
  calendarId: string,
  note: {} | calendarNoteWithCalendarInfo,
  status: boolean,
}

type calendarEventEditRequest = {
  calendarId: string,
  event: {} | eventObject,
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
  calendarEventEditRequest: calendarEventEditRequest,
  changeCurrentView: Function,
  handleCalendarTimeChangeRequest: Function,
  handleActiveCalendarChange: Function,
  handleActivateCalendarEditor: Function,
  appendNewCalendarToUser: (calendar: calendarObject) => void,
  addNewCalendarNoteToCalendar: (calendarId: string, updatedCalendar: calendarObject, calendarType: 'calendars' | 'personal_calendar') => void,
  handleCalendarFormDataCleanup: () => void,
  updateCalendarNote: (calendarId: string, updatedNote: calendarNote, calendarChange: boolean) => void,
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
};

interface navLeftContainerProps {
  currentView: string,
  userCalendars: userCalendars,
  userId: string,
  calendarFormStatus: calendarFormStatus,
  calendarNoteEditRequest: calendarNoteEditRequest,
  calendarEventEditRequest: calendarEventEditRequest,
  handleCalendarTimeChangeRequest: Function,
  appendNewCalendarToUser: (calendar: calendarObject) => void,
  addNewCalendarNoteToCalendar: (calendarId: string, updatedCalendar: calendarObject, calendarType: 'calendars' | 'personal_calendar') => void,
  handleCalendarFormDataCleanup: () => void,
  updateCalendarNote: (calendarId: string, updatedNote: calendarNote, calendarChange: boolean) => void,
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
};

interface addFormModalProps {
  userCalendars: userCalendars,
  userId: string,
  calendarFormStatus: calendarFormStatus,
  calendarNoteEditRequest: calendarNoteEditRequest,
  calendarEventEditRequest: calendarEventEditRequest,
  handleCloseModalRequest: Function,
  appendNewCalendarToUser: (calendar: calendarObject) => void,
  addNewCalendarNoteToCalendar: (calendarId: string, updatedCalendar: calendarObject, calendarType: 'calendars' | 'personal_calendar') => void,
  updateCalendarNote: (calendarId: string, updatedNote: calendarNote, calendarChange: boolean) => void,
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
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
  userId: string,
  activeCalendars: calendarObject[],
  handleNotesForCalendarRequestToAddNewNote: () => void,
  handleCalendarNoteModificationRequest: (calendarId: string, calendarNote: calendarNoteWithCalendarInfo) => void,
  removeCalendarNoteFromCalendar: (calendarId: string, noteId: string) => void,
  handleCalendarEventModificationRequest: (calendarId: string, calendarEvent: eventObject) => string | void,
  dayNotes: {} | calendarNoteWithCalendarInfo[],
  dayEvents: [] | eventObject[],
};

interface weekViewProps {
  userId: string,
  activeCalendars: calendarObject[],
  handleNotesForCalendarRequestToAddNewNote: () => void,
  handleCalendarNoteModificationRequest: (calendarId: string, calendarNote: calendarNoteWithCalendarInfo) => void,
  removeCalendarNoteFromCalendar: (calendarId: string, noteId: string) => void,
  handleCalendarEventModificationRequest: (calendarId: string, calendarEvent: eventObject) => string | void,
  weekNotes: {} | calendarNoteWithCalendarInfo[],
  weekEvents: [] | eventObject[],
};

interface monthViewProps {
  userId: string,
  activeCalendars: calendarObject[],
  calendarDatesData: {} | CalendarDatesData,
  handleNotesForCalendarRequestToAddNewNote: () => void,
  handleCalendarNoteModificationRequest: (calendarId: string, calendarNote: calendarNoteWithCalendarInfo) => void,
  removeCalendarNoteFromCalendar: (calendarId: string, noteId: string) => void,
  handleCalendarEventModificationRequest: (calendarId: string, calendarEvent: eventObject) => string | void,
  monthNotes: {} | calendarNoteWithCalendarInfo[],
  monthEvents: [] | eventObject[],
};

interface yearViewProps {
  userId: string,
  activeCalendars: calendarObject[],
  calendarDatesData: {} | CalendarDatesData,
  handleNotesForCalendarRequestToAddNewNote: () => void,
  handleCalendarNoteModificationRequest: (calendarId: string, calendarNote: calendarNoteWithCalendarInfo) => void,
  removeCalendarNoteFromCalendar: (calendarId: string, noteId: string) => void,
  handleCalendarEventModificationRequest: (calendarId: string, calendarEvent: eventObject) => string | void,
  yearNotes: {} | calendarNoteWithCalendarInfo[],
  yearEvents: [] | eventObject[],
};

interface eventViewerProps {
  event: eventObject | undefined,
  handleCloseEventViewerRequest: () => void,
  handleEditEventRequest: (event: eventObject) => void,
};

interface notesForCalendarProps {
  userId: string,
  calendarNotes: calendarNotesWithInfo,
  handleNotesForCalendarRequestToAddNewNote: () => void,
  handleCalendarNoteModificationRequest: (calendarId: string, calendarNote: calendarNoteWithCalendarInfo) => void,
  removeCalendarNoteFromCalendar: (calendarId: string, noteId: string) => void,
};

type notesForCalendarState = {
  notes: calendarNotesWithInfo | [],
  set: number[],
};

type calendarViewStateForCalendarNotes = calendarNotesWithInfo;

type calendarViewStateForCalendarEvents = timeSlotObject;

interface timeSlotObject {
  '5 AM': eventObject[],
  '6 AM': eventObject[],
  '7 AM': eventObject[],
  '8 AM': eventObject[],
  '9 AM': eventObject[],
  '10 AM': eventObject[],
  '11 AM': eventObject[],
  '12 PM': eventObject[],
  '1 PM': eventObject[],
  '2 PM': eventObject[],
  '3 PM': eventObject[],
  '4 PM': eventObject[],
  '5 PM': eventObject[],
  '6 PM': eventObject[],
  '7 PM': eventObject[],
  'none': eventObject[],
};

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

type calendarNotesGroupedState = {} | calendarNotesGrouped;

type calendarEventsGroupedState = {} | calendarEventsGrouped;

interface calendarNotesGrouped {
  dayNotes: calendarNotesWithInfo,
  weekNotes: calendarNotesWithInfo,
  monthNotes: calendarNotesWithInfo,
  yearNotes: calendarNotesWithInfo,
};

interface calendarEventsGrouped {
  dayEvents: eventObject[],
  weekEvents: eventObject[],
  monthEvents: eventObject[],
  yearEvents: eventObject[],
};

interface calendarModalState {
  list: calendarObject[],
};

interface addEventFormProps {
  userCalendars: userCalendars,
  userId: string,
  handleCloseModalRequest: Function,
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
  calendarEventEditRequest: calendarEventEditRequest,
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
  calendarEventEditRequest: calendarEventEditRequest,
  appendNewCalendarToUser: (calendar: calendarObject) => void,
  addNewCalendarNoteToCalendar: (calendarId: string, updatedCalendar: calendarObject, calendarType: 'calendars' | 'personal_calendar') => void,
  updateCalendarNote: (calendarId: string, updatedNote: calendarNote, calendarChange: boolean) => void,
  handleCloseModalRequest: Function,
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
};

interface addNoteFormProps {
  userId: string,
  userCalendars: userCalendars,
  addNewCalendarNoteToCalendar: (calendarId: string, updatedCalendar: calendarObject, calendarType: 'calendars' | 'personal_calendar') => void,
  updateCalendarNote: (calendarId: string, updatedNote: calendarNote, calendarChange: boolean) => void,
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
};

interface calendarNote {
  _id: string,
  calendar_id: string,
  created_by: userCalendarNoteInstance,
  created_on: string,
  end_date: string,
  note: string,
  personal_calendar: boolean,
  start_date: string,
  type: string,
  user_ref: {
    first_name: string,
    last_name: string,
    user_id: string,
  },
};

interface calendarNoteWithCalendarInfo {
  _id: string,
  calendar_id: string,
  calendar_name: string,
  created_by: userCalendarNoteInstance,
  created_on: string,
  is_user_authorized: boolean,
  note: string,
  personal_calendar: boolean,
  start_date: string,
  end_date: string,
  type: string,
  user_ref: {
    first_name: string,
    last_name: string,
    user_id: string,
  },
};

type calendarNotes = calendarNote[];

type calendarNotesWithInfo = calendarNoteWithCalendarInfo[];

interface eventObject {
  calendar_id: string,
  combined_date_and_time: string,
  created_by: {
    first_name: string,
    last_name: string,
    user_id: string,
  },
  event_date: string,
  event_description: string,
  event_name: string,
  event_time: string,
  repeat_option: string,
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
  newEventCreatedApiResponse,
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
  eventViewerProps,
  notesForCalendarProps,
  notesForCalendarState,
  calendarNote,
  calendarNoteWithCalendarInfo,
  calendarNotesWithInfo,
  calendarViewStateForCalendarNotes,
  calendarViewStateForCalendarEvents,
  timeSlotObject,
  selectedCalendarModalProps,
  dropDownCalendarItemsProps,
  calendarViewModalProps,
  yearModalProps,
  activeCalendarState,
  calendarNotesGroupedState,
  calendarEventsGroupedState,
  calendarNotesGrouped,
  calendarEventsGrouped,
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
  eventObject,
};