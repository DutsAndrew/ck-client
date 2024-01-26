import React, { FC } from "react";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import { allTeamsViewerProps, teamInstance } from "../../types/projectAndTaskTypes";
import TeamCardsContainer from "./TeamCardsContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


const AllTeamsViewer: FC<allTeamsViewerProps> = (props): React.JSX.Element => {

  const { 
    teams,
    changeCurrentView 
  } = props;

  if (teams && teams.length > 0 && Array.isArray(teams)) {
    const teamsRef = teams as teamInstance[];
    return (
      <section className={styles.allTeamsViewerContainer}>
        <h2 className={styles.allTeamsHeaderText}>
          Teams
        </h2>
        <DndProvider backend={HTML5Backend}>
          <TeamCardsContainer 
            teams={teamsRef}
          />
        </DndProvider>
      </section>
    );
  } else {
    return (
      <section className={styles.allTeamsViewerContainer}>
      <h2 className={styles.allTeamsHeaderText}>
        No active teams
      </h2>
    </section>
    );
  };
};

export default AllTeamsViewer;