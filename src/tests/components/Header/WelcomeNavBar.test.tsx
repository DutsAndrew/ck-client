import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";
import WelcomeNavBar from "../../../components/Header/WelcomeNavBar";

describe('unit test for WelcomeNavBar', () => {


  test('AppNavBar renders correctly', () => {
    render(
      <MemoryRouter>
        <WelcomeNavBar />
      </MemoryRouter>
    );

    // All elements for navbar are on page
    const about = screen.getByText("About");
    expect(about).toBeInTheDocument();

    const contact = screen.getByText("Contact");
    expect(contact).toBeInTheDocument();

    const pricing = screen.getByText("Pricing");
    expect(pricing).toBeInTheDocument();

    const signUp = screen.getByText("Sign Up");
    expect(signUp).toBeInTheDocument();

    const login = screen.getByText("Login");
    expect(login).toBeInTheDocument();
  });
});