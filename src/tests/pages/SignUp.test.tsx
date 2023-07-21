import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";
import SignUp from "../../pages/SignUp";

describe('unit test for Sign Up Form', () => {

  test('Form renders the correct inputs and labels', () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    // labels are present
    const returnButton = screen.getByText("Return to Home");
    expect(returnButton).toBeInTheDocument();

    const firstName = screen.getByText("*First Name:");
    expect(firstName).toBeInTheDocument();

    const lastName = screen.getByText("*Last Name:");
    expect(lastName).toBeInTheDocument();

    const location = screen.getByText("*Location:");
    expect(location).toBeInTheDocument();

    const password = screen.getByText("*Password:");
    expect(password).toBeInTheDocument();

    const confirmPassword = screen.getByText("*Confirm Password:");
    expect(confirmPassword).toBeInTheDocument();

    const createAccount = screen.getByText("Create Account");
    expect(createAccount).toBeInTheDocument();

    // inputs are present
    const inputElements = screen.getAllByRole("textbox");
    expect(inputElements).toHaveLength(4);

    // get all password inputs
    const passwordInput = screen.getByLabelText("*Password:");
    expect(passwordInput).toBeInTheDocument();

    const confirmPasswordInput = screen.getByLabelText("*Confirm Password:");
    expect(confirmPasswordInput).toBeInTheDocument();
  });
});