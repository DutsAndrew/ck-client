import React, { useState, useCallback, FC, useEffect} from "react";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import DraggableCard from "./DraggableCard";
import { teamCardsContainerProps, teamInstance } from "../../types/projectAndTaskTypes";
import update from 'immutability-helper'
import toast from "react-hot-toast";

const TeamCardsContainer: FC<teamCardsContainerProps> = (props): React.JSX.Element => {

  const { 
    teams,
    updateReorderedUserTeamList,
  } = props;

  const [cards, setCards] = useState(teams);
  const [cardsMoved, setCardsMoved] = useState(false); // created to prevent a db upload when teams populates from api call

  useEffect(() => {
    setCards(teams);
  }, [teams]);

  useEffect(() => {
    if (cardsMoved === true) updateTeamOrderInDb();
  }, [cardsMoved]);

  const moveCard = useCallback( async (dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: teamInstance[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as teamInstance],
        ],
      }),
    );
    setCardsMoved(true);
  }, [])

  const updateTeamOrderInDb = async () => {
    toast.loading('Reordering teams...', {id: 'reOrderTeamList'});
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return toast.error('You must be signed in or not in incognito to perform this action', {id: 'reOrderTeamList'});
    } else {
      const apiUrl = 'http://127.0.0.1:8000/team/reOrderUserTeams';
      const request = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(compileCardArrayById()),
      });
      const response = await request.json();
      if (request.ok && request.status === 200 && response.teams) {
        toast.success('Reordered Teams!', {id: 'reOrderTeamList'});
        updateReorderedUserTeamList(response.teams);
      } else {
        toast.error('Failed to reorder your teams', {id: 'reOrderTeamList'});
      };
    };
    setCardsMoved(false);
  };

  const compileCardArrayById = () => {
    const cardIds: string[] = [];

    cards.forEach((card) => {
      cardIds.push(card._id);
    });

    return cardIds;
  };

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