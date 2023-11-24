import React, { FC, useState } from "react";
import { calendarNoteWithCalendarName, notesForCalendarProps, notesForCalendarState } from "../../types/interfaces";
import styles from '../../styles/components/Calendar/calendar.module.css';
import chevronLeftSvg from '../../assets/chevron-left.svg';
import chevronRightSvg from '../../assets/chevron-right.svg';
import chevronUpSvg from '../../assets/arrow-up.svg';
import addItemSvg from '../../assets/plus.svg';
import toast from "react-hot-toast";

const NotesForCalendar:FC<notesForCalendarProps> = (props): JSX.Element => {

  const { 
    calendarNotes,
    handleNotesForCalendarRequestToAddNewNote,
    handleCalendarNoteModificationRequest,
  } = props;

  const [currentNotes, setCurrentNotes] = useState<notesForCalendarState>({
    // calendar notes are only displayed 3 at a time, so check if array has at least 3 items, if so slice it at 3, if not slice at the end of array
    notes: Array.isArray(calendarNotes) && calendarNotes.length > 0 
      ? calendarNotes.slice(0, 3) : [],
    set: [0, (calendarNotes.length > 3 ? 3 : calendarNotes.length - 1)],
  });
  const [carousel, setCarousel] = useState(false);
  const [noteActivated, setNoteActivated] = useState({
    noteId: '',
    activated: false,
  });

  const handleCarouselStatusChange = () => {
    setCarousel(!carousel);
  };

  const handleCarouselBackwardsClick = () => {
    if (calendarNotes.length <= 3) return;

    if (currentNotes.set[0] === 0) {
      return;
    } else {
      const newStart = currentNotes.set[0] - 1;
      const newEnd = currentNotes.set[1] - 1;
      setCurrentNotes((prevNotes) => ({
        notes: Array.isArray(calendarNotes) && calendarNotes.length > 0
          ? calendarNotes.slice(newStart, newEnd) : [],
        set: [newStart, newEnd],
      }));
    };
  };

  const handleCarouselForwardsClick = () => {
    if (calendarNotes.length <= 3) return;

    if (currentNotes.set[1] === calendarNotes.length) {
      return;
    } else {
      const newStart = currentNotes.set[0] + 1;
      const newEnd = currentNotes.set[1] + 1;
      setCurrentNotes((prevNotes) => ({
        notes: Array.isArray(calendarNotes) && calendarNotes.length > 0
          ? calendarNotes.slice(newStart, newEnd) : [],
        set: [newStart, newEnd],
      }));
    };
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

  const handleAddCalendarNote = () => {
    return handleNotesForCalendarRequestToAddNewNote();
  };

  const handleEditCalendarNoteClick = (calendarId: string, note: calendarNoteWithCalendarName) => {
    return handleCalendarNoteModificationRequest(calendarId, note);
  };

  const handleDeleteCalendarNoteClick = (calendarNoteId: string, calendarId: string) => {

  };

  if (calendarNotes.length === 0) {
    return (
      <>
      </>
    );
  } else {
    return (
      <div className={carousel ? styles.notesForCalendarContainer : styles.notesForCalendarContainerClosed}>
        <img 
          onClick={() => handleAddCalendarNote()}
          src={addItemSvg}
          alt="add item icon"
          className={carousel ? styles.notesForCalendarAddNewNoteSvg : styles.notesForCalendarAddNewNoteSvgHidden}>
        </img>
        <div className={carousel ? styles.notesForCalendarCarousel : styles.notesForCalendarCarouselHidden}>
          {/* check if calendar notes doesn't have 3 items or if the first element in array is the start, if so remove button */}
          <button className={currentNotes.set[0] !== 0 ? styles.notesForCalendarCarouselButton : styles.notesForCalendarCarouselButtonDeactivated}>
            <img 
              onClick={() => handleCarouselBackwardsClick()}
              src={chevronLeftSvg}
              alt="left arrow"
              className={styles.notesForCalendarCarouselButtonSvg}>
            </img>
          </button>
          <div className={styles.notesForCalendarCurrentNotesDisplay}>
            {Array.isArray(currentNotes.notes) && currentNotes.notes.length !== 0 && currentNotes.notes.map((note) => {
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
                        <em>Created by:</em>
                      </p>
                      <p className={styles.notesForCalendarNoteCreatedByText}>
                        {(note as calendarNoteWithCalendarName).created_by.first_name},&nbsp;
                        {(note as calendarNoteWithCalendarName).created_by.last_name}
                      </p>
                      <button 
                        type="button"
                        onClick={() => handleEditCalendarNoteClick(note.calendar_id, note)}
                        className={styles.notesForCalendarEditButton}>
                          Edit
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleDeleteCalendarNoteClick(note._id, note.calendar_id)}
                        className={styles.notesForCalendarDeleteButton}>
                          Delete
                      </button>
                    </div>
                  ) : (
                    <div className={styles.notesForCalendarNote}>
                      <p className={styles.notesForCalendarNoteText}>
                        {note.note}
                      </p>
                    </div>
                  )}
              </div>
            })}
          </div>
          {/* check if calendar notes doesn't have 3 items or if the last element in array is the end, if so remove button */}
          <button className={calendarNotes.length > 3 && currentNotes.set[1] !== calendarNotes.length ? styles.notesForCalendarCarouselButton : styles.   notesForCalendarCarouselButtonDeactivated}>
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