PostSnap - Angular App

A responsive Angular application that fetches 100 posts from the JSONPlaceholder API, displays them in a grid layout, and allows users to interact with them by rotating through post details on click.

Table of Contents

    1.	About
    2.	Tech Stack
    3.	Features
    4.	Installation
    5.	Running the Application
    6.	Testing
    7.	Development


About

PostSnap is an Angular-based application designed to display posts from the JSONPlaceholder API. The application shows posts as squares in a grid layout, with details that can be rotated upon clicking a post. It uses Signal for state management to handle API calls and manage the posts’ state.

Tech Stack

    •	Angular - Frontend framework for building the application.
    •	Signal - For state management.
    •	JSONPlaceholder - Fake API for fetching posts.
    •	Sass/SCSS - For styling the application.
    •	HttpClientModule - For making HTTP requests.
    •	Angular CLI - For scaffolding and building the app.

Features

    •	Fetches and displays 100 posts in a grid of 10 rows and 10 columns.
    •	Rotates through post details (title, userId, id, and body) when clicked.
    •	Only one post shows details at a time, and clicking another post resets the previous post.
    •	Designed with modular components for scalability.


Installation

Prerequisites

    •	Node.js (version 18 or higher)
    •	npm (Node Package Manager)

Steps to Install

    1.	Clone the repository:

        git clone https://github.com/tizhad/postsnap
cd postsnap

    2.	Install dependencies using npm:

        npm install

Running the Application

After installing the dependencies, you can start the application with the following command:

    ng serve

This will launch the development server at http://localhost:4200.

Testing

Unit Tests

The application uses Jasmine for testing. To run the unit tests, execute:

    ng test

This will run all the unit tests and show the results in the terminal.

Development

Code Style

    •	The project follows Angular style guide for consistency.
    •	Use Prettier and ESLint for automatic formatting and linting.
