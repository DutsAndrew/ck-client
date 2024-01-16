import React, { useState } from "react";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import toast from "react-hot-toast";

const TeamForm = () => {

  const [teamFormData, setTeamFormData] = useState({
    teamColor: '',
    teamDescription: '',
    teamMembers: [],
    teamName: '',
  });
  const [apiRequestSent, setApiRequestSent] = useState(false)
  const [userLookup, setUserLookup] = useState("");
  const [userLookupResults, setUserLookupResults] = useState([]);

  const handleCalendarNameChange = (newTeamName: string) => {
    setTeamFormData((prevTeamFormData) => ({
      ...prevTeamFormData,
      newTeamName,
    }));
  };

  const handleUserSearchBarEntry = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (userLookup.length === 1) setUserLookupResults([]); // when user deletes entry, search results are removed
    return setUserLookup(event.currentTarget.value);
  };

  const handleUserKeyClickOnSearchBarEntry = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      handleUserSearchRequest();
    } else if (e.key === 'Backspace' || e.code === 'Backspace') {
      setUserLookupResults([]);
    } else {
      return;
    };
  };

  const handleUserSearchRequest = async () => {
    toast.loading('Finding Users', {id: 'fetchingUsers'})
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return toast.error('You need to be signed in or not in incognito to perform this action', {id: 'fetchingUsers'});
    } else {
      const apiUrl = `http://127.0.0.1:8000/users/userQuery?user=${userLookup}`;
      const request = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        method: 'GET',
      });
      const jsonResponse = await request.json();
      setApiRequestSent(true);
      if (!request.ok && request.status !== 200 && !jsonResponse.user_results) {
        setUserLookupResults([]);
        setUserLookup('');
        return toast.error(`${jsonResponse.detail}`, {id: 'fetchingUsers'});
      } else {
        setUserLookupResults(jsonResponse.user_results);
        if (jsonResponse.user_results.length === 0) {
          toast.error('No users found', {id: 'fetchingUsers'});
        } else {
          toast.success('Users found', {id: 'fetchingUsers'});
        };
      };
    };
  };

  const handleCalendarDescriptionChange = (newTeamDescription: string) => {
    setTeamFormData((prevTeamFormData) => ({
      ...prevTeamFormData,
      newTeamDescription,
    }));
  };

  return (
    <div className={styles.projectsAndTasksTeamFormContainer}>
      <h2 className={styles.projectsAndTasksFormHeader}>
        Team
      </h2>
      <form className={styles.projectsAndTasksTeamForm}>

        <div className={styles.formGroup}>
            <label 
              htmlFor='team-name-input'
              className={styles.projectsAndTasksFormLabel}
            >
              *Team Name:
            </label>
            <input
              id='team-name-input'
              name="teamName"
              value={teamFormData.teamName}
              onChange={(e) => handleCalendarNameChange(e.target.value)}
              className={styles.projectsAndTasksFormInput}
              minLength={1}
              maxLength={50}
              required>
            </input>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='user-search-input' className={styles.projectsAndTasksFormLabel}>
              Add Users (first-name, last-name, or email):
            </label>
            <input
              type="text"
              id='user-search-input'
              value={userLookup}
              onChange={(e) => handleUserSearchBarEntry(e)}
              onKeyDown={(e) => handleUserKeyClickOnSearchBarEntry(e)}
              className={styles.addCalendarFormInput}
            />
            <button 
              className={styles.addCalendarUserSearchButton}
              type="button"
              onClick={() => handleUserSearchRequest()}>
              Search
            </button>
          </div>

          <div className={styles.formGroup}>
            <label 
              htmlFor='team-description-input'
              className={styles.projectsAndTasksFormLabel}
            >
              Team Description (Optional):
            </label>
            <textarea
              id='team-description-input'
              name="teamDescription"
              value={teamFormData.teamDescription}
              onChange={(e) => handleCalendarDescriptionChange(e.target.value)}
              className={styles.projectsAndTasksFormInput}
              minLength={1}
              maxLength={50}
              required>
            </textarea>
          </div>      

      </form>
    </div>
  );
};

export default TeamForm;