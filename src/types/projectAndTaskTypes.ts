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

export type {
  allProjectsViewerProps,
  allTeamsViewerProps,
  teamViewerProps,
  projectViewerProps,
  navBarProjectsAndTasksProps,
  formModalProjectsAndTasksProps,
};