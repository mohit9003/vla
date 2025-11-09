# Deployment Guide - Render

## Prerequisites
1. GitHub account with your code pushed
2. Render account (free tier available)
3. MongoDB Atlas account (for database)
4. Google Gemini API key

## Step 1: Setup MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IP addresses (0.0.0.0/0) for Render
5. Get your connection string

## Step 2: Deploy Backend on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: vla-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: npm install
   - **Start Command**: npm start
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `NODE_ENV`: production
   - `PORT`: 10000
6. Deploy

## Step 3: Deploy Frontend on Render
1. Click "New +" → "Static Site"
2. Connect same GitHub repository
3. Configure:
   - **Name**: vla-frontend
   - **Root Directory**: (leave empty)
   - **Build Command**: npm install && npm run build
   - **Publish Directory**: dist
4. Add Environment Variable:
   - `VITE_API_URL`: https://your-backend-url.onrender.com/api
5. Deploy

## Step 4: Update CORS Settings
After frontend deployment, update backend environment variables:
- Add your frontend URL to CORS origins in server.js

## Step 5: Seed Database (Optional)
1. In Render backend service, go to "Shell"
2. Run: `node seed.js`

## URLs
- Backend: https://vla-backend.onrender.com
- Frontend: https://vla-frontend.onrender.com

## Default Login Credentials
- Student: student@example.com / student123
- Teacher: teacher@example.com / teacher123  
- Admin: admin@example.com / admin123

## Troubleshooting
- Check Render logs for deployment errors
- Verify environment variables are set correctly
- Ensure MongoDB Atlas allows connections from 0.0.0.0/0
- Check API endpoints are accessible