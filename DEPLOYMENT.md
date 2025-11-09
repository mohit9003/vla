# Deployment Guide - Render (Single Service)

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

## Step 2: Deploy Full Stack App on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: vla-app
   - **Root Directory**: (leave empty)
   - **Environment**: Node
   - **Build Command**: npm run build:full
   - **Start Command**: npm start
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `NODE_ENV`: production
6. Deploy

## Step 3: Seed Database (Optional)
1. In Render service, go to "Shell"
2. Run: `cd backend && node seed.js`

## URL
- Full App: https://vla-app.onrender.com

## Default Login Credentials
- Student: student@example.com / student123
- Teacher: teacher@example.com / teacher123  
- Admin: admin@example.com / admin123

## Troubleshooting
- Check Render logs for deployment errors
- Verify environment variables are set correctly
- Ensure MongoDB Atlas allows connections from 0.0.0.0/0
- Check API endpoints are accessible