# KanbanFlow

KanbanFlow is a modern full-stack Kanban board application designed for simple and efficient task management.
It features a clean **Glassmorphism UI**, smooth **drag-and-drop task handling**, and a **dark/light theme toggle**.

The project demonstrates a **production-style cloud architecture** using React, Spring Boot, MongoDB, Docker, and modern deployment platforms.

---

# Live Demo

Frontend (Vercel)
https://kanban-flow.vercel.app

Backend API (Render)
https://kanbanflow-backend.onrender.com

---

# Architecture

The system follows a modern **three-tier architecture**:

User Browser
↓
Frontend (React + Vite) – deployed on Vercel
↓
Backend REST API (Spring Boot – Java 17) – deployed on Render
↓
MongoDB Atlas Cloud Database

---

# Tech Stack

## Frontend

* React (Vite)
* Tailwind CSS
* Lucide React Icons
* @hello-pangea/dnd (drag and drop)
* Axios / Fetch API

## Backend

* Java 17
* Spring Boot
* Spring Web REST APIs
* Spring Data MongoDB

## Database

* MongoDB Atlas

## Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Cloud Database)

## Containerization

* Docker (backend service)

---

# Key Features

## Drag and Drop Task Management

Tasks can be dragged between:

* TODO
* IN PROGRESS
* DONE

Each movement automatically updates the backend database.

---

## Dynamic Boards

Users can:

* Create boards
* Rename boards
* Delete boards
* Manage tasks per board

---

## Automatic Welcome Board

On startup, a **DataSeeder** creates a welcome board with sample tasks.

This helps users immediately understand how the system works.

---

## Dark / Light Mode

The UI includes a toggle that switches between:

* Light theme
* Dark theme

Using animated Tailwind gradient backgrounds.

---

# Project Structure

```
kanbanflow
│
├── kanbanflow-frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── vite.config.js
│
├── kanbanflow-backend
│   ├── src/main/java
│   ├── controller
│   ├── service
│   ├── repository
│   └── Dockerfile
│
└── README.md
```

---

# Local Development Setup

## Requirements

Install the following:

* Java 17
* Node.js (18+)
* Maven
* MongoDB Atlas account

---

# Backend Setup

Navigate to backend directory:

```
cd kanbanflow-backend
```

Configure MongoDB in:

```
application.properties
```

Example:

```
spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster.mongodb.net/kanbanflow
spring.data.mongodb.database=kanbanflow
```

Run the backend:

```
mvn spring-boot:run
```

Server starts at:

```
http://localhost:8080
```

---

# Frontend Setup

Navigate to frontend directory:

```
cd kanbanflow-frontend
```

Install dependencies:

```
npm install
```

Create `.env` file:

```
VITE_API_URL=http://localhost:8080
```

Start the development server:

```
npm run dev
```

Open the URL printed by Vite.

---

# Deployment

## Frontend Deployment (Vercel)

The frontend is deployed using Vercel.

Steps:

1. Push repository to GitHub
2. Import project in Vercel
3. Select **Vite** preset
4. Deploy from `main` branch

Environment Variable:

```
VITE_API_URL=https://kanbanflow-backend.onrender.com
```

---

## Backend Deployment (Render)

The backend is deployed using Render with Docker.

Steps:

1. Connect GitHub repository
2. Use the Dockerfile inside `/kanbanflow-backend`
3. Add environment variables

Example:

```
SPRING_DATA_MONGODB_URI=<mongodb atlas uri>
SPRING_DATA_MONGODB_DATABASE=kanbanflow
```

---

# Docker Containerization

Backend Dockerfile example:

```
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/kanbanflow.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
```

Render automatically builds and runs the container.

---

# API Overview

Example endpoints:

Get all boards

```
GET /api/boards
```

Create board

```
POST /api/boards
```

Update task status

```
PUT /api/tasks/{id}
```

Delete board

```
DELETE /api/boards/{id}
```

---

# Future Improvements

Possible enhancements:

* JWT authentication
* Multi-user collaboration
* WebSocket real-time updates
* Redis caching
* Notifications system

---

# Author

Yashraj Panda

Full-stack developer focused on modern cloud architecture and scalable systems.

---

# License

This project is open-source and available under the MIT License.
