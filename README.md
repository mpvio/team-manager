# Team Management Front-end

Written with React and Typescript, styling included in the /styles folder as .module.css files.
Default page lists each team as a card element.
Clicking on a card pulls up that team's information and team members.
The team's name and members' info can be modified.
Because I am faking an API call, changes are added to a "mockTeams" database (a list of Team objects).

## Installation:

Clone the repository from the link provided.
Open the repository in the command line and run:

npm install
npm start

## What I would do with more time

- Add functionality to the Teams/ Members options in the sidebar:
-- Members would show a table of members with their assigned teams in an additional column.

- Add proper data storage
-- e.g. store data in a local .db file to read from.

- Add remaining CRUD functionality

- UI improvements
-- possibly drag-and-drop members between teams?

- Unit & Integration Testing
