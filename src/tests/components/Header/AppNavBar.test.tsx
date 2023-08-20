import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";
import AppNavBar from "../../../components/Header/AppNavBar";

describe('unit test for App Nav Bar', () => {

  test('AppNavBar renders correctly', () => {

    const userMock = {};

    render(
      <MemoryRouter>
        <AppNavBar user={userMock} />
      </MemoryRouter>
    );

    // All elements for navbar are on page
    const mainPage = screen.getByText("Main Page");
    expect(mainPage).toBeInTheDocument();

    const home = screen.getByText("Home");
    expect(home).toBeInTheDocument();

    const calendar = screen.getByText("Calendar");
    expect(calendar).toBeInTheDocument();

    const lessonManager = screen.getByText("Lesson Manager");
    expect(lessonManager).toBeInTheDocument();

    const taskManager = screen.getByText("Task Manager");
    expect(taskManager).toBeInTheDocument();

    const noteTaker = screen.getByText("Note Taker");
    expect(noteTaker).toBeInTheDocument();

    const jenkinsAi = screen.getByText("Jenkins AI");
    expect(jenkinsAi).toBeInTheDocument();

    const teamMessaging = screen.getByText("Team Messaging");
    expect(teamMessaging).toBeInTheDocument();

    const account = screen.getByText("Account");
    expect(account).toBeInTheDocument();
  });
});