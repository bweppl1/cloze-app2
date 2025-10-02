# Cloze App

A language learning application built with React and Express.js.

## Features

- Interactive cloze (fill-in-the-blank) exercises
- Multiple difficulty categories
- User progress tracking with XP and levels
- Sound feedback for correct/incorrect answers
- Responsive design

## Tech Stack

- **Frontend**: React, Vite, React Router
- **Backend**: Express.js, Node.js
- **Database**: MongoDB with Mongoose
- **Deployment**: Vercel

## Local Development

1. Install dependencies:
   ```bash
   npm run install-all
   ```

2. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your MongoDB connection string:
     ```
     MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/cloze-encounters
     PORT=4000
     ```

3. Start development servers:
   ```bash
   npm run dev
   ```

## Deployment on Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set the following environment variables in Vercel dashboard:
   - `MONGO_URI`: Your MongoDB connection string
   - `NODE_ENV`: production
4. Deploy!

The app will be automatically deployed when you push changes to your main branch.

## Project Structure

```
├── frontend/          # React frontend
├── backend/           # Express.js backend
├── vercel.json        # Vercel configuration
└── package.json       # Root package configuration
```
