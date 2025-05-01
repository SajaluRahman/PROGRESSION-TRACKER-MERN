# Progress Tracker Backend

The backend for Progress Tracker is a Node.js application built with Express.js and MongoDB. It provides RESTful APIs for user authentication, project management, and task management. The backend supports user signup/login, project CRUD operations, and task CRUD operations with JWT-based authentication.

## Features
- **User Authentication**: Register and login users with `email`, `password`, `name`, and `country`. Uses JWT for session management.
- **Project Management**: Create, read, update, and delete projects.
- **Task Management**: Create, read, update, and delete tasks with `title`, `description`, `status` (To Do, In Progress, Done), `createdAt`, and `completedAt`.
- **Secure APIs**: Protected routes using JWT middleware.
- **MongoDB Integration**: Stores user, project, and task data with Mongoose schemas.

## Tech Stack
- **Node.js**: Runtime environment.
- **Express.js**: Web framework for API routes.
- **MongoDB**: NoSQL database with Mongoose ORM.
- **JWT**: JSON Web Tokens for authentication.
- **bcryptjs**: Password hashing.
- **dotenv**: Environment variable management.
- **Nodemon**: Development hot reloading.


## Prerequisites
- **Node.js** (v16 or higher): [Download](https://nodejs.org/)
- **MongoDB**:
  - Local: Install MongoDB Community Edition ([Guide](https://www.mongodb.com/docs/manual/installation/)) or use MongoDB Compass.
  - Cloud: Create a free MongoDB Atlas account ([Guide](https://www.mongodb.com/cloud/atlas)).
- **Git**: For cloning the repository ([Download](https://git-scm.com/)).
- **Postman** (optional): For testing API endpoints ([Download](https://www.postman.com/downloads/)).

## Setup Instructions

### 1. Clone the Repository
- **Clone the Progress Tracker repository to your local machine**: git clone (the code for cloning)

- **Navigate to the Backend directory**: cd (file name)

- **Install Dependencies**: npm install 

- **Create a .env file in Backend/**: PORT=5000,
  MONGO_URL=mongodb+srv://sajalu:RztcJjyQBpNw6Qmj@cluster0.9kluoc0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0,
  JWT_SECRET=hJ4%&Q9jS!f78sdj28fJHFjS*&8dJs8D,

- **Run the Backend**: npm run dev
