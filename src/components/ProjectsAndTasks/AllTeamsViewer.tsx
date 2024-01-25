import React, { FC } from "react";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import { allTeamsViewerProps, teamInstance } from "../../types/projectAndTaskTypes";
import TeamCardsContainer from "./TeamCardsContainer";


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
        <TeamCardsContainer 
          teams={teamsRef}
        />
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