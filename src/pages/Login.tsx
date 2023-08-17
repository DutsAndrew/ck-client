import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/signup.module.css';
import { loginData, loginApiResponseObject } from '../types/interfaces';

export default function Login() {

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
  };

  const buildUserObject = () => {
    const email = document.querySelector('#email-input'),
          password = document.querySelector('#password-input');

    if (email && password) {
      const userData = new User(
        (email as HTMLInputElement).value,
        (password as HTMLInputElement).value,
      );
      return userData;
    };
    return undefined;
  };

  class User {
    email: string;
    password: string;

    constructor(email: string,
      password:string,
    ) {
      this.email = email;
      this.password = password;
    };
  };

  const validateSignUpData = (userObject: loginData | undefined) => {
    if (typeof userObject === 'undefined') return;

    const email = (document.querySelector('#email-input') as HTMLInputElement),
          password = (document.querySelector('#password-input') as HTMLInputElement),
          activeErrors = document.querySelectorAll('.error-active').length;

    if (email.validity.valid
      && password.validity.valid
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
      sendApiRequestToLogin(userData);
    } else {
      alert('Fix your errors before attempting to submit your account');
      return;
    };
  };

  const sendApiRequestToLogin = async (userObject: loginData | undefined) => {
    if (typeof userObject === 'undefined') return;
    const apiUrl = 'http://127.0.0.1:8000/auth/login';
    const request = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(userObject, null, 2),
    });

    const response: loginApiResponseObject = await request.json();
    alert(response);
    // handle failed request
    if (!request.ok) {
      handleBadApiRequest(request, response);
      return;
    };
    // handle good request
    handleGoodApiRequest(response);
  };

  const handleBadApiRequest = (request: Response, response: loginApiResponseObject) => {
    return
  };

  const handleGoodApiRequest = (response: loginApiResponseObject) => {
    return
  };

  return (
    <section className={styles.signUpContainer}>
       <Link to='/'>
        <button className='returnButton'>
          Return to Home
        </button>
      </Link>
      <h1 className={styles.headerTitle}>Login</h1>
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

        <button 
          className={styles.signUpSubmitButton}
          type='submit'>
            Login
        </button>
      </form>
    </section>
  );
};