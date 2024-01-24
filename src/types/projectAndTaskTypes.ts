import { calendarObject } from "./calendarTypes";
import { userQuery } from "./globalTypes";

interface teamUserRefInstance {
  first_name: string,
  last_name: string,
  job_title: string,
  company: string,
  user_id: string,
};

interface teamInstance {
  id: string,
  calendar: calendarObject,
  description: string,
  name: string,
  notes: object[], // add note type when created
  notifications: object[], // add notification type when created
  projects: object[], // add task type when created,
  team_color: string,
  team_lead: string,
  users: teamUserRefInstance[],
  pending_users: teamUserRefInstance[],
};

interface projectsAndTasksDashboardProps {
  userId: string,
  teams: string[] | teamInstance[],
  pendingTeams: string[] | teamInstance[],
  buildUserProfileRef: () => {
    first_name: string;
    last_name: string;
    job_title: string;
    company: string;
    user_id: string;
  },
  saveTeamDataToUser: (teams: teamInstance[], pending_teams: teamInstance[]) => void,
};

interface allProjectsViewerProps {
  changeCurrentView: (newView: 'dashboard' | 'team' | 'project') => void,
};

interface allTeamsViewerProps {
  changeCurrentView: (newView: 'dashboard' | 'team' | 'project') => void,
};

interface teamViewerProps {
  changeCurrentView: (newView: 'dashboard' | 'team' | 'project') => void,
};

interface projectViewerProps {
  changeCurrentView: (newView: 'dashboard' | 'team' | 'project') => void,
};

type formModalPreset = {
  mode: string,
  objectToEdit: object,
};

interface navBarProjectsAndTasksProps {
  userId: string,
  formModalPreset: formModalPreset,
  buildUserProfileRef: () => {
    first_name: string;
    last_name: string;
    job_title: string;
    company: string;
    user_id: string;
  },
}

interface formModalProjectsAndTasksProps {
  userId: string,
  formModalPreset: formModalPreset,
  buildUserProfileRef: () => {
    first_name: string;
    last_name: string;
    job_title: string;
    company: string;
    user_id: string;
  },
};

interface teamFormDataState {
  teamCreator: teamUserRefInstance,
  teamColor: string,
  teamDescription: string,
  teamMembers: userQuery[],
  teamName: string,
};

interface teamFormProps {
  userId: string,
  buildUserProfileRef: () => {
    first_name: string;
    last_name: string;
    job_title: string;
    company: string;
    user_id: string;
  },
}

export type {
  teamInstance,
  projectsAndTasksDashboardProps,
  allProjectsViewerProps,
  allTeamsViewerProps,
  teamViewerProps,
  projectViewerProps,
  navBarProjectsAndTasksProps,
  formModalProjectsAndTasksProps,
  teamFormDataState,
  teamFormProps,
};