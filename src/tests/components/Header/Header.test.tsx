import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from "../../../components/Header/Header";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../../components/Header/NavBar", () => () => 
  <div data-testid="mocked-navbar" >Hello</div>
);

describe('unit test for Header', () => {

  const authMock = false;
  const handleSignOutMock = jest.fn();

  test('Header renders correctly', () => {
    render(
      <MemoryRouter>
        <Header auth={authMock} handleSignOut={handleSignOutMock} />
      </MemoryRouter>
    );

    // logo is displayed
    const logoElement = screen.getByAltText("ClassKeeper Logo");
    expect(logoElement).toBeInTheDocument();

    // // navbar is present
    const navBarElement = screen.getByTestId("mocked-navbar");
    expect(navBarElement).toBeInTheDocument();
  });
});