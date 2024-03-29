import { userQuery } from "./globalTypes";
import { userInstance } from "./globalTypes";

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
  calendarDatesData: object,
  usersPreferredCalendarColors: userColorPreferences,
  appendNewCalendarToUser: (calendar: calendarObject) => void,
  saveCalendarDatesAndHolidaysData: (data: CalendarDatesData) => void,
  saveAllUserCalendarsToUser: (populatedCalendars: calendarObject[], populatedPendingCalendars: calendarObject[], populatedPersonalCalendar: calendarObject) => void,
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
  removeCalendarFromUser: (calendarId: string) => void,
  addNewCalendarNoteToCalendar: (calendarId: string, updatedCalendar: calendarObject, calendarType: 'calendars' | 'personal_calendar') => void,
  updateCalendarNote: (calendarId: string, updatedNote: calendarNote, calendarChange: boolean) => void,
  removeCalendarNoteFromCalendar: (calendarId: string, noteId: string) => void,
  addCalendarColorPreference: (newColorScheme: colorScheme) => void,
};

interface calendarEditorState {
  active: boolean,
  calendar: {} | calendarObject,
};

interface EditCalendarProps {
  userId: string,
  selectedCalendar: {} | calendarObject,
  usersPreferredCalendarColors: userColorPreferences,
  handleDeactivateCalendarEditor: Function,
  updateCalendarInUser: (newCalendar: calendarObject) => void
  handleCalendarEditorChange: (updatedCalendar: calendarObject) => void,
  removeCalendarFromUser: (calendarId: string) => void,
  handleCalendarEventModificationRequest: (calendarId: string, calendarEvent: eventObject) => string | void,
  handleCalendarNoteModificationRequest: (calendarId: string, calendarNote: calendarNoteWithCalendarInfo) => string | void,
  addCalendarColorPreference: (newColorScheme: colorScheme) => void,
};

interface userListProps {
  users: userCalendarInstance[],
  type: string,
  userId: string,
  authUserIds: string[],
  selectedCalendarId: string,
  allUserIdsOfCalendar: string[],
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
  handleCalendarEditorChange: (updatedCalendar: calendarObject) => void,
};

type userListState = {} | userInstance;

interface AddUserToCalendarListProps {
  handleAddUserClick: () => void,
  addUserActivated: boolean,
  selectedCalendarId: string,
  type: string,
  allUserIdsOfCalendar: string[],
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
  handleCalendarEditorChange: (updatedCalendar: calendarObject) => void,
};

type calendarFormStatus = {
  event: boolean,
  eventDate: null | Date,
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
  handleActiveCalendarChange: Function,
  handleActivateCalendarEditor: Function,
  appendNewCalendarToUser: (calendar: calendarObject) => void,
  addNewCalendarNoteToCalendar: (calendarId: string, updatedCalendar: calendarObject, calendarType: 'calendars' | 'personal_calendar') => void,
  handleCalendarFormDataCleanup: () => void,
  updateCalendarNote: (calendarId: string, updatedNote: calendarNote, calendarChange: boolean) => void,
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
  storeSelectedViewingYear: (selectedYear: string) => void,
};

interface navLeftContainerProps {
  currentView: string,
  userCalendars: userCalendars,
  userId: string,
  calendarFormStatus: calendarFormStatus,
  calendarNoteEditRequest: calendarNoteEditRequest,
  calendarEventEditRequest: calendarEventEditRequest,
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
  handleCloseModalRequest: () => void,
  appendNewCalendarToUser: (calendar: calendarObject) => void,
  addNewCalendarNoteToCalendar: (calendarId: string, updatedCalendar: calendarObject, calendarType: 'calendars' | 'personal_calendar') => void,
  updateCalendarNote: (calendarId: string, updatedNote: calendarNote, calendarChange: boolean) => void,
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
};

interface addCalendarFormState {
  calendarColor: string,
  calendarName: string,
  createdBy: string,
  authorizedUsers: userQuery[],
  viewOnlyUsers: userQuery[],
}

