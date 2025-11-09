# Virtual Lab Assistant (VLA)

A comprehensive virtual laboratory platform for students and teachers featuring interactive experiments, AI assistance, progress tracking, and resource management.

## Features

- 🧪 **Virtual Labs**: Physics, Chemistry, Computer Science, and Electrical labs with 40+ experiments
- 🤖 **AI Assistant**: Real-time help with experiments using Gemini API
- 💻 **Code Editor**: Online C compiler for Computer Science experiments
- 📊 **Progress Tracking**: Monitor experiment completion and deadlines
- 📚 **Study Resources**: Access lab manuals, videos, and reference materials
- 🔔 **Announcements**: Real-time notifications for students
- 👨🏫 **Admin Panel**: Manage experiments, resources, and announcements

## Prerequisites

Before running this application, ensure you have the following installed:

### Required Software

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **MongoDB** (Community Edition)
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

3. **Git** (optional, for cloning)
   - Download from: https://git-scm.com/downloads

### API Keys Required

- **Google Gemini API Key**: Get from https://makersuite.google.com/app/apikey

## Installation Guide

### Method 1: Automated Setup (Recommended)

1. **Clone or download the repository**
   ```bash
   git clone https://github.com/mohit9003/vla.git
   cd vla
   ```

2. **Run the setup script**
   - Double-click `setup.bat` (Windows)
   - This will install all dependencies automatically

3. **Configure environment variables**
   - Open `backend/.env` file
   - Add your MongoDB URI and Gemini API key:
     ```
     MONGODB_URI=your_mongodb_connection_string
     GEMINI_API_KEY=your_gemini_api_key
     PORT=5000
     ```

4. **Run the application**
   - Double-click `start.bat` (Windows)
   - This will start both backend and frontend servers

### Method 2: Manual Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohit9003/vla.git
   cd vla
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Configure environment variables**
   - Create `backend/.env` file:
     ```
     MONGODB_URI=mongodb://localhost:27017/vla
     GEMINI_API_KEY=your_gemini_api_key_here
     PORT=5000
     ```

5. **Seed the database (optional)**
   ```bash
   cd backend
   node seedExperiments.js
   cd ..
   ```

6. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

7. **Start the frontend (in a new terminal)**
   ```bash
   npm run dev
   ```

## Running the Application

### Using Batch Files (Windows)

- **setup.bat**: Installs all dependencies
- **start.bat**: Starts both backend and frontend servers
- **stop.bat**: Stops all running servers

### Manual Commands

**Backend Server:**
```bash
cd backend
npm start
```
Backend runs on: http://localhost:5000

**Frontend Server:**
```bash
npm run dev
```
Frontend runs on: http://localhost:5173

## Default Login Credentials

**Student Account:**
- Email: student@example.com
- Password: student123

**Teacher Account:**
- Email: teacher@example.com
- Password: teacher123

**Admin Account:**
- Email: admin@example.com
- Password: admin123

## Project Structure

```
vla/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── server.js        # Express server
│   └── .env            # Environment variables
├── src/
│   ├── components/      # React components
│   ├── pages/          # Page components
│   ├── data/           # Static data files
│   └── AppRoutes.jsx   # Route definitions
├── setup.bat           # Automated setup script
├── start.bat           # Start application script
└── README.md           # This file
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB service is running
- Check connection string in `.env` file
- For MongoDB Atlas, whitelist your IP address

### Port Already in Use
- Backend (5000): Change `PORT` in `backend/.env`
- Frontend (5173): Change port in `vite.config.js`

### API Key Issues
- Verify Gemini API key is correct
- Check API quota limits
- Ensure `.env` file is in `backend/` directory

### Dependencies Installation Failed
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall
- Check Node.js version compatibility

## Technologies Used

**Frontend:**
- React + Vite
- Tailwind CSS
- Framer Motion
- Lucide Icons

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Google Gemini AI
- Piston API (Code execution)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub or contact the development team.
