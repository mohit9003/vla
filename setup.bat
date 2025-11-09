@echo off
echo ========================================
echo Virtual Lab Assistant - Setup Script
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js is installed.
echo.

echo Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend dependencies installation failed!
    pause
    exit /b 1
)
echo Frontend dependencies installed successfully.
echo.

echo Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend dependencies installation failed!
    cd ..
    pause
    exit /b 1
)
cd ..
echo Backend dependencies installed successfully.
echo.

echo ========================================
echo Setup completed successfully!
echo ========================================
echo.
echo Next steps:
echo 1. Configure backend/.env file with your MongoDB URI and Gemini API key
echo 2. Run start.bat to launch the application
echo.
pause
