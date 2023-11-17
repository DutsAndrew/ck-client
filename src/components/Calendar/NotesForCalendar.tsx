import React, { FC, useState } from "react";
import { notesForCalendarProps } from "../../types/interfaces";
import styles from '../../styles/components/Calendar/calendar.module.css';
import chevronLeftSvg from '../../assets/chevron-left.svg';
import chevronRightSvg from '../../assets/chevron-right.svg';
import chevronUpSvg from '../../assets/arrow-up.svg';

const NotesForCalendar:FC<notesForCalendarProps> = (props): JSX.Element => {

  const { calendarNotes } = props;

  const [currentNotes, setCurrentNotes] = useState([calendarNotes.slice(0, 4)]);
  const [carousel, setCarousel] = useState(false);

  const handleCarouselStatusChange = () => {
    setCarousel(!carousel);
  };

  const handleCarouselBackwardsClick = () => {

  };

  const handleCarouselForwardsClick = () => {

  };

  return (
    <div className={styles.notesForCalendarContainer}>
      <div className={carousel ? styles.notesForCalendarCarousel : styles.notesForCalendarCarouselHidden}>
        <button className={styles.notesForCalendarCarouselButton}>
          <img 
            onClick={() => handleCarouselBackwardsClick()}
            src={chevronLeftSvg}
            alt="left arrow"
            className={styles.notesForCalendarCarouselButtonSvg}>
          </img>
        </button>
        <div className={styles.notesForCalendarCurrentNotesDisplay}>
          {Array.isArray(calendarNotes) && calendarNotes.length !== 0 && calendarNotes.map((note) => {
            return <div 
              key={note._id}
              className={styles.notesForCalendarNoteContainer}>
                <p className={styles.notesForCalendarNoteText}>
                  {note.note}
                </p>
            </div>
          })}
        </div>
        <button className={styles.notesForCalendarCarouselButton}>
          <img 
            onClick={() => handleCarouselForwardsClick()}
            src={chevronRightSvg}
            alt="right arrow"
            className={styles.notesForCalendarCarouselButtonSvg}>
          </img>
        </button>
      </div>
      <button 
        onClick={() => handleCarouselStatusChange()}
        className={carousel ? styles.notesForCalendarCloseCarouselButton : styles.notesForCalendarOpenCarouselButton}>
          <img 
            src={chevronUpSvg}
            alt={carousel ? 'up arrow' : 'down arrow'}
            className={carousel ? styles.notesForCalendarCloseCarouselButtonSvg : styles.notesForCalendarOpenCarouselButtonSvg}>
          </img>
          {carousel? 'Hide Notes' : 'Open Notes'}
      </button>
    </div>
  )
};

export default NotesForCalendar;