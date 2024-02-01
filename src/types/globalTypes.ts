import { calendarObject } from "./calendarTypes"
import { personalCalendar } from "./calendarTypes"
import { userColorPreferences } from "./calendarTypes"

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
  user_color_preferences: userColorPreferences,
  verified_email: boolean,
  yearly_completed_projects: number,
  yearly_completed_tasks: number,
  yearly_completed_subtasks: number,
  _id: string,
};

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

interface userRef {
  first_name: string,
  last_name: string,
  job_title: string,
  company: string,
  user_id: string,
};

interface hexColorPickerProps {
  headerText: string,
  currentHexColor: string,
  changeHexColorSelection: (newColor: string) => void,
};

export type {
  userRef,
  userInstance,
  userQuery,
  hexColorPickerProps,
};