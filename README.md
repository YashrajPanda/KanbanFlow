# KanbanFlow

KanbanFlow is a minimal, beautifully designed full-stack Kanban board application built with React, Spring Boot, and MongoDB. 
It features seamless drag-and-drop task management, a responsive Glassmorphism design, and a real-time dark/light mode toggle.

## Architecture

- **Frontend**: React (Vite), Tailwind CSS, Lucide React icons, and `@hello-pangea/dnd` for smooth drag-and-drop. deployed to Vercel.
- **Backend**: Java 17, Spring Boot, Spring Web REST APIs, deployed to Render.
- **Database**: MongoDB Atlas cluster storing Users, Boards, and Tasks.

## Key Features

- **Dynamic Task Management**: Drag and drop tasks between TODO, IN PROGRESS, and DONE columns, which map directly to backend MongoDB updates. 
- **Board Customization**: Create custom project boards, rename them on the fly, or permanently delete them.
- **Automated Seeding**: Contains an automatic `DataSeeder` logic on startup to generate a "Welcome Board" to get you up to speed immediately.
- **Responsive Theme**: A built-in Day/Night mode toggle that flips stunning, animated Tailwind background gradients.

## Quick Start (Local Development)

### 1. Requirements
Ensure you have the following installed locally:
- Java 17 JDK
- Node.js (v18+)
- Maven
- A valid MongoDB connection string

### 2. Backend Setup
1. Navigate to `kanbanflow-backend` directory.
2. Setup the `application.properties` with your MongoDB connection string:
   ```properties
   spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster.mongodb.net/kanbanflow?retryWrites=true&w=majority
   spring.data.mongodb.database=kanbanflow
   ```
3. Run `mvn spring-boot:run`. The backend server should start on `localhost:8080`.

### 3. Frontend Setup
1. Navigate to the `kanbanflow-frontend` directory.
2. Execute `npm install` to download node dependencies.
3. Configure the backend URL in a `.env` file (if testing deployed API) or just run locally, it falls back to `http://localhost:8080`.
4. Run `npm run dev` to start Vite. Open the printed localhost URL in your browser.

## Deployment Details

- **Frontend (Vercel)**: Automatically pushes and builds off the `main` branch. 
- **Backend (Render)**: Pulled and Dockerized directly from the `Dockerfile` in the `/kanbanflow-backend/` root repository. MongoDB variables injected securely using Render Environment Variables.

---
*Built tightly across modern web tech boundaries. Happy coding!*
