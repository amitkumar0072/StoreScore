🏬 Store Rating Application

A full-stack role-based web application where users can rate stores, store owners can manage their stores, and admins can monitor the entire system.

Built as part of a Full-Stack Intern Coding Challenge.

🚀 Tech Stack
Frontend

React (Vite)

React Router DOM

Axios

Tailwind CSS

Backend

Node.js

Express.js

Prisma ORM

PostgreSQL

JWT Authentication

bcrypt

👥 User Roles
Role	Permissions
Admin	View all users, stores, ratings
Store Owner	Manage own stores & view ratings
User	Browse stores & submit ratings
🔐 Demo Credentials

Use these to log in immediately after seeding the database:

Admin
email: admin@demo.com
password: Admin@123

Store Owner
email: owner@demo.com
password: Owner@123

User
email: user@demo.com
password: User@123

📁 Project Structure
StoreRatingApp/
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.js
│   │   └── prisma.config.ts
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md

⚙️ Backend Setup
1️⃣ Install Dependencies
cd backend
npm install

2️⃣ Configure Environment Variables

Create .env inside backend/

DATABASE_URL="postgresql://postgres:your_password@localhost:5432/store_rating_db"
JWT_SECRET="supersecretkey"
PORT=5000

3️⃣ Run Prisma Migration
npx prisma migrate dev --name init

4️⃣ Seed Demo Data
npx prisma db seed


✔ Creates demo users, store owner, stores, and ratings

5️⃣ Start Backend Server
npm run dev


Server runs on:

http://localhost:5000

🎨 Frontend Setup
1️⃣ Install Dependencies
cd frontend
npm install

2️⃣ Start Frontend
npm run dev


Frontend runs on:

http://localhost:5173

🔁 Role-Based Routing Logic

After login:

Admin → /admin

Store Owner → /owner

User → /user

Role is:

Sent from backend during login

Stored in localStorage

Used by ProtectedRoute.jsx

🧪 API Testing (Postman)
Signup
POST /api/auth/signup

{
  "name": "Test User",
  "email": "test@demo.com",
  "password": "Test@123",
  "address": "Delhi"
}

Login
POST /api/auth/login

{
  "email": "admin@demo.com",
  "password": "Admin@123"
}

🛡 Authentication Flow

User logs in

JWT token generated

Token + role stored in localStorage

Protected routes validate:

Token exists

Role matches allowed role

📌 Features

✔ Role-based authentication
✔ Secure password hashing
✔ Prisma ORM with PostgreSQL
✔ Clean frontend architecture
✔ Minimal backend coupling
✔ Demo data seeding

🧠 Future Improvements

Pagination & search

Store analytics dashboard

Rating moderation

JWT refresh tokens

Admin role management

👨‍💻 Author

Amit Kumar
IIT Graduate | Full-Stack Developer
MERN | PostgreSQL | Prisma

📄 License

This project is for educational & evaluation purposes