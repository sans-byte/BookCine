# BookCine Project

BookCine is a web application for booking movie tickets. It is built using Vite, Node.js, Tailwind CSS, MongoDB, Express, and React.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Configuration](#configuration)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Introduction

BookCine is a platform that allows users to book movie tickets, with features for both normal users and theater owners.
It provides full fledged simulation of any ticket booking app out there.
The application is built with Vite, Node.js, Tailwind CSS, MongoDB, Express, and React.

## Features

- User Authentication (Signup/Login)
- Landing Page with Movie Listings
- Theater Owner Dashboard for Adding Theaters and Shows
- Admin Approval for Theater Owners
- Addition of movies by admin
- User Booking and Ticketing System

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js and npm](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- ...

## Getting Started

### Clone the Repository
### Install Dependencies
```bash
  cd bookcine
  npm install
```
### Configuration

Before running the application, you need to set up your configuration variables. Create a `.env` file in the root of your project and add the following information:

```env
# Specify the port on which the application will run
PORT=5050

# MongoDB Connection URL
MONGO_URL=mongodb+srv://your-username:your-password@your-cluster-url/your-database

# JWT Secret Token for authentication
JWT_SECRET=your-secret-token
Ensure to replace placeholders like your-username, your-password, your-cluster-url, and your-database with your actual MongoDB credentials and database information.

The .env file contains sensitive information and should not be shared or committed to version control systems.
```

##  Running the application
### Development Mode
  - Running the server
    ```bash
    nodemon server.js
    ```
  - Running the client
    ```bash
    npm run dev
    ```

## Project structure
### User Roles
Admin: Approves theater owner requests, Manage CRUD of movies and theaters.
Theater Owner: Adds theaters and shows to the platform, Add shows to the theater after getting approval from the admin.
Normal User: Books movie tickets.

## Screenshots
![localhost_5173_](https://github.com/sans-byte/BookCine/assets/52746480/c6a46a88-6089-4933-944d-57aa7c1aa7f3)
![Screenshot (91)](https://github.com/sans-byte/BookCine/assets/52746480/3fd86556-efc3-47f8-aa3a-7240db61e010)
![Screenshot (92)](https://github.com/sans-byte/BookCine/assets/52746480/0266c21a-f1d8-451a-b38c-ca3ce5351777)
![Screenshot (93)](https://github.com/sans-byte/BookCine/assets/52746480/b3bdb370-234e-4f5e-bb16-770ac53e8ab6)
![Screenshot (94)](https://github.com/sans-byte/BookCine/assets/52746480/07286699-577e-4d45-b04f-0c5d1730961c)
![Screenshot (95)](https://github.com/sans-byte/BookCine/assets/52746480/bd8a50c5-0bae-4d0b-be61-bebd84f05fb6)
![Screenshot (96)](https://github.com/sans-byte/BookCine/assets/52746480/9ead26a2-b273-43d7-bdef-8ee9c345a867)
![Screenshot (97)](https://github.com/sans-byte/BookCine/assets/52746480/88ccf01a-a708-4a9e-80eb-9cea0d1db919)
![Screenshot (98)](https://github.com/sans-byte/BookCine/assets/52746480/f6b53e20-ccd7-4d0b-8b69-926754d5161e)
![Screenshot (99)](https://github.com/sans-byte/BookCine/assets/52746480/3cce9e54-1478-49d1-ad2f-82f4d66473ae)
![Screenshot (100)](https://github.com/sans-byte/BookCine/assets/52746480/e0623363-e2c1-4781-8342-d1363c846f2c)
![Screenshot (101)](https://github.com/sans-byte/BookCine/assets/52746480/11736f6e-0324-4f0e-97d2-497a80a5ee29)
![Screenshot (102)](https://github.com/sans-byte/BookCine/assets/52746480/aa253f54-ef97-4845-85d5-35b80579ab2b)
![Screenshot (103)](https://github.com/sans-byte/BookCine/assets/52746480/06370e81-a002-4dc5-a055-e76967a663dd)
![Screenshot (89)](https://github.com/sans-byte/BookCine/assets/52746480/ac33a5af-24d3-4326-a0bf-44e6d974586d)
![Screenshot (90)](https://github.com/sans-byte/BookCine/assets/52746480/f70d7077-7358-4927-8027-5ee25e1419c9)


## Contributing
If you wish to contribute, please fork the repository and create a pull request. We welcome issues and feature requests!

## License
This project is licensed under the MIT License - see the LICENSE file for details.
