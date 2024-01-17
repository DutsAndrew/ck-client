import React, { useState } from "react";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import toast from "react-hot-toast";
import { teamFormDataState } from "../../types/projectAndTaskTypes";
import { userQuery } from "../../types/globalTypes";
import uniqid from "uniqid";
import HexColorPickerCustom from "../HexColorPickerCustom";

const TeamForm = () => {

  const [teamFormData, setTeamFormData] = useState<teamFormDataState>({
    teamColor: '',
    teamDescription: '',
    teamMembers: [],
    teamName: '',
  });
  const [apiRequestSent, setApiRequestSent] = useState(false)
  const [userLookup, setUserLookup] = useState("");
  const [userLookupResults, setUserLookupResults] = useState<userQuery[]>([]);
  const [customColorOption, setCustomColorOption] = useState(false);


  const handleCalendarNameChange = (newTeamName: string) => {
    setTeamFormData((prevTeamFormData) => ({
      ...prevTeamFormData,
      newTeamName,
    }));
  };

  const handleCalendarDescriptionChange = (newTeamDescription: string) => {
    setTeamFormData((prevTeamFormData) => ({
      ...prevTeamFormData,
      newTeamDescription,
    }));
  };

  const handleCustomColorOptionSelected = () => {
    setCustomColorOption(!customColorOption);
  };
  
  const handleChangeHexColorSelection = (newColor: string) => {
    setTeamFormData((prevTeamFormData) => ({
      ...prevTeamFormData,
      teamColor: newColor,
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

  const handleAddUserToTeamClick = (user: userQuery) => {
    toast.loading('Adding user...', {id: 'AddUserToTeam'});
    if (teamFormData.teamMembers.includes(user)) { // exit if user is already in list
      return toast.error('User already added', {id: 'AddUserToTeam'});
    } else {
      toast.success('User added!', {id: 'AddUserToTeam'});
      setTeamFormData({
        ...teamFormData,
        teamMembers: [...teamFormData.teamMembers, user],
      });
    };
  };

  const handleFormSubmitByButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    uploadNewTeamToDb();
  };

  const uploadNewTeamToDb = async () => {
    toast.loading('Uploading team...', {id: 'uploadingTeam'});
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return toast.error('You must be signed in or not in incognito to perform this action', {id: 'uploadingTeam'});
    } else {
      const apiUrl = 'http://127.0.0.1:8000/team/createTeam';
      const request = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(teamFormData),
      });
      const jsonResponse = await request.json();
      if (!request.ok && request.status !== 200 && !jsonResponse.calendar) {
        return toast.error(`${jsonResponse.detail}`, {id: 'uploadingTeam'});
      } else {
        // handle adding new team instance to user stored locally
        toast.success('Team Created!', {id: 'uploadingTeam'});
        // return handleCloseModalRequest();
      };
    };
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

        <div className={styles.projectsAndTasksTeamFormUserQueryResultsContainer}>
          <h3>Search Results:</h3>
          <ul className={styles.projectsAndTasksTeamFormUserQueryList}>
            {userLookupResults.length > 0 && Array.isArray(userLookupResults) && userLookupResults.map((user) => (
                <li 
                  className={styles.userLookUpResultsListItem}
                  key={uniqid()}
                >
                  <p className={styles.userLookUpResultsMainText}>
                    {user.user.first_name} {user.user.last_name}, {user.user.job_title} - {user.user.company}
                  </p>
                  <p className={styles.userLookUpResultsEmailText}>
                    {user.user.email}
                  </p>
                  <div className={styles.projectsAndTasksTeamFormUserButtonContainer}>
                    <button 
                      className={styles.addCalendarUserAddButton}
                      onClick={() => handleAddUserToTeamClick(user)}>
                      Add User
                    </button>
                  </div>
                </li>
            ))}
          </ul>
          {apiRequestSent === true && userLookupResults.length === 0 && <p>No results</p>}
        </div>

        <label className={styles.addCalendarCustomColorCheckboxLabel}>
          <input
            type="checkbox"
            checked={customColorOption}
            onChange={() => handleCustomColorOptionSelected()}
          />
          Would you like to set a custom color for this calendar?
        </label>

        {customColorOption ? (
          <HexColorPickerCustom 
            headerText='Select a Calendar Color'
            currentHexColor={teamFormData.teamColor}
            changeHexColorSelection={handleChangeHexColorSelection}
          />
        ) : (
          <></>
        )}

        <button 
          onClick={(e) => handleFormSubmitByButtonClick(e)}
          type="submit"
          className={styles.addCalendarFormButton}>
            Create Calendar
        </button>

      </form>
    </div>
  );
};

export default TeamForm;