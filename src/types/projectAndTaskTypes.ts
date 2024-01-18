import { userQuery } from "./globalTypes";
import { userInstance } from "./globalTypes";

interface teamUserRefInstance {
  first_name: string,
  last_name: string,
  job_title: string,
  company: string,
  user_id: string,
};

interface projectsAndTasksDashboardProps {
  userId: string,
  buildUserProfileRef: () => {
    first_name: string;
    last_name: string;
    job_title: string;
    company: string;
    user_id: string;
  },
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
  buildUserProfileRef: () => {
    first_name: string;
    last_name: string;
    job_title: string;
    company: string;
    user_id: string;
  },
}

export type {
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