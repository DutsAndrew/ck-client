import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/signup.module.css';
import { signUpData } from '../types/interfaces';

export default function SignUp() {

  const mailFormat: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g,
        passwordFormat: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;


  const handleFormChange = (e: any) => {
    const entryThatChanged = e.target as HTMLInputElement,
          errorText = e.target.nextSibling;

    if (entryThatChanged && errorText) {
      if ((entryThatChanged.validity.valid && entryThatChanged.value.match(mailFormat))
        || (entryThatChanged.validity.valid && entryThatChanged.value.match(passwordFormat))
      ) {
        errorText.textContent = "";
        errorText.className = "error";
      } else {
        showError(entryThatChanged, errorText);
      };
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
          jobTitle = document.querySelector('#jobTitle'),
          company = document.querySelector('#company');

    if (email && firstName && lastName && password && confirmPassword) {
      const userData: signUpData = {
        email: (email as HTMLInputElement).value,
        firstName: (firstName as HTMLInputElement).value,
        lastName: (lastName as HTMLInputElement).value,
        password: (password as HTMLInputElement).value,
      }
      // add optional fields if entered
      if ((jobTitle as HTMLInputElement).value.length !== 0) {
        userData.jobTitle = (jobTitle as HTMLInputElement).value;
      };
      if ((company as HTMLInputElement).value.length !== 0) {
        userData.company = (company as HTMLInputElement).value;
      };

      return userData;
    };
    return undefined;
  };

  const scrubData = (userObject: signUpData | undefined) => {
    if (typeof userObject === 'undefined') return;

    const email = (document.querySelector('#email-input') as HTMLInputElement),
          firstName = (document.querySelector('#firstName-input') as HTMLInputElement),
          lastName = (document.querySelector('#lastName-input') as HTMLInputElement),
          password = (document.querySelector('#password-input') as HTMLInputElement),
          confirmPassword = (document.querySelector('#confirmPassword-input') as HTMLInputElement),
          // optional fields
          jobTitle = (document.querySelector('#jobTitle') as HTMLInputElement),
          company = (document.querySelector('#company') as HTMLInputElement),
          activeErrors = document.querySelectorAll('.error-active').length;
    
    if (email) {
      if (!email.validity.valid || !email.value.match(mailFormat)) {
        showError(email, email.nextSibling);
      };
    };

    if (firstName) {
      if (!firstName.validity.valid) {
        showError(firstName, firstName.nextSibling);
      };
    };

    if (lastName) {
      if (!lastName.validity.valid) {
        showError(lastName, lastName.nextSibling);
      };
    };

    if (password) {
      if (!password.validity.valid || !password.value.match(passwordFormat)) {
        showError(password, password.nextSibling);
      };
    };

    if (confirmPassword) {
      if (!confirmPassword.validity.valid
        || !password.value.match(passwordFormat)
        || confirmPassword.value !== password.value
      ) {
        showError(confirmPassword, confirmPassword.nextSibling);
      };
    };

    if (jobTitle.value.length !== 0) {
      if (!jobTitle.validity.valid) {
        showError(jobTitle, jobTitle.nextSibling);
      };
    };

    if (company) {
      if (!company.validity.valid) {
        showError(company, company.nextSibling);
      };
    };

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
    }
  };

  const handleFormSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // pull out user data
    const userData = buildUserObject();
    
    // validate data
    const scrubbedData = scrubData(userData);

    // check validation check
    if (scrubbedData === true) {
      sendApiRequestToSignUp(userData);
    } else {
      alert('Fix your errors before attempting to submit your account');
      return;
    };
  };

  const sendApiRequestToSignUp = (userObject: signUpData | undefined) => {
    if (typeof userObject === 'undefined') return;
    
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