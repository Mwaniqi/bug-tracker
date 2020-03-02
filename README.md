<h2 align="center">An issue tracking application built with React and Node</h2>

### Features
- Basic CRUD actions where a user can create and delete an issue
- React front-end with functional components and Hooks
- Local state management via Context
- Server API built on Express and Mongo:
	[x] data validation
	[x]	user registration
	[x] JWT authentication and authorization

### Running the app
 - `clone` the repo
 - run `npm install`
 - `cd server` and `mongod`
 - in another terminal tab `cd server` and run either `nodemon` or `node app.js` (if nodemon isn't installed)
 - `cd client` and `npm start` in another terminal
 - App should be running on `http://localhost:3000/`