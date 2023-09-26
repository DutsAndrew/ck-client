import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditCalendar from "../../../components/Calendar/EditCalendar";

describe('unit test for EditCalendar', () => {

  const calendarMock = {
    authorized_users: [
      "Rachel",
      "Maria",
    ],
    calendar_years_and_dates: {
      2023: {
        April: { days: 30, month_starts_on: 'Saturday' },
        August: { days: 31, month_starts_on: 'Tuesday' },
        December: { days: 31, month_starts_on: 'Friday' },
        February: { days: 28, month_starts_on: 'Wednesday' },
        January: { days: 31, month_starts_on: 'Sunday' },
        July: { days: 31, month_starts_on: 'Saturday' },
        June: { days: 30, month_starts_on: 'Thursday' },
        March: { days: 31, month_starts_on: 'Wednesday' },
        May: { days: 31, month_starts_on: 'Monday' },
        November: { days: 30, month_starts_on: 'Wednesday' },
        October: { days: 31, month_starts_on: 'Sunday' },
        September: { days: 30, month_starts_on: 'Friday' },
      },
    },
    calendar_holidays: [
      { date: '2023-01-01', name: "New Year's Day", type: 'holiday' },
      { date: '2023-01-02', name: "New Year's Day (Observed)", type: 'holiday' },
      { date: '2023-01-16', name: 'Martin Luther King Jr. Day', type: 'holiday' },
      { date: '2023-02-20', name: "Washington's Birthday", type: 'holiday' },
      { date: '2023-05-29', name: 'Memorial Day', type: 'holiday' },
      { date: '2023-06-19', name: 'Juneteenth National Independence Day', type: 'holiday' },
      { date: '2023-07-04', name: 'Independence Day', type: 'holiday' },
      { date: '2023-09-04', name: 'Labor Day', type: 'holiday' },
      { date: '2023-10-09', name: 'Columbus Day', type: 'holiday' },
      { date: '2023-11-10', name: 'Veterans Day (Observed)', type: 'holiday' },
      { date: '2023-11-11', name: 'Veterans Day', type: 'holiday' },
      { date: '2023-11-23', name: 'Thanksgiving', type: 'holiday' },
      { date: '2023-12-25', name: 'Christmas Day', type: 'holiday' },
    ],
    calendar_type: 'personal',
    created_by: 'user',
    created_on: '2023-07-27 13:27:25.303335',
    events: [
      {
        calendar: '123',
        created_by: 'me',
        event_date_and_time: 'Sat Sep 24 2023 16:32:58 GMT-0700 (Pacific Daylight Time)',
        event_description: 'pretty cool event',
        event_name: 'birthday',
        patterns: null,
        repeats: false,
      },
    ],
    name: 'User\'s Personal Calendar',
    pending_users: [
      'George',
      'Orwell'
    ],
    view_only_users: [
      "Alexandra",
      "Peterson",
    ],
  };

  beforeEach(() => {
    render(
      <EditCalendar 
        selectedCalendar={calendarMock}
        handleDeactivateCalendarEditor={handleDeactivateCalendarEditorMock}
      />
    );
  });

  afterEach(cleanup);

  const handleDeactivateCalendarEditorMock = jest.fn();


  test('Edit Calendar renders static content correctly', () => {
    const editCalendarCloseButton = screen.getByRole('button', {name: /Close Editor/i});
    expect(editCalendarCloseButton).toBeInTheDocument();

    const headerText = screen.getByText("Calendar Editor");
    expect(headerText).toBeInTheDocument();

    const usersHeader = screen.getByText(/Users/i);
    expect(usersHeader).toBeInTheDocument();

    const authorizedLists = screen.getAllByRole('list');
    expect(authorizedLists).toHaveLength(4); // 3 user lists, 1 event list

    const addUserButton = screen.getByRole('button', {name: /Add User/i});
    expect(addUserButton).toBeInTheDocument();

    const deleteCalendarButton = screen.getByRole('button', {name: /Delete Calendar/i});
    expect(deleteCalendarButton).toBeInTheDocument();
  });

  test('user lists render users to page', () => {
    const authorizedUser1 = screen.getByText(/Rachel/i);
    const authorizedUser2 = screen.getByText(/Maria/i);
    const authorizedUserEditIcon = screen.getByAltText(/authorized user edit icon/i);
    const authorizedUserDeleteIcon = screen.getByAltText(/authorized user delete icon/i);

    expect(authorizedUser1).toBeInTheDocument();
    expect(authorizedUser2).toBeInTheDocument();
    expect(authorizedUserEditIcon).toBeInTheDocument();
    expect(authorizedUserDeleteIcon).toBeInTheDocument();

    const pendingUser1 = screen.getByText(/George/i);
    const pendingUser2 = screen.getByText(/Orwell/i);
    const pendingUserEditIcon = screen.getByAltText(/pending user edit icon/i);
    const pendingUserDeleteIcon = screen.getByAltText(/pending user delete icon/i);

    expect(pendingUser1).toBeInTheDocument();
    expect(pendingUser2).toBeInTheDocument();
    expect(pendingUserEditIcon).toBeInTheDocument();
    expect(pendingUserDeleteIcon).toBeInTheDocument();

    const viewOnlyUser1 = screen.getByText(/Alexandra/i);
    const viewOnlyUser2 = screen.getByText(/Peterson/i);
    const viewOnlyUserEditIcon = screen.getByAltText(/view-only user edit icon/i);
    const viewOnlyUserDeleteIcon = screen.getByAltText(/view-only user delete icon/i);

    expect(viewOnlyUser1).toBeInTheDocument();
    expect(viewOnlyUser2).toBeInTheDocument();
    expect(viewOnlyUserEditIcon).toBeInTheDocument();
    expect(viewOnlyUserDeleteIcon).toBeInTheDocument();
  });

  test('events render to page correctly', () => {
    const eventTitle = screen.getByText(/birthday/i);
    const eventEditIcon = screen.getByAltText(/event edit icon/i);
    const eventDeleteIcon = screen.getByAltText(/event delete icon/i);
    
    expect(eventTitle).toBeInTheDocument();
    expect(eventEditIcon).toBeInTheDocument();
    expect(eventDeleteIcon).toBeInTheDocument();
  });

});