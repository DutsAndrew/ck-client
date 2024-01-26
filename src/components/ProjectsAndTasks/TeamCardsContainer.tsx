import React, { useState, useCallback, FC, useEffect} from "react";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import DraggableCard from "./DraggableCard";
import { teamCardsContainerProps, teamInstance } from "../../types/projectAndTaskTypes";
import update from 'immutability-helper'

const TeamCardsContainer: FC<teamCardsContainerProps> = (props): React.JSX.Element => {

  const { teams } = props;

  const [cards, setCards] = useState(teams);

  useEffect(() => {
    setCards(teams);
  }, [teams]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: teamInstance[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as teamInstance],
        ],
      }),
    )
  }, [])

  return (
    <ul className={styles.allTeamsViewList}>
      {cards.map((item, index) => (
        <DraggableCard
          key={item._id}
          id={item._id}
          name={item.name}
          index={index}
          cardType='team'
          moveCard={moveCard}
        />
      ))}
    </ul>
  );
};

export default TeamCardsContainer;