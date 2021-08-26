# Webvel - For Online Writers and Readers 🖋📚

## What is Webvel?
Webvel is a web application for sharing stories online. This application provides an online host for users to share their written works. Users can navigate through Webvel to explore new stories to read.

## Purpose of this Project
- Solve the problems of finding stories to read for free and seeking a place to host written fictional work like novels
- Help me learn how to use PostgreSQL

## Technologies Used
- [PostgreSQL](https://www.postgresql.org/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/)

## How to set up locally

### Prerequisites
The following set-up instructions only apply to Linux machines, particularly Debian distros like Ubuntu.

### 1. Install PostgreSQL locally
If you do not have PostgreSQL installed, you can follow [PostgreSQL Tutorial for Beginners](https://medium.com/internetmango/postgresql-tutorial-for-beginners-82bf54ac5482) to install and set up PostgresSQL on your machine.

### 2. Clone the repository
In your local terminal, enter the following command:

```git clone https://github.com/j-dover/fullstack-web-novels-project.git```

Enter the `fullstack-web-novels-project` folder by entering the following command into the terminal:

```cd fullstack-web-novels-project```

### 3. Set up the server

Change into the server folder by entering the following command into the terminal:

```cd server```

Install the dependencies by entering this command into the terminal:
```npm install```

### 4. Set up the client

Change into the client folder by entering the following command into the terminal:

```cd ../client```

Install the client dependencies by entering this command into the terminal:

```npm install```

### 5. Running the client and server

Change into the root folder with:
```cd .. ```

To run the server, enter this command into the terminal:

```npm run dev:server```

If you only want to run the server for REST API testing purposes, it is not necessary to run the client. 
If you want to use the full web application, you must run the client.

To run the client, enter this command into a new terminal window at the root repository folder:

```npm run dev:client```

If you want to terminate the server or client, enter Ctrl+C into the terminal to end the server/client.

## License
[MIT](https://choosealicense.com/licenses/mit/)
