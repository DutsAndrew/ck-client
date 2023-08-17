import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/signup.module.css';
import { signUpData, signUpApiResponseObject } from '../types/interfaces';

export default function SignUp() {

  const mailFormat: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g,
        passwordFormat: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;


  const handleFormChange = (e: any) => {
    const entryThatChanged = e.target as HTMLInputElement,
          errorText = e.target.nextSibling;

    if (entryThatChanged && errorText) {
      if (!entryThatChanged.validity.valid) {
        showError(entryThatChanged, errorText);
      } else if (entryThatChanged.id === 'email-input' && !validateEmail(entryThatChanged.value)) {
        showError(entryThatChanged, errorText);
      } else if (entryThatChanged.id === 'password-input' && !validatePassword(entryThatChanged.value)) {
        showError(entryThatChanged, errorText);
      } else if (entryThatChanged.id === 'confirmPassword-input' && !validateConfirmedPassword(entryThatChanged.value)) {
        showError(entryThatChanged, errorText);
      } else {
        errorText.textContent = '';
        errorText.className = 'error';
      };
    };
  };

  const validateEmail = (email: string): boolean => {
    return mailFormat.test(email)
  };

  const validatePassword = (password: string): boolean => {
    return /[A-Z]/.test(password)
    && /[a-z]/.test(password)
    && /[0-9]/.test(password)
    && /[#?!@$%^&*-]/.test(password)
    && password.length >= 5;
  };

  const validateConfirmedPassword = (confirmPassword: string): boolean => {
    const passwordInput = document.querySelector('#password-input');
    if (passwordInput) {
      return confirmPassword === (passwordInput as HTMLInputElement).value 
    } else {
      return false;
    };
  };

  const showError = (entry: any, error: any): void => {

    if (entry.id === 'email-input') {
      if (entry.validity.valueMissing) {
        error.textContent = "You need to enter an email address";
        error.classList.add("error", "error-active");
      } else if (!entry.value.match(mailFormat)) {
        error.textContent = `Your email address doesn't seem to follow the traditional email patterns, please try again`;
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooShort) {
        error.textContent = `Your email should be at least ${entry.minLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooLong) {
        error.textContent = `Your email should be no more than ${entry.maxLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      }
      return;
    };

    if (entry.id === 'firstName-input') {
      if (entry.validity.valueMissing) {
        error.textContent = "You must have a first name entered to create an account";
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooShort) {
        error.textContent = `Your first name should be at least ${entry.minLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooLong) {
        error.textContent = `Your first name should be no more than ${entry.maxLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      };
      return;
    };

    if (entry.id === 'lastName-input') {
      if (entry.validity.valueMissing) {
        error.textContent = "You must have a last name entered to create an account";
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooShort) {
        error.textContent = `Your last name should be at least ${entry.minLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooLong) {
        error.textContent = `Your last name should be no more than ${entry.maxLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      };
      return;
    };

    if (entry.id === 'password-input') {
      if (entry.validity.valueMissing) {
        error.textContent = "You need to confirm your password";
        error.classList.add("error", "error-active");
      } else if (!entry.value.match(passwordFormat)) {
        error.textContent = `Your password must have at least: 1) One uppercase letter, 2) One lowercase letter, 3) One number, 4) One symbol, 5) And be at least 8 characters in length`;
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooShort) {
        error.textContent = `Your password should be at least ${entry.minLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooLong) {
        error.textContent = `Your password should be no more than ${entry.maxLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      }
      return;
    };

    if (entry.id === 'confirmPassword-input') {
      const passwordInput = document.querySelector('#password-input');
      if (entry.validity.valueMissing) {
        error.textContent = "You need to confirm your password";
        error.classList.add("error", "error-active");
      } else if (entry.value !== (passwordInput as HTMLInputElement).value) {
        error.textContent = `Your passwords do not match`;
        error.classList.add("error", "error-active");
      }
      return;
    };

    if (entry.id === 'jobTitle-input') {
      if (entry.validity.tooShort) {
        error.textContent = `You do need to enter a job title, but if you do it should be at least ${entry.minLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooLong) {
        error.textContent = `You do need to enter a job title, but if you do it cannot be more than ${entry.maxLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      };
      return;
    };

    if (entry.id === 'company-input') {
      if (entry.validity.tooShort) {
        error.textContent = `You do need to enter a company, but if you do it should be at least ${entry.minLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooLong) {
        error.textContent = `You do need to enter a company, but if you do it cannot be more than ${entry.maxLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      };
      return;
    };
  };

  const buildUserObject = () => {
    const email = document.querySelector('#email-input'),
          firstName = document.querySelector('#firstName-input'),
          lastName = document.querySelector('#lastName-input'),
          password = document.querySelector('#password-input'),
          confirmPassword = document.querySelector('#confirmPassword-input'),
          // optional fields
          jobTitle = document.querySelector('#jobTitle-input'),
          company = document.querySelector('#company-input');

    if (email && firstName && lastName && password && confirmPassword && jobTitle && company) {
      const userData = new User(
        (email as HTMLInputElement).value,
        (firstName as HTMLInputElement).value,
        (lastName as HTMLInputElement).value,
        (password as HTMLInputElement).value,
        (jobTitle as HTMLInputElement).value,
        (company as HTMLInputElement).value
      );
      return userData;
    };
    return undefined;
  };

  class User {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    job_title: string;
    company: string;

    constructor(email: string,
      first_name: string,
      last_name: string,
      password:string,
      job_title: string,
      company: string
    ) {
      this.email = email;
      this.first_name = first_name;
      this.last_name = last_name;
      this.password = password;
      this.job_title = job_title;
      this.company = company;
    };
  };

  const validateSignUpData = (userObject: signUpData | undefined) => {
    if (typeof userObject === 'undefined') return;

    const email = (document.querySelector('#email-input') as HTMLInputElement),
          firstName = (document.querySelector('#firstName-input') as HTMLInputElement),
          lastName = (document.querySelector('#lastName-input') as HTMLInputElement),
          password = (document.querySelector('#password-input') as HTMLInputElement),
          confirmPassword = (document.querySelector('#confirmPassword-input') as HTMLInputElement),
          activeErrors = document.querySelectorAll('.error-active').length;

    if (email.validity.valid
      && firstName.validity.valid
      && lastName.validity.valid
      && password.validity.valid
      && confirmPassword.validity.valid
      && activeErrors === 0
    ) {
      return true;
    } else {
      return false;
    };
  };

  const handleFormSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // pull out user data
    const userData = buildUserObject();
    // validate data
    const validateData = validateSignUpData(userData);
    // if userObject has data and the data passes send it to API
    if (validateData === true) {
      sendApiRequestToSignUp(userData);
    } else {
      alert('Fix your errors before attempting to submit your account');
      return;
    };
  };

  const sendApiRequestToSignUp = async (userObject: signUpData | undefined) => {
    if (typeof userObject === 'undefined') return;
    const apiUrl = 'http://127.0.0.1:8000/auth/signup';
    const request = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(userObject, null, 2),
    });

    const response: signUpApiResponseObject = await request.json();
    // handle failed request
    if (!request.ok) {
      handleBadApiRequest(request, response);
      return;
    };
    // handle good request
    handleGoodApiRequest(response);
  };

  const handleBadApiRequest = (request: Response, response: signUpApiResponseObject) => {
    if (response.detail) {
      if (request.status === 400) {
        alert(`Email already registered, please try again or login, ${response.detail}`);
      } else if (request.status === 500) {
        alert(`Server-side error, ${response.detail}`);
      } else {
        alert(`Error: ${response.detail}`);
      };
    };
  };

  const handleGoodApiRequest = (response: signUpApiResponseObject) => {
    if (typeof response.user !== 'undefined') {
      alert(`Account created for: ${response.user.first_name}, ${response.user.last_name}`);
      return;
    };
  };

  return (
    <section className={styles.signUpContainer}>
       <Link to='/'>
        <button className='returnButton'>
          Return to Home
        </button>
      </Link>
      <h1 className={styles.headerTitle}>Sign Up</h1>
      <form 
        className={styles.createAccountForm}
        onSubmit={(e) => handleFormSubmission(e)}
      >
        <div className={styles.formGroup}>
          <label
            className={styles.signUpLabel} 
            htmlFor='email'>
            *Email:
          </label>
          <input
            className={styles.signUpInput} 
            placeholder='JohnWick94@gmail.com'
            onChange={handleFormChange}
            name="email" 
            id='email-input' 
            type="email"
            minLength={5}
            maxLength={253}
            required>
          </input>
          <p id="email-input-error"
            className ="error-msg" >
          </p>
        </div>

        <div className={styles.formGroup}>
          <label
            className={styles.signUpLabel} 
            htmlFor='firstName'>
            *First Name:
          </label>
          <input
            className={styles.signUpInput} 
            placeholder='John'
            onChange={handleFormChange}
            name="firstName" 
            id='firstName-input' 
            type="text"
            minLength={1}
            maxLength={100}
            required>
          </input>
          <p id="firstName-input-error"
            className ="error-msg" >
          </p>
        </div>

        <div className={styles.formGroup}>
          <label
            className={styles.signUpLabel} 
            htmlFor='lastName'>
            *Last Name:
          </label>
          <input
            className={styles.signUpInput}
            placeholder='Wick'
            onChange={handleFormChange}
            name="lastName" 
            id='lastName-input' 
            type="text"
            minLength={1}
            maxLength={100}
            required>
          </input>
          <p id="lastName-input-error"
            className ="error-msg" >
          </p>
        </div>

        <div className={styles.formGroup}>
          <label
            className={styles.signUpLabel} 
            htmlFor='jobTitle'>
            Job Title (Optional):
          </label>
          <input
            className={styles.signUpInput} 
            placeholder='Secret Agent Man'
            onChange={handleFormChange}
            name="jobTitle" 
            id='jobTitle-input' 
            type="text"
            minLength={1}
            maxLength={100}>
          </input>
          <p id="jobTitle-input-error"
            className ="error-msg" >
          </p>
        </div>

        <div className={styles.formGroup}>
          <label
            className={styles.signUpLabel} 
            htmlFor='company'>
            Company (Optional):
          </label>
          <input
            className={styles.signUpInput} 
            placeholder='Continental Hotel'
            onChange={handleFormChange}
            name="company" 
            id='company-input' 
            type="text"
            minLength={1}
            maxLength={100}>
          </input>
          <p id="company-input-error"
            className ="error-msg" >
          </p>
        </div>

        <div className={styles.formGroup}>
          <label
            className={styles.signUpLabel} 
            htmlFor='password'>
            *Password:
          </label>
          <input
            className={styles.signUpInput} 
            placeholder='*******'
            onChange={handleFormChange}
            name="password" 
            id='password-input' 
            type="password"
            minLength={5}
            maxLength={127}
            required>
          </input>
          <p id="password-input-error"
            className ="error-msg" >
          </p>
        </div>

        <div className={styles.formGroup}>
          <label
            className={styles.signUpLabel} 
            htmlFor='confirmPassword'>
            *Confirm Password:
          </label>
          <input
            className={styles.signUpInput} 
            placeholder='*******'
            onChange={handleFormChange}
            name="confirmPassword" 
            id='confirmPassword-input' 
            type="password"
            minLength={5}
            maxLength={127}
            required>
          </input>
          <p id="confirmPassword-input-error"
            className ="error-msg" >
          </p>
        </div>

        <button 
          className={styles.signUpSubmitButton}
          type='submit'>
          Create Account
        </button>
      </form>
    </section>
  );
};