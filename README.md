# Note Taking Application

A web application for creating and managing notes using Node.js, Express.js, Sequelize (MySQL), Redis, and Docker.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Introduction

This project is a "Note Taking" application that allows users to create, retrieve, update, and delete notes. It is built using modern JavaScript technologies, including Node.js, Express.js, Sequelize (MySQL), Redis for caching, and Docker for containerization.

## Features

- User registration and authentication
- Create, retrieve, update, and delete notes
- Utilizes Sequelize ORM for MySQL interactions
- Redis caching for improved performance
- Dockerized application for easy deployment

## Getting Started

### Prerequisites

- Node.js (version 18)
- MySQL database
- Redis server
- Docker (optional)

### Installation

1. Clone this repository:

   ```sh
   git clone https://github.com/mirimadahmed/notes-api.git
   ```

2. Install dependencies:

   ```sh
   cd notes-api
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file based on `.env.sample` and configure database and Redis connection settings.

4. Run migrations:
   ```sh
   npm run migrate
   ```

## Usage

1. Start the server:

   ```sh
   npm run start
   ```

2. Access the API at: `http://localhost:3000`

## API Endpoints

- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Authenticate a user and get an authentication token.
- **POST /api/notes**: Create a new note.
- **GET /api/notes**: Retrieve all notes for the authenticated user.
- **GET /api/notes/:noteId**: Retrieve a specific note.
- **PUT /api/notes/:noteId**: Update a note.
- **DELETE /api/notes/:noteId**: Delete a note.

Postman API Docs Export JSON is in the root directory.