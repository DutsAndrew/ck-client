import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/signup.module.css';

export default function SignUp() {

  const [apiResponse, setApiResponse] = useState({
    message: '',
  });

  const [badFormData, setBadFormData] = useState({
    data: {},
  });

  const handleFormSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = document.querySelector('#email'),
          firstName = document.querySelector('#firstName'),
          lastName = document.querySelector('#lastName'),
          location = document.querySelector('#location'),
          password = document.querySelector('#password'),
          confirmPassword = document.querySelector('#confirmPassword');

    if (email && firstName && lastName && location && password && confirmPassword) {
      const data = new URLSearchParams();
            data.append('email', (email as HTMLInputElement).value);
            data.append('firstName', (firstName as HTMLInputElement).value);
            data.append('lastName', (lastName as HTMLInputElement).value);
            data.append('location', (location as HTMLInputElement).value);
            data.append('password', (password as HTMLInputElement).value);
            data.append('confirmPassword', (confirmPassword as HTMLInputElement).value);

      const url = 'https://avd-blog-api.fly.dev/api/signup';
      const sendFormData = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        body: data.toString(),
      });

      try {
        const response = await sendFormData.json();
        console.log(response);
        if (response.strippedUserInformation) {
          // account was verified
          setApiResponse({
            message: response.message,
          });
        } else {
          setApiResponse({
            message: response.message,
          });
          setBadFormData({
            data: {
              email: response.email,
              firstName: response.firstName,
              lastName: response.lastName,
              location: response.location,
              password: response.password,
              confirmPassword: response.confirmPassword,
            }
          })
        };
      } catch(error) {
        setApiResponse({
          message: `${error}`,
        });
      };
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
            name="email" 
            id='email' 
            type="email">
          </input>
        </div>

        <div className={styles.formGroup}>
          <label
            className={styles.signUpLabel} 
            htmlFor='firstName'>
            *First Name:
          </label>
          <input
            className={styles.signUpInput} 
            name="firstName" 
            id='firstName' 
            type="text">
          </input>
        </div>

        <div className={styles.formGroup}>
          <label
            className={styles.signUpLabel} 
            htmlFor='lastName'>
            *Last Name:
          </label>
          <input
            className={styles.signUpInput} 
            name="lastName" 
            id='lastName' 
            type="text">
          </input>
        </div>

        <div className={styles.formGroup}>
          <label
            className={styles.signUpLabel} 
            htmlFor='location'>
            *Location:
          </label>
          <input
            className={styles.signUpInput} 
            name="location" 
            id='location' 
            type="text">
          </input>
        </div>

        <div className={styles.formGroup}>
          <label
            className={styles.signUpLabel} 
            htmlFor='password'>
            *Password:
          </label>
          <input
            className={styles.signUpInput} 
            name="password" 
            id='password' 
            type="password">
          </input>
        </div>

        <div className={styles.formGroup}>
          <label
            className={styles.signUpLabel} 
            htmlFor='confirmPassword'>
            *Confirm Password:
          </label>
          <input
            className={styles.signUpInput} 
            name="confirmPassword" 
            id='confirmPassword' 
            type="password">
          </input>
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