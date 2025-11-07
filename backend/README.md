# Virtual Lab Assistant - Backend

## Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Install dependencies:
```bash
npm install
```

3. Update `.env` file with your MongoDB URI

4. Seed initial data:
```bash
node seed.js
```

5. Start server:
```bash
npm run dev
```

## API Endpoints

### Auth
- POST `/api/auth/signup` - Register student
- POST `/api/auth/login` - Student login
- POST `/api/auth/admin/login` - Admin login

### Labs
- GET `/api/labs` - Get all labs
- GET `/api/labs/:id` - Get lab by ID
- POST `/api/labs` - Create lab (admin)
- PUT `/api/labs/:id` - Update lab (admin)
- DELETE `/api/labs/:id` - Delete lab (admin)

### Reports
- POST `/api/reports` - Submit report
- GET `/api/reports/teacher/:code` - Get reports by teacher code
- GET `/api/reports` - Get all reports

### Users
- GET `/api/users` - Get all users
- GET `/api/users/last-teacher-code` - Get last used teacher code

## Default Admin
- Email: admin@vla.com
- Password: admin123
