# Welcome to Tasky!

Tasky is a clone of the application Todoist and my personal capstone project, the culmination of my learning at App Academy. Tasky is an app that lets you create projects, sections within those projects, and tasks that you can complete!

### [Visit the Wiki](https://github.com/stuffy-doll/Tasky_Capstone/wiki)
### [Live Link](https://tasky-capstone.herokuapp.com/login)

## Tasky in Action
![tasky-1](https://user-images.githubusercontent.com/97128550/184039719-04355b54-1461-4235-b2ec-691d1d14e945.PNG)
![tasky-2](https://user-images.githubusercontent.com/97128550/184039736-63d040d1-1858-40d5-97f1-2959fcc6e169.PNG)
![tasky-3](https://user-images.githubusercontent.com/97128550/184039744-318771c5-26da-4fee-9727-04c2048712b7.PNG)

## Technologies Used

- Flask
- Python
- SQLAlchemy
- ReactJS

## Features

On signup, users are given a default project to begin writing tasks in.

Users can:
- Create projects to put tasks in
- Update a project as needed, including the ability to favorite a project.
- Delete projects
- Add as many sections to a project as they want
- Fill each section with as many tasks as a user desires.
- View their tasks on detailed task pages.
- Mark tasks as complete, and as incomplete if needed.
- Update the details, including the due date of a task.
- Delete tasks as needed
- Delete entire projects

Some UI/UX features include:
- Dynamic due date display that changes depending on whether a task is due today, in the future, or overdue.
- Color coded projects
- New user default project includes pre-made tasks to help guide users.

## Challenges Faced

My two greatest challenges while working on this project were formatting dates between Python and JS when fetching from the backend and implementing full CRUD on the tasks MVP feature. Properly formatting dates in order to pre-fill the date data into a date input element required that I create a special function that returned the date formatted in a way that react would accept. I also neeed a function to determine the due date on a tasks date value in order to return the correct display for the due date fields in a task. My way of handling this was to test, test, test and to do research on date objects in both Python and JavaScript. It was a lot of fun to learn about them both and I feel I am a stronger programmer for it.

Tasks were another difficult hurdle to handle. Ultimately, I decided to implement two different UPDATE routes for my tasks, one update would handle marking tasks complete/incomplete, and one to handle changes in the tasks contents (title, description, date). Creating a component that handled task views was something I had to stop and think about as well, I eventually went with a large card that would give a full overview of the task, including what section and project that task was part of. I am particularly fond of the the edit on the task displaying the form fields where the task details were. I learned quite a bit about nested routes as well in this process.

```
// Code for formatting my dates
  const dateFormatter = (date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${year}-${month < 10 ? '0' + (month + 1) : month + 1}-${day < 10 ? '0' + day : day}`
  }
```

## Future Features

There are many features I'd like to include as I continue working on this project. These include...

- Comments: While I already have the database models made for this feature, I have yet to implement them.
- Show/Hide Finished Tasks
- Themes
- Subtasks
- Section name editing
- Custom checkboxes
- A 'Today' section that displays projects due on the current date
- Drag and drop on tasks
