# Git_It_Done
http://git-that-done.herokuapp.com/users/login
Git it Done is a to-do list for the unorganized trying to change their habits; together we'll GIT IT DONE!

* Technologies Used
  * Javascript
  * CSS
  * HTML
  * Express
  * Postgres
  * Sequelize
  * PUG

* MVP
  * Hosted on Heroku
  * New Account Creation, Login, Demo Login
    * Users can sign up, sign in, and log out
    * Users can use demo button to login to see all the features
  * Lists
    * Users can create, edit, and delete lists
    * Users can see saved data when using demo login
    * Users can see a summary of their total tasks, completed tasks, and incomplete tasks for each list they click on.
  * Tasks
    * Users can create, edit, and delete tasks
    * Users can mark completed tasks as incomplete
    * Sidebar shows task info when users click on a task
* Search
  * Users can use the search bar to search for tasks

* Instructions
  * Git clone https://github.com/Willy-Git-Man/Git_It_Done
  * Run npm install
  * Install postgres
  * Create a new user in postgres (credentials in env.example)
  * Create a .env file (copy env.example)
  * Run npx dotenv sequelize db:create
  * Run npx dotenv sequelize db:migrate
  * Run npx dotenv sequelize db:seed:all
  * Run npm start
  * Open browser and go to http://localhost:8080/
  * Use demo login or create own user

* Dependencies
  * "bcryptjs": "^2.4.3"
  * "connect-session-sequelize": "^7.0.4"
  * "cookie-parser": "~1.4.4"
  * "csurf": "^1.11.0"
  * "debug": "~2.6.9"
  * "express": "~4.16.1"
  * "express-session": "^1.17.1"
  * "express-validator": "^6.13.0"
  * "http-errors": "~1.6.3"
  * "morgan": "~1.9.1"
  * "per-env": "^1.0.2"
  * "pg": "^8.6.0"
  * "pug": "2.0.4"
  * "sequelize": "^5.22.3"
  * "sequelize-cli": "^5.5.1"
