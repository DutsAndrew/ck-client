import { userQuery } from "./globalTypes";

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
}

interface formModalProjectsAndTasksProps {
  formModalPreset: formModalPreset,
};

interface teamFormDataState {
  teamColor: string,
  teamDescription: string,
  teamMembers: userQuery[],
  teamName: string,
};

export type {
  allProjectsViewerProps,
  allTeamsViewerProps,
  teamViewerProps,
  projectViewerProps,
  navBarProjectsAndTasksProps,
  formModalProjectsAndTasksProps,
  teamFormDataState,
};