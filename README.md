# Preplix.ai

AI-powered interview preparation that turns a resume and target job description into personalized interview questions, skill-gap insights, and a preparation roadmap.

> Early-stage project; features and deployment setup may change.

## Features

- User registration and login with JWT sessions
- Protected dashboard, profile, and report pages
- PDF resume upload and text extraction
- Gemini-generated match score, interview questions, skill-gap analysis, and preparation roadmap
- Saved interview report history
- Light, dark, and system theme options

## Tech stack

- **Frontend:** React, Vite, React Router, Axios, Sass
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **AI:** Google Gemini API

## Architecture

```mermaid
flowchart LR
    Browser[React frontend] --> API[Express API]
    API --> MongoDB[(MongoDB)]
    API --> Gemini[Gemini API]
    API --> PDF[PDF text extraction]