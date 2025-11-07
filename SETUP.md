# Virtual Lab Assistant - Setup Guide

## Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

## Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Update `.env` file with your MongoDB URI

4. Seed database with initial data:
```bash
node seed.js
```

5. Start backend server:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

## Frontend Setup

1. Navigate to root folder:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Start frontend:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## Default Credentials

**Admin Login:**
- Email: admin@vla.com
- Password: admin123

**Student:** Create account via signup page

## Features Implemented

✅ User authentication (students & admin)
✅ Lab management (CRUD operations)
✅ Report submission with teacher codes
✅ Admin dashboard with analytics
✅ MongoDB integration
✅ JWT authentication
✅ Password hashing with bcrypt

## API Endpoints

See `backend/README.md` for complete API documentation
