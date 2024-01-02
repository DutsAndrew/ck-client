import React, { FC, useEffect } from "react";
import { calendarNoteWithCalendarInfo, noteViewerProps } from "../../types/calendarTypes";
import styles from '../../styles/components/Calendar/calendar.module.css';
import pencilSvg from '../../assets/pencil-outline.svg';
import trashSvg from '../../assets/delete.svg';
import closeSvg from '../../assets/close.svg';
import toast from "react-hot-toast";
import { getCalendarObjectTimeForLocal } from "../../scripts/calendarHelpers";

const NoteViewer:FC<noteViewerProps> = (props): JSX.Element => {

  const { 
    note, // note could be passed as undefined, handle appropriately, note is conditional
    notes, // // note could be passed as undefined, handle appropriately, notes is conditional
    handleCloseNoteViewerRequest,
    handleEditNoteRequest,
    verifyUserAuthorizationOfCalendar,
    updateCalendarInUser,
  } = props;

  useEffect(() => {
    temporarilyDisableScrollBar();

    return () => {
      reEnableScrollBar();
    };
  }, []);

  const handleNoteViewerOffClick = (e: React.MouseEvent) => {
    if ((e.target as any).id === 'note-viewer-background') {
      handleCloseNoteViewerRequest();
    };
  };

  const getCurrenTopOfClientScreen = () => {
    const yPosition = window.scrollY || document.documentElement.scrollTop;
    return {
      top: `${yPosition}px`,
    };
  };

  const temporarilyDisableScrollBar = () => {
    const body = document.body;
    body.classList.add('disableScrollbar');
  };

  const reEnableScrollBar = () => {
    const body = document.body;
    body.classList.remove('disableScrollbar');
  };

  const getNoteColorScheme = (note: calendarNoteWithCalendarInfo) => {
    // marking as any the styles are very visibly being applied here
    const noteStyle: any = {};

    if (note.note_background_color) {
      noteStyle.backgroundColor = note.note_background_color;
    };
    if (note.note_color) {
      noteStyle.color = note.note_color;
    };

    return noteStyle;
  };

  const handleEditNoteIconClick = (note: calendarNoteWithCalendarInfo) => {
    return handleEditNoteRequest(note);
  };

  const handleDeleteIconClick = async (note: calendarNoteWithCalendarInfo) => {
    const calendarId = note.calendar_id;

    if (typeof calendarId === 'undefined') {
      return;
    };
    
    if (verifyUserAuthorizationOfCalendar(calendarId)) {
      return await deleteNoteRequest(note);
    };
  };

  const deleteNoteRequest = async (note: calendarNoteWithCalendarInfo) => {
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return toast.error('You must be signed in or not in incognito to perform this action', {id: 'deletingNote'});
    } else {
      if (note.calendar_id && note._id) {
        const apiUrl = `http://127.0.0.1:8000/calendar/${note.calendar_id}/deleteNote/${note._id}`;
        const request = await fetch(apiUrl, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
          method: 'DELETE',
        });
        const jsonResponse = await request.json();
        if (!request.ok && request.status !== 200 && !jsonResponse.updated_calendar) {
          return toast.error(`${jsonResponse.detail}`, {id: 'deletingNote'});
        } else {
          toast.success('note Deleted!', {id: 'deletingNote'});
          reEnableScrollBar();
          updateCalendarInUser(jsonResponse.updated_calendar);
          handleCloseNoteViewerRequest();
        };
      } else {
        return;
      };
    };
  };

  const handleNoteViewerCloseRequest = () => {
    handleCloseNoteViewerRequest();
  };

  if (typeof note !== 'undefined' && Object.keys(note).length > 0) {
    return (
      <section 
        onClick={(e) => handleNoteViewerOffClick(e)}
        id="note-viewer-background"
        style={getCurrenTopOfClientScreen()}
        className={styles.noteViewerSectionContainer}
      >
        <div className={styles.noteViewContainer}>
          <img 
            onClick={() => handleNoteViewerCloseRequest()}
            className={styles.closeNoteViewerSvg} 
            alt="close icon" 
            src={closeSvg}>
          </img>
          <div className={styles.noteViewSvgContainer}>
            <img 
              onClick={() => handleEditNoteIconClick(note)}
              className={styles.noteViewEditSvg} 
              alt="edit icon" 
              src={pencilSvg}>
            </img>
            <img 
              onClick={() => handleDeleteIconClick(note)}
              className={styles.noteViewDeleteSvg} 
              alt="delete icon" 
              src={trashSvg}>
            </img>
          </div>
          <div 
            style={getNoteColorScheme(note)}
            className={`${styles.noteViewDetailContainer} ${note.note_background_color.length === 0 ? styles.notesViewContainerBackground : ''}`}
          >
            <p className={styles.noteViewNameText}>
              <strong>Note: </strong>{note.note}
            </p>
            <p className={styles.noteViewStartDateText}>
              <strong>Start Date: </strong>{note.start_date.split(" ")[0]}
            </p>
            <p className={styles.noteViewEndDateText}>
              <strong>End Date: </strong>{note.end_date.split(" ")[0]}
            </p>
            <p className={styles.noteViewCalendarNameText}>
              <strong>Calendar:</strong> {note.calendar_name}
            </p>
            <p className={styles.noteViewCreatedByText}>
              <strong>Created by:</strong> {note.created_by.first_name}, {note.created_by.last_name}
            </p>
            <p className={styles.noteViewCreatedOnText}>
              <strong>Created On: </strong>{note.created_on.split(' ')[0]} <strong>At: </strong>{getCalendarObjectTimeForLocal(note.created_on)}
            </p>
          </div>
        </div>
      </section>
    );
  } else if (typeof notes !== 'undefined' && notes.length > 0) {
    return (
      <section 
        onClick={(e) => handleNoteViewerOffClick(e)}
        id="note-viewer-background"
        style={getCurrenTopOfClientScreen()}
        className={styles.noteViewerSectionContainer}
      >
        <div className={styles.notesViewerContainer}>
          <img 
            onClick={() => handleNoteViewerCloseRequest()}
            className={styles.closeNoteViewerSvg} 
            alt="close icon" 
            src={closeSvg}>
          </img>
          {Array.isArray(notes) && notes.map((note) => {
            return <div 
              key={`note-viewer-for-${note._id}`}
              style={getNoteColorScheme(note)}
              className={`${styles.notesViewContainer} ${note.note_background_color.length === 0 ? styles.notesViewContainerBackground : ''}`}
            >
              <div className={styles.noteViewSvgContainer}>
                <img 
                  onClick={() => handleEditNoteIconClick(note)}
                  className={styles.noteViewEditSvg} 
                  alt="edit icon" 
                  src={pencilSvg}>
                </img>
                <img 
                  onClick={() => handleDeleteIconClick(note)}
                  className={styles.noteViewDeleteSvg} 
                  alt="delete icon" 
                  src={trashSvg}>
                </img>
              </div>
              <div className={styles.notesViewDetailContainer}>
                <p className={styles.noteViewNameText}>
                  <strong>Note: </strong>{note.note}
                </p>
                <p className={styles.noteViewStartDateText}>
                  <strong>Start Date: </strong>{note.start_date.split(" ")[0]}
                </p>
                <p className={styles.noteViewEndDateText}>
                  <strong>End Date: </strong>{note.end_date.split(" ")[0]}
                </p>
                <p className={styles.noteViewCalendarNameText}>
                  <strong>Calendar:</strong> {note.calendar_name}
                </p>
                <p className={styles.noteViewCreatedByText}>
                  <strong>Created by:</strong> {note.created_by.first_name}, {note.created_by.last_name}
                </p>
                <p className={styles.noteViewCreatedOnText}>
                  <strong>Created On: </strong>{note.created_on.split(' ')[0]} <strong>At: </strong>{getCalendarObjectTimeForLocal(note.created_on)}
                </p>
              </div>
            </div>
          })}
        </div>
      </section>
    );
  } else {
    return (
      <></>
    );
  };
};

export default NoteViewer;