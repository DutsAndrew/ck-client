import React, { FC, useState } from "react";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import toast from "react-hot-toast";
import { teamFormDataState, teamFormProps } from "../../types/projectAndTaskTypes";
import { userQuery } from "../../types/globalTypes";
import uniqid from "uniqid";
import HexColorPickerCustom from "../HexColorPickerCustom";

const TeamForm:FC<teamFormProps> = (props): React.JSX.Element => {

  const {
    buildUserProfileRef,
  } = props;

  const [teamFormData, setTeamFormData] = useState<teamFormDataState>({
    teamCreator: buildUserProfileRef(),
    teamColor: '',
    teamDescription: '',
    teamMembers: [],
    teamName: '',
  });
  const [apiRequestSent, setApiRequestSent] = useState(false)
  const [userLookup, setUserLookup] = useState("");
  const [userLookupResults, setUserLookupResults] = useState<userQuery[]>([]);
  const [customColorOption, setCustomColorOption] = useState(false);

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const elementId = e.target.id;
    const value = e.target.value;

    setTeamFormData((prevTeamFormData) => ({
      ...prevTeamFormData,
      [elementId]: value,
    }));
  };

  const handleFormEnterClick = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      e.preventDefault();
    } else {
      return;
    };
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
      setTeamFormData({
        ...teamFormData,
        teamMembers: [...teamFormData.teamMembers, user],
      });
      toast.success('User added!', {id: 'AddUserToTeam'});
    };
  };

  const handleRemoveUserFromAuthorizedUsersList = (user: userQuery) => {
    setTeamFormData({
      ...teamFormData,
      teamMembers: teamFormData.teamMembers.filter((invitedUser) => invitedUser !== user)
    });
    toast.success('User removed', {id: 'removeUserFromTeam'});
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
      console.log(jsonResponse)
    };
  };

  return (
    <div className={styles.projectsAndTasksTeamFormContainer}>
      <h2 className={styles.projectsAndTasksFormHeader}>
        Team
      </h2>
      <form 
        onKeyDown={(e) => handleFormEnterClick(e)}
        className={styles.projectsAndTasksTeamForm}
      >

        <div className={styles.formGroup}>
          <label 
            htmlFor='team-name-input'
            className={styles.projectsAndTasksFormLabel}
          >
            *Team Name:
          </label>
          <input
            id='teamName'
            name="teamName"
            value={teamFormData.teamName}
            onChange={(e) => handleFormInputChange(e)}
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
            id='teamDescription'
            name="teamDescription"
            value={teamFormData.teamDescription}
            onChange={(e) => handleFormInputChange(e)}
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
            className={styles.projectsAndTasksFormInput}
          />
          <button 
            className={styles.projectsAndTasksTeamFormUserSearchButton}
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
                    {user.user.first_name ? user.user.first_name : ''}&nbsp;
                    {user.user.last_name ? `${user.user.last_name}` : ''}
                    {user.user.job_title ? `, ${user.user.job_title}` : ''}
                    {user.user.company ? ` - ${user.user.company}` : ''}
                  </p>
                  <p className={styles.userLookUpResultsEmailText}>
                    {user.user.email ? user.user.email : ''}
                  </p>
                  <div className={styles.projectsAndTasksTeamFormUserButtonContainer}>
                    <button 
                      className={styles.projectsAndTasksTeamFormUserAddButton}
                      onClick={() => handleAddUserToTeamClick(user)}>
                      Invite User
                    </button>
                  </div>
                </li>
            ))}
          </ul>
          {apiRequestSent === true && userLookupResults.length === 0 && <p>No results</p>}
        </div>

        <div className={styles.projectsAndTasksTeamFormSelectedUsersContainer}>
          <h3>Invited Users:</h3>
          <ul className={styles.projectsAndTasksTeamFormUserQueryList}>
            {teamFormData.teamMembers.map((user) => (
              <li
                className={styles.userLookUpResultsListItem} 
                key={uniqid()}
              >
                <p className={styles.userLookUpResultsMainText}>
                  {user.user.first_name ? user.user.first_name : ''}&nbsp;
                  {user.user.last_name ? `${user.user.last_name}` : ''}
                  {user.user.job_title ? `, ${user.user.job_title}` : ''}
                  {user.user.company ? ` - ${user.user.company}` : ''}
                </p>
                <p className={styles.userLookUpResultsEmailText}>
                  {user.user.email ? user.user.email : ''}
                </p>
                <button 
                  className={styles.projectsAndTasksTeamFormRemoveUserFromListButton}
                  onClick={() => handleRemoveUserFromAuthorizedUsersList(user)}>
                    X
                </button>
              </li>
            ))}
          </ul>
        </div>

        <label className={styles.projectsAndTasksTeamFormCustomColorCheckboxLabel}>
          <input
            type="checkbox"
            checked={customColorOption}
            onChange={() => handleCustomColorOptionSelected()}
          />
          Would you like to set a custom color for this team?
        </label>

        {customColorOption ? (
          <HexColorPickerCustom 
            headerText='Select a team Color'
            currentHexColor={teamFormData.teamColor}
            changeHexColorSelection={handleChangeHexColorSelection}
          />
        ) : (
          <></>
        )}

        <button 
          onClick={(e) => handleFormSubmitByButtonClick(e)}
          type="submit"
          className={styles.projectsAndTasksTeamFormSubmitButton}>
            Create Team
        </button>

      </form>
    </div>
  );
};

export default TeamForm;