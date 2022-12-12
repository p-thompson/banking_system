# This project is separated into three parts: client_side, server and database. Both client and server sides require NPM package manager in order to be installed.

# Getting Started
Frameworks used:
-----

- [React 18.2.0][1]
- [Express.js 4.16.1][3]
- [Node.js 14.17.6][4]
- [React Bootstrap 2.6.0][2]
- [MySQL 8.0.31][5]


[1]: https://reactjs.org/
[2]: https://react-bootstrap.github.io/
[3]: https://expressjs.com/
[4]: https://nodejs.org/en/
[5]: https://dev.mysql.com/doc/relnotes/mysql/8.0/en/news-8-0-31.html

## Project Structure
The project maintains a direct relationship between components of the front end and their respective component in the back end. To map the components, you can go to /client_side/src/components and /server/app.js and see routes that go from the front end to the back end and, lastly, into the database. 

## Getting Started 
Run the command bellow to install NPM


    npm install -g npm


### Clone the banking_system repo
Make a directory and cd into it, then run:

    git clone git@github.com:p-thompson/banking_system.git

## Create SCHEMA

Use the dabase schema.sql file to create the database.

## Install Server Side

CD into server and run:

    npm install --force

## Database Configuration

After project is installed, modify the file /server/routes/db.js to match your database configuration (username and password)

Once db.js is configured, run:

    npm run server

## Install Client Side

CD into client_side and run:

    npm install --force


After project is installed the front end should be ready to connect to the backend. Simply run:


    npm start

This should automatically open a local host on port 3001, if that is available/ not in use.
A current valid customer in the database is username: brenden1, passwrd: password. A current valid admin in the database is username: nicole1, passwrd: password. Any user loaded in the database should work properly in the system.

## Download MySQLand Workbench

In order to be able to view and edit the current database MySQL and Workbench, or some other GUI, are needed.

To download MySQL follow the link: https://dev.mysql.com/downloads/mysql/
//
To download Workbnech follow the link: https://dev.mysql.com/downloads/workbench/

One successful, open MySQL Workbench and click on the local instance entry to create a connection to your MySQL Community Server.
You can then open the schema found in the banking_system_schema folder in Workbench.

### Files I wrote


* All files in /client_side/src/components
* server/app.js
* the full contents in the banking_system_schema folder

### Citations

Oliveira, Rafael (2022). Collab (Version 1.0) [Source Code]. https://github.com/Ahrfry/Collab 
The resource cited above provided the framework for connecting the frontend, backend, and database by implementing the following files (with my own modifications to fit the needs of my project):

* /server/routes/db.js
* /client_side/src/App.js
* /client_side/src/App.css
* /client_side/src/index.js
