import React, { FC, useState } from "react";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import toast from "react-hot-toast";
import { projectFormDataState, projectFormProps, teamInstance } from "../../types/projectAndTaskTypes";
import { userRef } from "../../types/globalTypes";

const ProjectForm:FC<projectFormProps> = (props): React.JSX.Element => {

  const {
    userId,
    teams,
    closeForm,
    buildUserProfileRef,
  } = props;

  const [projectFormData, setProjectFormData] = useState<projectFormDataState>({
    projectDueDate: '',
    projectCreator: buildUserProfileRef(),
    projectDescription: '',
    projectMembers: [],
    projectName: '',
    projectTeamId: '',
  });

  const handleFormInputChange = (e: 
    React.ChangeEvent<HTMLInputElement> 
    | React.ChangeEvent<HTMLTextAreaElement> 
    | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const elementId = e.target.id;
    const value = e.target.value;

    setProjectFormData((prevProjectFormData) => ({
      ...prevProjectFormData,
      [elementId]: value,
    }));
  };

  const handleAddUserToProjectFormData = (user: userRef) => {
    console.log(user)
  };

  const handleFormEnterClick = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      e.preventDefault();
    } else {
      return;
    };
  };

  const handleFormSubmitByButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    uploadNewProjectToDb();
  };

  const uploadNewProjectToDb = async () => {
    toast.loading('Uploading project...', {id: 'uploadingProject'});
    const authToken = localStorage.getItem('auth-token');
    if (typeof authToken === 'undefined') {
      return toast.error('You must be signed in or not in incognito to perform this action', {id: 'uploadingProject'});
    } else {
      const apiUrl = 'http://127.0.0.1:8000/project/createProject';
      const request = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(projectFormData),
      });
      const response = await request.json();
      if (request.ok && request.status === 200 && response.team) {
        toast.success('Project created!', {id: 'uploadingProject'});
        // save project to user
        closeForm();
      } else {
        toast.error('Failed to create project...', {id: 'uploadingProject'});
      }
    };
  };

  return (
    <div className={styles.projectsAndTasksTeamFormContainer}>
      <h2 className={styles.projectsAndTasksFormHeader}>
        Project
      </h2>
      <form 
        onKeyDown={(e) => handleFormEnterClick(e)}
        className={styles.projectsAndTasksTeamForm}
      >

        <div className={styles.formGroup}>
          <label 
            htmlFor='project-team-input'
            className={styles.projectsAndTasksFormLabel}
          >
            *Assigned Team:
          </label>
          <select 
            name="project-team-input" 
            id="projectTeamId"
            onChange={(e) => handleFormInputChange(e)}
          >
            <option disabled selected> -- select an option -- </option>
            {Array.isArray(teams) && teams.length > 0 && Object.keys(teams[0]).length > 0 && teams.map((team) => {
              const teamInstanceRef = team as teamInstance;
              return <option 
                value={teamInstanceRef._id}
                id='projectTeamId'
              >
                {teamInstanceRef.name}
              </option>
            })}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label 
            htmlFor='project-name-input'
            className={styles.projectsAndTasksFormLabel}
          >
            *Project Name:
          </label>
          <input
            id='projectName'
            name="projectName"
            value={projectFormData.projectName}
            onChange={(e) => handleFormInputChange(e)}
            className={styles.projectsAndTasksFormInput}
            minLength={1}
            maxLength={50}
            required>
          </input>
        </div>

        <div className={styles.formGroup}>
          <label 
            htmlFor='project-description-input'
            className={styles.projectsAndTasksFormLabel}
          >
            Project Description (Optional):
          </label>
          <textarea
            id='projectDescription'
            name="projectDescription"
            value={projectFormData.projectDescription}
            onChange={(e) => handleFormInputChange(e)}
            className={styles.projectsAndTasksFormInput}
            minLength={1}
            maxLength={50}>
          </textarea>
        </div>

        <div className={styles.formGroup}>
          <label 
            htmlFor='project-team-member-input'
            className={styles.projectsAndTasksFormLabel}
          >
            *Assigned team members:
          </label>
          {projectFormData.projectTeamId.length > 0 ? (
            Array.isArray(teams) && teams.length > 0 && Object.keys(teams[0]).length > 0 && (() => {
              const foundTeam = teams.find((team) => (team as teamInstance)._id === projectFormData.projectTeamId);
          
              if (foundTeam) {
                const teamInstanceRef = foundTeam as teamInstance;
                return teamInstanceRef.users.map((user) => (
                  <div key={user.user_id}>
                    <input 
                      id="projectMembers"
                      type="checkbox" 
                      value={user.user_id}
                      onChange={() => handleAddUserToProjectFormData(user._id)}
                    />
                    <p className={styles.userLookUpResultsMainText}>
                      {user.first_name ? user.first_name : ''}&nbsp;
                      {user.last_name ? `${user.last_name}` : ''}
                      {user.job_title ? `, ${user.job_title}` : ''}
                      {user.company ? ` - ${user.company}` : ''}
                    </p>
                  </div>
                ));
              } else {
                // Handle the case where the team is not found
                return <p>Team not found</p>;
              }
            })()
          ) : (
            <p>
              Cannot assign members to the project until you assign a team to the project
            </p>
          )}
        </div>

        <button 
          onClick={(e) => handleFormSubmitByButtonClick(e)}
          type="submit"
          className={styles.projectsAndTasksTeamFormSubmitButton}>
            Add Project
        </button>

      </form>
    </div>
  );
};

export default ProjectForm;