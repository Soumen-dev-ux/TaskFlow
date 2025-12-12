
📝 TaskFlow — Student Task Manager

TaskFlow is a clean, smart, and user-friendly Task Management Web Application built using the MERN Stack (MongoDB, Express, React, Node.js).
It allows users to efficiently organize daily tasks through an intuitive and responsive interface.

This project showcases complete end-to-end full-stack development, perfect for academic submission and real-world learning.

🚀 Project Overview

TaskFlow helps users keep track of tasks with features like adding, editing, completing, deleting, filtering, and sorting.
It follows MVC architecture, handles CRUD operations, and uses REST APIs for communication.

🧠 Features
✅ Core Features

Add new tasks (Title, Description, Priority, Due Date)

Edit tasks

Mark tasks as Complete / Incomplete

Delete tasks

Filter tasks: All / Pending / Completed

Sort tasks by Priority or Due Date

Responsive UI for mobile & desktop

MongoDB database for persistent storage

REST API built with Express

⭐ Optional Features (if included)

User Authentication (Signup/Login with JWT)

Search tasks

Drag-and-drop task ordering

Overdue alerts

Modal-based editing UI

🛠️ Tech Stack
Frontend

React (Vite)

Axios

CSS / Tailwind

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

dotenv

CORS

Tools & Deployment

Vercel → Frontend (TaskFlow)

Render / Railway → Backend API


📡 API Endpoints — TaskFlow API
Base URL: /api/tasks
Method	Endpoint	Description
POST	/api/tasks	Create a new task
GET	/api/tasks	Fetch all tasks
GET	/api/tasks/:id	Fetch a single task
PUT	/api/tasks/:id	Update the task
DELETE	/api/tasks/:id	Delete the task
If Authentication Implemented
Method	Endpoint	Description
POST	/api/auth/signup	Register user
POST	/api/auth/login	Login & get JWT
📌 Installation & Setup Guide
1. Clone Repository
git clone https://github.com/your-username/TaskFlow.git
cd TaskFlow

2. Backend Setup
cd backend
npm install


Add .env file:

MONGO_URI=your_mongodb_connection_string
PORT=5000


Start server:

npm run dev

3. Frontend Setup
cd frontend
npm install
npm run dev


If backend is deployed, update API base URL inside:

src/api/tasksApi.js

🌐 Deployment
Frontend (TaskFlow on Vercel)

Connect GitHub repo

Build command → npm run build

Output → dist

Backend (Render / Railway)

Add environment variables

Deploy

Copy live API URL



📚 Learning Outcomes

While building TaskFlow, I learned:

Full MERN stack development

API design and CRUD operations

React state management

MongoDB schema design

Handling async functions

Deployment on Vercel/Render

Debugging and code optimization

🏁 Conclusion

TaskFlow is a complete full-stack project demonstrating real-world development skills.
It meets all academic requirements while showcasing professional coding, clean UI, and organized architecture.
