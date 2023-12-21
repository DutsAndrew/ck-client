import React, { FC, useState, useEffect } from "react";
import { calendarNoteWithCalendarInfo, notesForCalendarProps, notesForCalendarState } from "../../types/calendarTypes";
import styles from '../../styles/components/Calendar/calendar.module.css';
import chevronLeftSvg from '../../assets/chevron-left.svg';
import chevronRightSvg from '../../assets/chevron-right.svg';
import chevronUpSvg from '../../assets/arrow-up.svg';
import addItemSvg from '../../assets/plus.svg';
import toast from "react-hot-toast";

const NotesForCalendar:FC<notesForCalendarProps> = (props): JSX.Element => {

  const { 
    userId,
    calendarNotes,
    handleNotesForCalendarRequestToAddNewNote,
    handleCalendarNoteModificationRequest,
    removeCalendarNoteFromCalendar,
  } = props;

  const [currentNotes, setCurrentNotes] = useState<notesForCalendarState>({
    notes: [], // current notes will be added here when calendarNotes is given as a prop
    set: [0, 0], // current window for notes being viewed, this is stored for slicing array not by index
  });
  const [carousel, setCarousel] = useState(false);
  const [noteActivated, setNoteActivated] = useState({
    noteId: '',
    activated: false,
  });

  useEffect(() => {
    setCurrentNotesSlidingWindow();
  }, [calendarNotes]);

  const setCurrentNotesSlidingWindow = () => {
    if (calendarNotes.length === 0) return;

    if (calendarNotes.length < 3) { // if less than 3 notes accurately set the set array
      setCurrentNotes({
        notes: calendarNotes.slice(0, calendarNotes.length),
        set: [0, calendarNotes.length],
      });
    };

    if (calendarNotes.length >= 3) { // if calendarNotes is large just splice and set the first 3 notes
      setCurrentNotes({
        notes: calendarNotes.slice(0, 3),
        set: [0, 3],
      });
    };
  };

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

  const handleEditCalendarNoteClick = (calendarId: string, note: calendarNoteWithCalendarInfo) => {
    return handleCalendarNoteModificationRequest(calendarId, note);
  };

  const handleDeleteCalendarNoteClick = async (calendarNoteId: string, calendarId: string) => {
    toast.loading('Deleting note...', {id: 'deletingCalendarNote'});
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return toast.error('You need to be signed in or not in incognito to perform this action', {id: 'deletingCalendarNote'});
    } else {
      const apiUrl = `http://127.0.0.1:8000/calendar/${calendarId}/deleteNote/${calendarNoteId}`;
      const request = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        method: 'DELETE',
      });
      const jsonResponse = await request.json();
      if (request.ok && request.status === 200 && jsonResponse.detail === "Success! Calendar was updated, note was removed") {
        toast.success('Note deleted', {id: 'deletingCalendarNote'});
        return removeCalendarNoteFromCalendar(calendarId, calendarNoteId); 
      } else {
        return toast.error('Failed to delete note', {id: 'deletingCalendarNote'});
      };
    };
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
                        {(note as calendarNoteWithCalendarInfo).created_by.first_name},&nbsp;
                        {(note as calendarNoteWithCalendarInfo).created_by.last_name}
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