# Multi-Tenant Task Management System

🚀 Features
- Multi-tenant architecture
- Role-Based Access Control (RBAC)
- JWT Authentication
- Task CRUD operations
- Audit Logging

🧠 Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose

🔐 Security
- Password hashing (bcrypt)
- JWT authentication
- Role-based authorization

📊 Functionality
- Admin and Member roles
- Members manage their own tasks
- Admin manages all tasks
- Audit logs track actions

⚙️ Setup

1. Clone repo
2. Install dependencies:
   - npm install
3. Create `.env`:
   - MONGO_URI=your_mongodb_uri
   - JWT_SECRET=your_secret
4. Run:
   - npm run dev