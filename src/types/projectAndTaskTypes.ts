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
  _id: string,
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
  addTeamToUser: (newTeam: teamInstance) => void,
};

interface allProjectsViewerProps {
  changeCurrentView: (newView: 'dashboard' | 'team' | 'project') => void,
};

interface allTeamsViewerProps {
  teams: string[] | teamInstance[],
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
  addTeamToUser: (newTeam: teamInstance) => void,
}

interface formModalProjectsAndTasksProps {
  userId: string,
  formModalPreset: formModalPreset,
  closeForm: () => void,
  buildUserProfileRef: () => {
    first_name: string;
    last_name: string;
    job_title: string;
    company: string;
    user_id: string;
  },
  addTeamToUser: (newTeam: teamInstance) => void,
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
  closeForm: () => void,
  buildUserProfileRef: () => {
    first_name: string;
    last_name: string;
    job_title: string;
    company: string;
    user_id: string;
  },
  addTeamToUser: (newTeam: teamInstance) => void,
}

interface teamCardsContainerProps {
  teams: teamInstance[],
};

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
  teamCardsContainerProps,
};