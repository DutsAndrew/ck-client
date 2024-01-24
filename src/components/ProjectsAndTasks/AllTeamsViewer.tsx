import React, { FC } from "react";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import { allTeamsViewerProps, teamInstance } from "../../types/projectAndTaskTypes";

const AllTeamsViewer: FC<allTeamsViewerProps> = (props): React.JSX.Element => {

  const { 
    teams,
    changeCurrentView 
  } = props;

  if (teams && (teams.length === 0 || typeof teams[0] === 'string')) {
    return (
      <section className={styles.allTeamsViewerContainer}>
      <h2 className={styles.allTeamsHeaderText}>
        No active teams
      </h2>
    </section>
    );
  } else {
    return (
      <section className={styles.allTeamsViewerContainer}>
        <h2 className={styles.allTeamsHeaderText}>
          Teams
        </h2>
        <ul className={styles.allTeamsViewList}>
          {Array.isArray(teams) && (teams as teamInstance[]).map((team) => {
            return <li 
              key={team.id}
              className={styles.allTeamsTeamCardContainer}
            >
              {team.name}
            </li>
          })}
        </ul>
      </section>
    );
  };
};

export default AllTeamsViewer;