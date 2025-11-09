@echo off
echo Preparing for Render deployment...

echo.
echo 1. Checking if git is initialized...
if not exist .git (
    echo Initializing git repository...
    git init
    git add .
    git commit -m "Initial commit for deployment"
) else (
    echo Git repository exists. Adding changes...
    git add .
    git commit -m "Prepare for Render deployment"
)

echo.
echo 2. Deployment files created:
echo    - render.yaml (Render configuration)
echo    - DEPLOYMENT.md (Deployment guide)
echo    - Updated API configuration for production

echo.
echo Next steps:
echo 1. Push your code to GitHub
echo 2. Follow the DEPLOYMENT.md guide
echo 3. Create services on Render dashboard

echo.
echo To push to GitHub (if not done):
echo git remote add origin https://github.com/yourusername/vla.git
echo git branch -M main
echo git push -u origin main

pause



