import React, { FC, useState } from "react";
import { calendarNoteWithCalendarName, notesForCalendarProps } from "../../types/interfaces";
import styles from '../../styles/components/Calendar/calendar.module.css';
import chevronLeftSvg from '../../assets/chevron-left.svg';
import chevronRightSvg from '../../assets/chevron-right.svg';
import chevronUpSvg from '../../assets/arrow-up.svg';

const NotesForCalendar:FC<notesForCalendarProps> = (props): JSX.Element => {

  const { calendarNotes } = props;

  const [currentNotes, setCurrentNotes] = useState([calendarNotes.slice(0, 4)]);
  const [carousel, setCarousel] = useState(false);
  const [noteActivated, setNoteActivated] = useState({
    noteId: '',
    activated: false,
  });

  const handleCarouselStatusChange = () => {
    setCarousel(!carousel);
  };

  const handleCarouselBackwardsClick = () => {

  };

  const handleCarouselForwardsClick = () => {

  };

  const handleNoteActivation = (noteId: string) => {
    if (noteActivated.noteId === noteId) {
      return setNoteActivated({
        noteId: '',
        activated: false,
      });
    };

    setNoteActivated({
      noteId: noteId,
      activated: true,
    });
  };

  if (calendarNotes.length === 0) {
    return (
      <>
      </>
    );
  } else {
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
                onClick={() => handleNoteActivation(note._id)}
                className={noteActivated.noteId === note._id && noteActivated.activated ? styles.notesForCalendarNoteContainerActivated : styles.notesForCalendarNoteContainer}>
                  {noteActivated.noteId === note._id && noteActivated.activated ? (
                    <div className={styles.notesForCalendarNoteActivatedContainer}>
                      <p className={styles.notesForCalendarNoteCalendarNameText}>
                        {note.calendar_name}
                      </p>
                      <p className={styles.notesForCalendarNoteCreatorIntroText}>
                        Created by:
                      </p>
                      <p className={styles.notesForCalendarNoteCreatedByText}>
                        {(note as calendarNoteWithCalendarName).created_by.first_name},&nbsp;
                        {(note as calendarNoteWithCalendarName).created_by.last_name}
                      </p>
                      <button 
                        type="button"
                        className={styles.notesForCalendarEditButton}>
                          Edit
                      </button>
                      <button 
                        type="button"
                        className={styles.notesForCalendarDeleteButton}>
                          Delete
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className={styles.notesForCalendarNoteText}>
                        {note.note}
                      </p>
                    </>
                  )}
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
    );
  };
};

export default NotesForCalendar;