# Multi-Tenant Task Management System

A full-stack MERN application that supports multi-tenant architecture with role-based access control (RBAC), JWT authentication, and audit logging.

---

## 🧠 Features

### 🔐 Authentication
- User Registration & Login
- JWT-based authentication
- Secure password hashing (bcrypt)

### 🏢 Multi-Tenant System
- Multiple organizations
- Users belong to specific organizations
- Data isolation per organization

### 👥 Role-Based Access Control (RBAC)
- Admin and Member roles
- Admin:
  - Full access to all tasks
- Member:
  - Access only their own tasks

### 📋 Task Management
- Create tasks
- View tasks
- Update tasks
- Delete tasks
- Task status tracking:
  - Pending
  - In Progress
  - Completed

### 🧾 Audit Logs
- Tracks:
  - Task creation
  - Updates
  - Deletion
- Stores:
  - Action
  - User
  - Timestamp

### 🌐 Frontend (React)
- Login & Register UI
- Protected routes
- Dashboard
- Task CRUD interface
- Context-based authentication

---

## 🛠 Tech Stack

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- bcrypt (Password hashing)

### Frontend:
- React.js
- Axios
- React Router
- Context API

---

## 📁 Project Structure
Multi Tenant Management System/
├── Backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ └── context/

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
git clone https://github.com/YOUR_USERNAME/multi-tenant-task-manager.git

cd multi-tenant-task-manager

---

### 2️⃣ Backend Setup
cd Backend
npm install
npm run dev
Create `.env` file:
  MONGO_URI=your_mongodb_url
  JWT_SECRET=your_secret_key

---

### 3️⃣ Frontend Setup
cd frontend
npm install
npm start

---

## 🔑 API Highlights

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

### Tasks
- GET `/api/tasks`
- POST `/api/tasks`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

### Organization
- POST `/api/org/create`

---

## 🎯 Key Concepts Implemented

- Multi-tenancy
- RBAC (Role-Based Access Control)
- JWT Authentication
- REST API Design
- Context API (React)
- Protected Routes
- Audit Logging

---

## 🚀 Future Improvements

- Invite system for organizations
- UI enhancements (Tailwind / Material UI)
- Deployment (Vercel + Render)
- Notifications system

---

## 👨‍💻 Author

Dhanuja R

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!