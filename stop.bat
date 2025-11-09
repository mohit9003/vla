@echo off
echo ========================================
echo Virtual Lab Assistant - Stopping...
echo ========================================
echo.

echo Stopping all Node.js processes...
taskkill /F /IM node.exe >nul 2>&1

echo.
echo ========================================
echo All servers stopped!
echo ========================================
echo.
pause