type calendarUserQueryResults = userQuery[]

interface navRightContainerProps {
  userCalendars: userCalendars,
  currentView: string,
  activeCalendars: calendarObject[],
  calendarDatesData: CalendarDatesData | {},
  changeCurrentView: Function,
  handleActiveCalendarChange: Function,
  handleActivateCalendarEditor: Function,
  storeSelectedViewingYear: (selectedYear: string) => void,
};

interface dayViewProps {
  userId: string,
  calendarDatesData: {} | CalendarDatesData,
  activeCalendars: calendarObject[],
  currentViewingYear: string,
  handleNotesForCalendarRequestToAddNewNote: () => void,
  handleCalendarNoteModificationRequest: (calendarId: string, calendarNote: calendarNoteWithCalendarInfo) => void,
  removeCalendarNoteFromCalendar: (calendarId: string, noteId: string) => void,
  handleCalendarEventModificationRequest: (calendarId: string, calendarEvent: eventObject) => string | void,
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
  handleOpenAddEventFormClick: (viewType: string, dateInfo: string, dateInfoExtra?: number) => void
  dayNotes: [] | calendarNoteWithCalendarInfo[],
  dayEvents: [] | calendarEventWithCalendarName[],
};

interface weekViewProps {
  userId: string,
  calendarDatesData: {} | CalendarDatesData,
  activeCalendars: calendarObject[],
  currentViewingYear: string,
  handleNotesForCalendarRequestToAddNewNote: () => void,
  handleCalendarNoteModificationRequest: (calendarId: string, calendarNote: calendarNoteWithCalendarInfo) => void,
  removeCalendarNoteFromCalendar: (calendarId: string, noteId: string) => void,
  handleCalendarEventModificationRequest: (calendarId: string, calendarEvent: eventObject) => string | void,
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
  handleOpenAddEventFormClick: (viewType: string, dateInfo: string, dateInfoExtra?: number) => void
  weekNotes: [] | calendarNoteWithCalendarInfo[],
  weekEvents: [] | calendarEventWithCalendarName[],
};

interface monthViewProps {
  userId: string,
  calendarDatesData: {} | CalendarDatesData,
  activeCalendars: calendarObject[],
  currentViewingYear: string,
  handleNotesForCalendarRequestToAddNewNote: () => void,
  handleCalendarNoteModificationRequest: (calendarId: string, calendarNote: calendarNoteWithCalendarInfo) => void,
  removeCalendarNoteFromCalendar: (calendarId: string, noteId: string) => void,
  handleCalendarEventModificationRequest: (calendarId: string, calendarEvent: eventObject) => string | void,
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
  handleOpenAddEventFormClick: (viewType: string, dateInfo: string, dateInfoExtra?: number) => void
  monthNotes: [] | calendarNoteWithCalendarInfo[],
  monthEvents: [] | calendarEventWithCalendarName[],
};

interface yearViewProps {
  userId: string,
  calendarDatesData: {} | CalendarDatesData,
  activeCalendars: calendarObject[],
  currentViewingYear: string,
  handleNotesForCalendarRequestToAddNewNote: () => void,
  handleCalendarNoteModificationRequest: (calendarId: string, calendarNote: calendarNoteWithCalendarInfo) => void,
  removeCalendarNoteFromCalendar: (calendarId: string, noteId: string) => void,
  handleCalendarEventModificationRequest: (calendarId: string, calendarEvent: eventObject) => string | void,
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
  handleOpenAddEventFormClick: (viewType: string, dateInfo: string, dateInfoExtra?: number) => void
  yearNotes: [] | calendarNoteWithCalendarInfo[],
  yearEvents: [] | calendarEventWithCalendarName[],
};

interface eventViewerProps {
  event?: calendarEventWithCalendarName | undefined,
  events?: calendarEventWithCalendarName[],
  handleCloseEventViewerRequest: () => void,
  handleEditEventRequest: (event: calendarEventWithCalendarName) => void,
  verifyUserAuthorizationOfCalendar: (calendarId: string) => boolean,
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
};

