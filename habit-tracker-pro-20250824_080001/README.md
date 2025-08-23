# Habit Tracker Pro

A mobile-first habit tracking application built with React, TypeScript, and Vite.

## Features
- ✅ Track daily, weekly, and monthly habits
- 📊 Visual progress tracking with 7-day history
- 🔥 Streak tracking and gamification
- 📱 Mobile-responsive design
- 💾 Local storage persistence

## Tech Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React

## Installation
```bash
npm install
```

## Development
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Core Components
1. **Header**: App navigation and add habit button
2. **StatsPanel**: Display habit statistics
3. **HabitList**: List of all habits
4. **HabitCard**: Individual habit with completion tracking
5. **AddHabitModal**: Form for creating new habits

## Project Structure
```
src/
├── components/       # React components
├── store/           # Zustand state management
├── types/           # TypeScript definitions
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles
```