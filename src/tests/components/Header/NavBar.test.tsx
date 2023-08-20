import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";
import NavBar from "../../../components/Header/NavBar";

jest.mock("../../../components/Header/AppNavBar", () => () => 
  <div data-testid="mocked-app-nav-bar" >Hello</div>
);

jest.mock("../../../components/Header/WelcomeNavBar", () => () => 
  <div data-testid="mocked-welcome-nav-bar" >Hello</div>
);


describe('unit test for NavBar', () => {

  const falseAuthMock = false;
  const trueAuthMock = true;
  const userMock = {};

  test('Header renders correctly with false auth', () => {
    render(
      <MemoryRouter>
        <NavBar auth={falseAuthMock} user={userMock} />
      </MemoryRouter>
    );

    // welcome navbar is present
    const welcomeNavBar = screen.getByTestId("mocked-welcome-nav-bar");
    expect(welcomeNavBar).toBeInTheDocument();
  });

  test('Header renders correctly with true auth', () => {
    render(
      <MemoryRouter>
        <NavBar auth={trueAuthMock} user={userMock} />
      </MemoryRouter>
    );

    // app navbar is present
    const appNavBar = screen.getByTestId("mocked-app-nav-bar");
    expect(appNavBar).toBeInTheDocument();

  });
});