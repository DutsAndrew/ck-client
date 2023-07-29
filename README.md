# CK-Client

CK-Client is a Front-End Application that runs in the browser. It's built on React using TypeScript to provide a fast and scalable build for users. The Client interfaces with the CK-API that can be found (here)[https://github.com/DutsAndrew/ck-api].

If you would like to contribute, talk about pricing, or participating in the BETA please reach out to: dutsandrew@gmail.com

CK is open source to keep things transparent for users and to allow the community around the application to grow.

## Task List

### Home Page
- [ ] Navbar changes based on whether user is signed in or not
- [ ] If session hasn't expired then navbar should have condensed options and have a highlighted option to return to the application, home page and footer still show on first load

### Calendar
- [ ] Figure out how to get all data for Days, Months, Years for calendar
- [ ] Take calendar data and allow users to view calendar by year, month, or day
- [ ] Render the appropriate amount of squares to represent day for each month
- [ ] Allow users to submit events to add to their calendar
- [ ] Events should allow users to select multiple days for an event, or every ___ options (Year, Month, Week, Day, M-F, etc)
- [ ] Users can perform CRUD operations on events they author or are part of a team of
- [ ] Users can set events as a team event or a personal event
- [ ] Calendars can toggle events for the following to be displayed at a time: personal and team(s)
- [ ] Calendar Collection will have calenders for each user and any teams(s) they may be a part of by default, calendars can be empty
- [ ] Users can change the color of each month, weeks, or certain days (M-F), event colors can be changed as well, but will by default match the color of the user or team default color. If user changes the color scheme it will need to be saved in localstorage
- [ ] can drag and drop events to new locations on the calendar

### Lesson Manager
- [ ] Show classes
- [ ] Show times for each (Friday adjustment, etc)
- [ ] Show lessons for each class on a weekly/monthly basis (GT, ESL, etc should show differently)
- [ ] Can color code classes
- [ ] Can view classes individually or all as a whole

### Task Manager
- [ ] User can create tasks
- [ ] Can assign them to members of a team
- [ ] Sub tasks can be linked to tasks, completion bar will adjust per task based on sub task completion if added
- [ ] Can toggle which team is displaying tasks for currently
- [ ] Option to open kanban board view of tasks that are in each holder: 1) backburner, 2) ready to assign, 3) in progress, 4) Waiting (on something/someone), 5) completed
- [ ] Allow comments from other team members on each individual task
- [ ] Users can add or remove tasks if they are a member on that team by default added tasks are put in the "ready to assign" kanban holder
- [ ] Marking a task as done or dragging and dropping it into the completed holder will mark it as completed and change it's status
- [ ] Object for this will be marked as a "task" under the tasks collection and saved as a task under the "team" document in the "teams" collection as a reference to the task document

### Jenkins, Teacher AI
- [ ] Users can toggle between these AI tasks: 1) Email Drafting, 2) Lesson Plan Outline Writing, 3) Email Analysis and Response, 4) Student Report Writing, 5) Parent Newsletters, 6) Announcement Writing, 7) Edhandbook or Behavioral Writeup Drafting

### Note Taker
- [ ] Notes can be written during meetings and saved to certain teams
- [ ] Notes are time stamped and saved on the calendar or in the notes section for click access
- [ ] Notes can be edited at any time by the author or other members of the group

### Account
- [ ] Display account information
- [ ] Show teams the user is a member of
- [ ] Join and Leave team section
- [ ] search bar to find teams or users to add teams to
- [ ] Delete account option

### Team Messaging (backburner)
- [ ] Encrypt messages after 5 mins of inactivity. Users can change the lockout timer. Users must enter a 4 digit pin that is saved to their account to get back in.
- [ ] Can search and add users to messaging groups
- [ ] Display number of unread messages on "messaging" tab

### Class Manager
- [ ] Can write class descriptions and notes for each class for easy print out for subs
- [ ] Can import excel/sheet class lists and auto import them into your class
- [ ] Can give and take points from students
- [ ] Audible noises for point modifiers
- [ ] Teachers can write behavior reports or notes on classes/students
- [ ] Problem solving board for each class (things tried, things willing to try, things to figure out)
- [ ] Notes on students that are further ahead or behind

### Footer
- [ ] All single page components under "pages" have clickable routes to pull up each page and close out to the home page