import React, { FC, useEffect, useState } from "react";
import styles from '../../../styles/components/Calendar/calendar.module.css';
import { addNoteFormDataState, addNoteFormProps, calendarNoteWithCalendarInfo, calendarObject } from "../../../types/interfaces";
import toast from "react-hot-toast";

const AddNoteForm:FC<addNoteFormProps> = (props): JSX.Element => {

  const { 
    userId,
    userCalendars,
    addNewCalendarNoteToCalendar,
    updateCalendarNote,
    calendarNoteEditRequest,
  } = props;

  const [formElements, setFormElements] = useState({
    specificDay: false,
    specificWeek: false,
    specificMonth: false,
    specificYear: false,
  });

  const [formData, setFormData] = useState<addNoteFormDataState>({
    note: '',
    selectedDay: '',
    selectedWeek: '',
    selectedMonth: '',
    selectedYear: '',
    selectedCalendar: '',
    selectedCalendarId: '',
  });

  useEffect(() => {
    handleCalendarNoteEditRequest();
  }, [calendarNoteEditRequest]);

  const isValidDate = (dateString: Date): boolean => {
    const parsedDate = new Date(dateString);
    return !isNaN(parsedDate.getTime());
  };

  class CalendarNote {
    createdBy: string;
    note: string;
    noteType: string;
    dates: {
        startDate: string;
        endDate: string;
    };

    constructor(note: string, noteType: string, snapShot: string, createdBy: string) {
      this.createdBy = createdBy;
      this.note = note;
      this.noteType = noteType;
      this.dates = this.calculateStartAndEndDates(noteType, snapShot);
    };

    calculateStartAndEndDates = (noteType: string, snapShot: string) => {
      if (snapShot.length === 0) {
        return {
          'startDate': new Date().toISOString().split('T')[0],
          'endDate': new Date().toISOString().split('T')[0],
        };
      };

      // all of these will convert the dates toISOstring() to be compatible with backend
      if (noteType === 'day') {
        const dates = calculateStartAndEndForDay(snapShot);
        return dates;
      } else if (noteType === 'week') {
        const dates = calculateStartAndEndForWeek(snapShot);
        return dates;
      } else if (noteType === 'month') {
        const dates = calculateStartAndEndForMonth(snapShot);
        return dates;
      } else if (noteType === 'year') {
        const dates = calculateStartAndEndForYear(snapShot);
        return dates;
      } else {
        return {
          'startDate': new Date().toISOString().split('T')[0],
          'endDate': new Date().toISOString().split('T')[0],
        };
      };
    };
  };

  const calculateStartAndEndForDay = (snapShot: string) => {
    const year = snapShot.split('-')[0],
          month = snapShot.split('-')[1],
          day = snapShot.split('-')[2],
          reformattedDate = `${month}-${day}-${year}`, // reformatting the date so that it's MM-DD-YYYY for easier date conversion
          startDate = new Date(reformattedDate),
          endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + 1)
    return {
      'startDate': startDate.toISOString().split('T')[0],
      'endDate': endDate.toISOString().split('T')[0],
    };
  };

  const calculateStartAndEndForWeek = (snapShot: string) => {
    const startYear = snapShot.split(', ')[1],
          startMonth = snapShot.split(' ')[0],
          startDay = snapShot.split(' ')[1],
          reformattedStartDate = `${startMonth}-${startDay}-${startYear}`, // reformatting the date so that it's MM-DD-YYYY for easier date conversion
          startDate = new Date(reformattedStartDate);
    const endYear = snapShot.split(', ')[1],
          endMonth = snapShot.split('-')[1].split(' ')[1],
          endDay = snapShot.split('-')[1].split(' ')[2].split(',')[0],
          reformattedEndDate = `${endMonth}-${endDay}-${endYear}`,
          endDate = new Date(reformattedEndDate);
    return {
      'startDate': startDate.toISOString().split('T')[0],
      'endDate': endDate.toISOString().split('T')[0],
    };
  };

  const calculateStartAndEndForMonth = (snapShot: string) => {
    const startMonth = new Date(snapShot);
    const endMonth = new Date(startMonth);
    endMonth.setMonth(startMonth.getMonth() + 1);
    return {
      'startDate': startMonth.toISOString().split('T')[0],
      'endDate': endMonth.toISOString().split('T')[0],
    };
  };

  const calculateStartAndEndForYear = (snapShot: string) => {
    const startYear = new Date(Number(snapShot), 0, 1);
    const endYear = new Date(startYear);
    endYear.setFullYear(startYear.getFullYear() + 1);
    return {
      'startDate': startYear.toISOString().split('T')[0],
      'endDate': endYear.toISOString().split('T')[0],
    };
  };

  const generateWeekSnapshotsForYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const startOfWeek = (date: Date) => {
      const day = date.getDay();
      return new Date(date.getFullYear(), date.getMonth(), date.getDate() - (day === 0 ? 6 : day - 1));
    };

    const endOfWeek = (date: Date) => {
      const start = startOfWeek(date);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return end;
    };

    const weekSnapshots: string[] = [];

    let currentDatePointer = new Date(currentYear, 0, 1); // Start from January 1st of the current year

    while (currentDatePointer.getFullYear() !== currentYear + 2) { // keep looping until you've calculated every week snapshot for the current year and next
      const startDate = startOfWeek(currentDatePointer);
      const endDate = endOfWeek(currentDatePointer);
      
      const startFormatted = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const endFormatted = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const dateFormatted = `${startFormatted} - ${endFormatted}, ${currentDatePointer.getFullYear()}`;
      
      weekSnapshots.push(dateFormatted);
      
      // Move to the next week
      currentDatePointer.setDate(currentDatePointer.getDate() + 7);
    }

    return weekSnapshots;
  };

  const generateMonthSnapShotsForFiveYears = () => {
    const calendarMonths = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    const fiveYearList: string[] = [];
    let year = new Date().getFullYear();

    for (let i = 0; i < 6; i++) {
      calendarMonths.forEach((month) => {
        const appendYearToMonth = `${month} ${year + i}`
        fiveYearList.push(appendYearToMonth);
      });
    };

    return fiveYearList;
  };

  const generateYearSnapshotForTenYears = () => {
    const years: string[] = [];
    let year = new Date().getFullYear();
    for (let i = 0; i < 11; i++) {
      years.push(`${year + i}`);
    };
    return years;
  };

  const handleFormInputChange = (
    typeOfChange: string,
    e: React.ChangeEvent<HTMLInputElement> 
    | React.ChangeEvent<HTMLTextAreaElement> 
    | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (typeOfChange === 'checkbox') return handleCheckBoxSelection(e);
    if (
      typeOfChange === 'note' 
      || typeOfChange === 'day'
      || typeOfChange === 'week'
      || typeOfChange === 'month'
      || typeOfChange === 'year'
      || typeOfChange === 'calendar'
    ) return handleFormDataEntry(e);
  };

  const handleCheckBoxSelection = (
    e: React.ChangeEvent<HTMLInputElement> 
    | React.ChangeEvent<HTMLTextAreaElement> 
    | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const inputId = e.target.id;
    const checkStatus = (e.target as any).checked;
    setFormElements((prevFormElements) => ({
      specificDay: inputId === 'day-checkbox' ? checkStatus : false,
      specificWeek: inputId === 'week-checkbox' ? checkStatus : false,
      specificMonth: inputId === 'month-checkbox' ? checkStatus : false,
      specificYear: inputId === 'year-checkbox' ? checkStatus : false,
    }));
  };

  const handleFormDataEntry = (
    e: React.ChangeEvent<HTMLInputElement> 
    | React.ChangeEvent<HTMLTextAreaElement> 
    | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const inputId = e.target.id;
    const value = e.target.value;

    // calendarId only needed for when user selects a calendar
    if ((e.target as any).options) {
      const calendarId: string = (e.target as any).options[(e.target as any).selectedIndex].getAttribute('data-calendarid');
      if (calendarId !== null) {
        return setFormData((prevFormData) => ({
          ...prevFormData,
          selectedCalendar: value,
          selectedCalendarId: calendarId,
        }));
      };
    };

    setFormData((prevFormData) => ({
      note: inputId === 'note-input' ? value : prevFormData.note,
      selectedDay: inputId === 'day-input' ? value : '',
      selectedWeek: inputId === 'week-input' ? value : '',
      selectedMonth: inputId === 'month-input' ? value : '',
      selectedYear: inputId === 'year-input' ? value : '',
      selectedCalendar: prevFormData.selectedCalendar,
      selectedCalendarId: prevFormData.selectedCalendarId,
    }));
  };

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      e.preventDefault();
    };
  };

  const handleAddNoteSubmitClick = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    toast.loading('Adding note to calendar...', {id: 'addingNote'})
    const errors = checkForFormErrors();
    if (typeof errors === 'string') return toast.error(`${errors}`, {id: 'addingNote'});
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return toast.error('You need to be signed in or not in incognito to perform this action', {id: 'addingNote'});
    } else {
      const calendarCheck = identifyCalendarIdAndIfCalendarIsPersonal();
      const noteType = setNoteType();
      if (typeof noteType === 'undefined') return toast.error('You cannot create a note without selecting a note type', {id: 'addingNote'});
      const snapShot = getSelectedNoteTypeSnapshot();
      const calendarNote = new CalendarNote(formData['note'], noteType, snapShot, userId);
      const calendarNoteErrors = checkCalendarNoteForErrors(calendarNote);
      if (calendarNoteErrors === true) return toast.error('The dates in your note are not valid', {id: 'addingNote'});
      const apiUrl = `http://127.0.0.1:8000/calendar/${calendarCheck.calendarId}/addNote/${calendarCheck.isPersonal}`;
      const request = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(calendarNote, null, 2),
      });
      const jsonResponse = await request.json();
      if (request.ok && request.status === 200 && jsonResponse.detail === "Successfully updated calendar with note") {
        if (jsonResponse.personal_calendar) {
          toast.success(`Note added successfully to ${jsonResponse.personal_calendar.name}`, {id: 'addingNote'});
          addNewCalendarNoteToCalendar(
            formData.selectedCalendarId,
            jsonResponse.personal_calendar,
            'personal_calendar',
          );
        };
        if (jsonResponse.updated_calendar) {
          toast.success(`Note added successfully to ${jsonResponse.updated_calendar.name}`, {id: 'addingNote'});
          addNewCalendarNoteToCalendar(
            formData.selectedCalendarId,
            jsonResponse.updated_calendar,
            'calendars',
          );
        };
      } else {
        toast.error('Failed to add note', {id: 'addingNote'});
      };
    };
  };

  const handleUpdateNoteSubmitClick = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    toast.loading('Updating note...', {id: 'updatingNote'});
    const errors = checkForFormErrors();
    if (typeof errors === 'string') return toast.error(`${errors}`, {id: 'updatingNote'});
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return toast.error('You need to be signed in or not in incognito to perform this action', {id: 'updatingNote'});
    } else {
      const calendarCheck = identifyCalendarIdAndIfCalendarIsPersonal();
      const noteType = setNoteType();
      if (typeof noteType === 'undefined') return toast.error('You cannot update a note without selecting a note type', {id: 'updatingNote'});
      const snapShot = getSelectedNoteTypeSnapshot();
      const calendarNote = new CalendarNote(formData['note'], noteType, snapShot, userId);
      const calendarNoteErrors = checkCalendarNoteForErrors(calendarNote);
      if (calendarNoteErrors === true) return toast.error('The dates in your note are not valid', {id: 'updatingNote'});
      const note = (calendarNoteEditRequest.note as calendarNoteWithCalendarInfo);

      const apiUrl = `http://127.0.0.1:8000/calendar/${calendarCheck.calendarId}/updateNote/${note._id}/${calendarCheck.isPersonal}`;
      const request = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(calendarNote, null, 2),
      });
      const jsonResponse = await request.json();
      return handleUpdateNoteApiResponse(request, jsonResponse);
    };
  };

  const handleUpdateNoteApiResponse = (request: Response, jsonResponse: any) => {
    if (request.ok && request.status === 200 && jsonResponse.detail === "Successfully updated the note") {
      if (jsonResponse.updated_note) {
        toast.success(`Note updated!`, {id: 'updatingNote'});
        if ((calendarNoteEditRequest.note as calendarNoteWithCalendarInfo).calendar_id !== jsonResponse.updated_note.calendar_id) {
          // calendarNote was swapped to a different calendar
          updateCalendarNote(
            formData.selectedCalendarId.startsWith('personal_calendar:') 
              ? formData.selectedCalendarId.split(': ')[1] 
              : formData.selectedCalendarId,
            jsonResponse.updated_note,
            true,
          );
        } else {
          return updateCalendarNote(
            formData.selectedCalendarId.startsWith('personal_calendar:') 
              ? formData.selectedCalendarId.split(': ')[1] 
              : formData.selectedCalendarId,
            jsonResponse.updated_note,
            false
          );
        };
      };
    } else {
      toast.error('Failed to update note', {id: 'updatingNote'});
    };
  };

  const checkForFormErrors = () => {
    const formDataCheck = checkIfFormDataIsGood();
    if (typeof formDataCheck === 'string') return formDataCheck;

    const authorizationCheck = checkIfUserIsAuthorizedToAddNotes();
    if (typeof authorizationCheck === 'string') return authorizationCheck;

    return true;
  };

  const checkIfFormDataIsGood = () => {
    if (formData.note.length === 0) return 'You cannot create a note without a note written out';
    if (formData.selectedCalendar.length === 0) {
      return 'No calendar selected, aborting';
    };
    if (
      formData.selectedDay.length === 0
      && formData.selectedWeek.length === 0
      && formData.selectedMonth.length === 0
      && formData.selectedYear.length === 0
    ) {
      return 'You cannot add a note without specifying it for a specific day, week, month, or year';
    };
  };

  const checkIfUserIsAuthorizedToAddNotes = () => {
    if (formData.selectedCalendarId.length === 0) return true;

    let calendarInstance: {} | calendarObject = {};
    const allCalendars = [userCalendars.personalCalendar, ...userCalendars.pendingCalendars, ...userCalendars.teamCalendars];

    if (formData.selectedCalendarId.startsWith('personal_calendar:')) {
      calendarInstance = userCalendars.personalCalendar;
    } else {
      for (const calendar of allCalendars) {
        if (calendar._id === formData.selectedCalendarId) {
          calendarInstance = calendar;
          break;
        };
      };
    };

    if (Object.keys(calendarInstance).length === 0) return 'Selected calendar does not match what user selected';

    const authStatus = (calendarInstance as calendarObject).authorized_users.some(user => user._id === userId);
    if (!authStatus) return 'You do not have authorization to add notes to this calendar';

    return true;
  };

  const setNoteType = () => {
    if (formElements.specificDay === true) return 'day';
    if (formElements.specificWeek === true) return 'week';
    if (formElements.specificMonth === true) return 'month';
    if (formElements.specificYear === true) return 'year';
  };

  const getSelectedNoteTypeSnapshot = () => {
    if (formData.selectedDay.length !== 0) return formData.selectedDay;
    if (formData.selectedWeek.length !== 0) return formData.selectedWeek;
    if (formData.selectedMonth.length !== 0) return formData.selectedMonth;
    if (formData.selectedYear.length !== 0) return formData.selectedYear;
    return '';
  };

  const checkCalendarNoteForErrors = (calendarNote: CalendarNote) => {
    const startDateValid = isValidDate(new Date(calendarNote.dates.startDate));
    const endDateValid = isValidDate(new Date(calendarNote.dates.endDate));
    
    if (startDateValid === true && endDateValid === true) {
      return false; // no errors
    } else {
      return true; // has errors
    };
  };

  const identifyCalendarIdAndIfCalendarIsPersonal = () => {
    const calendarId = formData.selectedCalendarId.startsWith('personal_calendar:') 
      ? formData.selectedCalendarId.split(': ')[1]
      : formData.selectedCalendarId;

    const isPersonal = formData.selectedCalendarId.startsWith('personal_calendar:') ? true : false;

    return {
      'calendarId': calendarId,
      'isPersonal': isPersonal,
    };
  };

  const handleCalendarNoteEditRequest = () => {
    if (Object.keys(calendarNoteEditRequest).length > 0) {
      const calendarNote = calendarNoteEditRequest.note as calendarNoteWithCalendarInfo;
      const startDateOfNote = new Date(calendarNote.start_date);

      let specificDate = '';
      let selectedDate = '';
      let dateData = '';

      if (calendarNote.type === 'day') {
        specificDate = 'specificDay';
        selectedDate = 'selectedDay';
        dateData = calendarNote.start_date.split(' ')[0]; // grab date without time
      } else if (calendarNote.type === 'week') {
        specificDate = 'specificWeek';
        selectedDate = 'selectedWeek';
        dateData = getWeekSnapshot(startDateOfNote);
      } else if (calendarNote.type === 'month') {
        specificDate = 'specificMonth';
        selectedDate = 'selectedMonth';
        dateData = `${getCalendarMonth(startDateOfNote.getMonth() + 1)} ${startDateOfNote.getFullYear()}`;
      } else if (calendarNote.type === 'year') {
        specificDate = 'specificYear';
        selectedDate = 'selectedYear';
        dateData = `${startDateOfNote.getFullYear()}`;
      } else {
        return;
      };

      setFormElements((prevFormElements) => ({
        ...prevFormElements,
        [specificDate]: true,
      }));
      setFormData((prevFormData) => ({
        ...prevFormData,
        [selectedDate]: dateData,
        note: calendarNote.note,
        selectedCalendar: calendarNote.calendar_name,
        selectedCalendarId: calendarNoteEditRequest.calendarId,
      }));
    } else {
      return;
    };
  };

  const getCalendarMonth = (index: number) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[index];
  };

  function getWeekSnapshot(dateString: Date) { // Monday - Sunday snapshot of week
    const date = new Date(dateString);
    const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
  
    const startOfWeek = new Date(date);
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust for Monday
    startOfWeek.setDate(diff);
  
    const endOfWeek = new Date(date);
    const endDiff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? 0 : 7); // Adjust for Sunday
    endOfWeek.setDate(endDiff);
  
    const startDateString = startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endDateString = endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
    const weekSnapshot = `${startDateString} - ${endDateString}`;
  
    return weekSnapshot;
  }

  return (
    <div className={styles.addEventFormContainer}>
      <h2 className={styles.addEventHeader}>
        Note
      </h2>

      <form 
        onKeyDown={(e) => handleFormKeyDown(e)}
        className={styles.addEventForm}>
        <div className={styles.formGroup}>
          <textarea
            id='note-input'
            name="note"
            value={formData.note}
            minLength={1}
            maxLength={255}
            onChange={(e) => handleFormInputChange('note', e)}
            placeholder="Write a note for your calendar..."
            required
            className={styles.addEventFormInput}
          />
        </div>
  
        <div className={styles.formGroup}>
          <label
            htmlFor='date-checkbox'
            className={styles.addEventFormLabel}
          >
            Note for a specific date?
          </label>
          <input
            id='day-checkbox'
            type="checkbox"
            name="day-checkbox"
            checked={formElements.specificDay}
            onChange={(e) => handleFormInputChange('checkbox', e)}
            className={styles.addEventFormCheckbox}
          />
          {formElements.specificDay === true && 
            <div className={styles.formGroup}>
              <input
                type="date"
                id='day-input'
                name="day"
                value={formData.selectedDay}
                onChange={(e) => handleFormInputChange('day', e)}
                className={styles.addEventFormInput}
              />
            </div>
          }
        </div>

        <div className={styles.formGroup}>
          <label
            htmlFor='week-input'
            className={styles.addEventFormLabel}
          >
            Note for a specific week?
          </label>
          <input
            id='week-checkbox'
            type="checkbox"
            name="week-checkbox"
            checked={formElements.specificWeek}
            onChange={(e) => handleFormInputChange('checkbox', e)}
            className={styles.addEventFormCheckbox}
          />
          {formElements.specificWeek === true && 
            <div className={styles.formGroup}>
              <select
                id='week-input'
                name="week"
                value={formData.selectedWeek}
                onChange={(e) => handleFormInputChange('week', e)}
                className={styles.addEventFormSelect}
              >
                <option value="">Select Week</option>
                {generateWeekSnapshotsForYear().map((weekSnapShot) => (
                  <option key={weekSnapShot} value={weekSnapShot}>
                    {weekSnapShot}
                  </option>
                ))}
              </select>
            </div>
          }
        </div>

        <div className={styles.formGroup}>
          <label
            htmlFor='month-input'
            className={styles.addEventFormLabel}
          >
            Note for a specific month?
          </label>
          <input
            id='month-checkbox'
            type="checkbox"
            name="month-checkbox"
            checked={formElements.specificMonth}
            onChange={(e) => handleFormInputChange('checkbox', e)}
            className={styles.addEventFormCheckbox}
          />
          {formElements.specificMonth === true && 
            <div className={styles.formGroup}>
              <select
                id='month-input'
                name="month"
                value={formData.selectedMonth}
                onChange={(e) => handleFormInputChange('month', e)}
                className={styles.addEventFormSelect}
              >
                <option value="">Select Month</option>
                {generateMonthSnapShotsForFiveYears().map((monthSnapshot) => (
                  <option key={monthSnapshot} value={monthSnapshot}>
                    {monthSnapshot}
                  </option>
                ))}
              </select>
            </div>
          }
        </div>

        <div className={styles.formGroup}>
          <label
            htmlFor='month-input'
            className={styles.addEventFormLabel}
          >
            Note for a specific year?
          </label>
          <input
            id='year-checkbox'
            type="checkbox"
            name="year-checkbox"
            checked={formElements.specificYear}
            onChange={(e) => handleFormInputChange('checkbox', e)}
            className={styles.addEventFormCheckbox}
          />
          {formElements.specificYear === true && 
            <div className={styles.formGroup}>
              <select
                id='year-input'
                name="year"
                value={formData.selectedYear}
                onChange={(e) => handleFormInputChange('year', e)}
                className={styles.addEventFormSelect}
              >
                <option value="">Select Year</option>
                {generateYearSnapshotForTenYears().map((yearSnapshot) => (
                  <option key={yearSnapshot} value={yearSnapshot}>
                    {yearSnapshot}
                  </option>
                ))}
              </select>
            </div>
          }
        </div>

        {/* SETUP SO USER HAS TO SELECT WHICH CALENDAR TO ADD NOTES TOO */}
        {userCalendars && (
          <div className={styles.formGroup}>
            <label
              htmlFor='calendar-selection-input'
              className={styles.addEventFormLabel}
            >
              *Select Calendar:
            </label>
            <select
              id='calendar-selection-input'
              name="selectedCalendar"
              value={formData.selectedCalendar}
              onChange={(e) => handleFormInputChange('calendar', e)}
              className={styles.addEventFormSelect}
              required
            >
              <option value="">Select Calendar</option>
              {[userCalendars.personalCalendar].map((personalCalendar: calendarObject) => (
                <option 
                  key={personalCalendar._id} 
                  value={personalCalendar.name}
                  data-calendarid={`personal_calendar: ${personalCalendar._id}`} // stored like this for FastAPI backend to parse
                  className={styles.addEventFormOption}>
                    {personalCalendar.name}
                </option>
              ))}
              {userCalendars.teamCalendars.map((teamCalendar: calendarObject) => (
                <option 
                  key={teamCalendar._id} 
                  value={teamCalendar.name} 
                  data-calendarid={teamCalendar._id}
                  className={styles.addEventFormOption}>
                    {teamCalendar.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button 
          type="submit" 
          onClick={(e) => calendarNoteEditRequest.status === true ? handleUpdateNoteSubmitClick(e) : handleAddNoteSubmitClick(e)}
          className={styles.addEventFormButton}>
            {calendarNoteEditRequest.status === true ? 'Add Edited Note' : 'Add Note'}
        </button>
      </form>
    </div>
  );
};

export default AddNoteForm;