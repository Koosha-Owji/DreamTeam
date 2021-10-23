# Dream Team CRM
![imagename](https://github.com/ccharansingh/DreamTeam/blob/FEAT-testing/crm.JPG?raw=true)
###### IT Project Capstone, University of Melbourne Semester 2 2021
###### Developers: Olivia, Koosha, Chirag, Anagha and Tash
## Links
[Dream Team CRM Web Application](https://dream-team-crm.herokuapp.com/)\
[Dream Team CRM Documentation](https://dreamteam56.atlassian.net/wiki/spaces/DT/overview?homepageId=18972688)
## Project Overview
The Dream Team CRM is designed for users to manage relationships in a business context. This includes storing contacts and notes, scheduling meetings, sending emails and logging orders. Users can create a profile from which they manage these relations and make all necessary CRUD changes. Users can also create labels which can be assigned to contacts to enable better search/filter operations.
###### Functionality
* Create and update profile
* Sign in and signup
* Add, delete, update and view contacts
* Add, delete, update and view notes
* Add, delete, update and view orders
* Add, delete, update and view meetings
* Add, delete and view orders
* Assign 0..6 labels to a contact
* Assign 0..1 notes to a meeting
* Search notes by content or title
* Filter notes by time
* Search contacts by first name or last name
* Filter contacts by labels

## Key Sections of Project Structure
#### Front End
###### `/src`
`/actions`: middleware functions called from front end components using dipatch\
`/components`: front end components split up by feature: contact, label, meeting, order, notes and profile\
`/api`: requests called in front end are routed to backend \
`/reducers`: middleware that defines function calls from front to back
#### Back End
`/controllers`: function definitions for API calls and other user actions\
`/middleware`: authentication protocol definitions\
`/models`: object definitions to be stored in database\
`/routes`: URL routing \
`/test`: testing files


## Installation
##### May require root access depending on package manager in use
Requires a .env file with attributes: MONGO_USERNAME and MONGO_PASSWORD. These are read in backend/index.js to connect to the database for the CRM storage.
1. Clone or save code onto local machine
2. Open two terminals 
3. cd into backend and run `npm install` in one of the terminals
4. cd into front end and run `npm install` in the other terminal 

## Usage 
Open two terminals A and B\
Terminal A: `cd backend`\
Terminal A: `npm start`\
Terminal B: `cd frontend`\
Terminal B: `npm start`

The app will run in development.\
Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

##### Testing 
`cd backend`\
`npm test`\
Test results will print to command line. 

##### Build 
`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

##### Ejecting 

`npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Licensing 
[View license](https://github.com/ccharansingh/DreamTeam/blob/FEAT-testing/COPYING)
