# CRUD Code Shelf

A web application for storing, managing, and organizing code snippets.

## Architecture

This project implements a three-tier architecture:
- Frontend: React application
- Backend: Express Node.js server
- Database: PostgreSQL

## Setup

1. Install dependencies:
   cd backend && npm install
   cd ../frontend && npm install

2. Initialize the database using schema.sql:
   psql -U postgres -d code_shelf -f schema.sql

3. Run the backend:
   cd backend && node index.js

4. Run the frontend:
   cd frontend && npm start

## Features

- Create snippets specifying title, language, and the code content.
- Read snippets on the dashboard.
- Update snippets.
- Delete snippets.
