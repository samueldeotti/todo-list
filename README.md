# Fullstack Project - Samuel Deotti

This project aims to develop a fullstack application for a todo list platform. Users can login, add, and view, edit, and remove, from the list. The application includes both a front-end and a back-end, with API for user and tasks management.

## Technologies Used

For the development of this application, **Java** was used alongside the **Spring Boot** framework, providing a structure for building the backend services following the principles of RESTful architecture. 

On the frontend, **React** with **TypeScript** was utilized to create a dynamic and type-safe user interface.

The database management was handled by **MySql**, with queries and data manipulations abstracted by the Spring Data JPA.


Additionally, **Docker** was used for containerization, making the deployment process more efficient and consistent.

## What Was Developed

- A MySql database using Spring Data JPA, containing tables to store user information, post categories, and all relevant post data;
- Endpoints that interact with the MySQL database, supporting CRUD operations;
- Middlewares for validating request data and ensuring the user is authenticated and authorized to perform specific actions;
- A frontend interface built with React and TypeScript, offering a responsive and type-safe user experience;
- Containerization of the application with Docker, ensuring consistency across different environments.


## Frontend

### How to Build and Run the Frontend Application

1. Clone the project from GitHub:
    ```bash
    git clone https://github.com/bc-fullstack-04/samuel-deotti-frontend.git
    ```
   or
    ```bash
    git clone git@github.com:bc-fullstack-04/samuel-deotti-frontend.git
    ```

2. Navigate to the project directory:
    ```bash
    cd samuel-deotti-frontend
    ```

3. Start the Docker Compose services:
    ```bash
    docker compose up
    ```

4. In another terminal tab, install the dependencies:
    ```bash
    npm install
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

6. Wait for a new tab to open in your browser, or open it manually. The application usually runs on port 5173, but it may open on a different port. If you encounter issues, check the terminal for the specified port.
    ```bash
    http://localhost:5173/
    ```

### How to Stop the Frontend Application

To stop the application, press `Ctrl + C` in the terminal where Docker Compose and the development server are running.

### Frontend Routes

- /signin: `User signin page`
- /signup: `User signup page`
- /tasks: `Dashboard for adding, viewing, editing, and removing tasks`

## Backend

### How to Build and Run the Backend Application

1. Clone the project from GitHub:
    ```bash
    git clone https://github.com/bc-fullstack-04/samuel-deotti-backend.git
    ```
   or
    ```bash
    git clone git@github.com:bc-fullstack-04/samuel-deotti-backend.git
    ```

2. Navigate to the project directory:
    ```bash
    cd samuel-deotti-backend
    ```

3. Build and Run the Docker Compose services:
    ```bash
    docker-compose up --build
    ```

### How to Stop the Backend Application

To stop the application, press `Ctrl + C` in the terminal where Docker Compose is running, or run the following command in the project root directory:
    ```bash
    docker-compose down
    ```

### Backend Ports

- User Management API: `8080`
- PostgreSQL: `3306`

### API Documentation

- For documentation on the User and Task Management API, navigate to [Documentation](http://localhost:8080/swagger-ui/index.html#/) in your browser.

