import React, { useState, useCallback, FC} from "react";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import DraggableCard from "./DraggableCard";
import update from 'immutability-helper'
import { teamCardsContainerProps, teamInstance } from "../../types/projectAndTaskTypes";

const TeamCardsContainer: FC<teamCardsContainerProps> = (props): React.JSX.Element => {

  const { teams } = props;

  const [cards, setCards] = useState(teams);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    console.log(dragIndex, hoverIndex);
    setCards((prevCards: teamInstance[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as teamInstance],
        ],
      }),
    )
  }, []);

  return (
    <ul
      className={styles.allTeamsViewList}
    >
      {(cards).map((team: teamInstance) => (
        <DraggableCard 
          key={team._id} 
          id={team._id} 
          index={teams.indexOf(team as any)}
          name={team.name}
          moveCard={moveCard}
        />
      ))}
    </ul>
  );
};

export default TeamCardsContainer;