interface noteViewerProps {
  note?: calendarNoteWithCalendarInfo,
  notes?: calendarNoteWithCalendarInfo[],
  handleCloseNoteViewerRequest: () => void,
  handleEditNoteRequest: (note: calendarNoteWithCalendarInfo) => void,
  verifyUserAuthorizationOfCalendar: (calendarId: string) => boolean,
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
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

interface yearViewSelectedDateState {
  status: boolean,
  events: calendarEventWithCalendarName[],
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

type calendarWeekViewStateForCalendarEvents = weekSlotObject;

interface weekSlotObject {
  'monday': eventObject[],
  'tuesday': eventObject[],
  'wednesday': eventObject[],
  'thursday': eventObject[],
  'friday': eventObject[],
  'saturday': eventObject[],
  'sunday': eventObject[],
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

type calendarFormStatusState = calendarFormStatus;

type calendarNotesGroupedState = {} | calendarNotesGrouped;

type calendarEventsGroupedState = {} | calendarEventsGrouped;

interface calendarNotesGrouped {
  dayNotes: calendarNotesWithInfo,
  weekNotes: calendarNotesWithInfo,
  monthNotes: calendarNotesWithInfo,
  yearNotes: calendarNotesWithInfo,
};

interface calendarEventsGrouped {
  dayEvents: calendarEventWithCalendarName[],
  weekEvents: calendarEventWithCalendarName[],
  monthEvents: calendarEventWithCalendarName[],
  yearEvents: calendarEventWithCalendarName[],
};

interface calendarModalState {
  list: calendarObject[],
};

interface addEventFormProps {
  userCalendars: userCalendars,
  userId: string,
  calendarFormEventDate: null | Date,
  handleCloseModalRequest: () => void,
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
  handleCloseModalRequest: () => void,
  updateCalendarInUser: (updatedCalendar: calendarObject) => void,
};

interface addNoteFormProps {
  userId: string,
  userCalendars: userCalendars,
  addNewCalendarNoteToCalendar: (calendarId: string, updatedCalendar: calendarObject, calendarType: 'calendars' | 'personal_calendar') => void,
  updateCalendarNote: (calendarId: string, updatedNote: calendarNote, calendarChange: boolean) => void,
  calendarNoteEditRequest: calendarNoteEditRequest,
  handleCloseModalRequest: () => void,
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

interface userColorPreferences {
  calendars: colorScheme[],
  chats: colorScheme[],
  teams: colorScheme[],
  user: {
    font_color: string,
    background_color: string,
  },    
};

interface colorScheme {
  object_id: string,
  background_color: string,
}

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
  calendar_color: string,
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
  note_background_color: string,
  note_color: string,
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

interface calendarEventWithCalendarName {
  calendar_id: string,
  calendar_name: string,
  combined_date_and_time: string,
  created_by: {
    first_name: string,
    last_name: string,
    user_id: string,
  },
  event_background_color: string,
  event_font_color: string,
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
  navRightContainerProps,
  dayViewProps,
  weekViewProps,
  monthViewProps,
  yearViewProps,
  eventViewerProps,
  noteViewerProps,
  notesForCalendarProps,
  notesForCalendarState,
  yearViewSelectedDateState,
  calendarNote,
  calendarNoteWithCalendarInfo,
  calendarNotesWithInfo,
  calendarViewStateForCalendarNotes,
  calendarViewStateForCalendarEvents,
  calendarWeekViewStateForCalendarEvents,
  timeSlotObject,
  selectedCalendarModalProps,
  dropDownCalendarItemsProps,
  calendarViewModalProps,
  yearModalProps,
  activeCalendarState,
  calendarFormStatusState,
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
  notesProps,
  accountProps,
  signUpData,
  loginData,
  signUpApiResponseObject,
  loginApiResponseObject,
  userReferenceInstance,
  userCalendars,
  calendarObject,
  eventObject,
  calendarEventWithCalendarName,
  userColorPreferences,
  colorScheme,
  personalCalendar,
};