# Meeting Companion

A smart meeting management app for organizing meetings, tracking action items, and improving team productivity.

## Features

- **Meeting Management**: Schedule and organize meetings with participants, agenda, and notes
- **Action Items Tracking**: Create and track action items with assignees and due dates
- **Real-time Status**: Track meeting status (upcoming, ongoing, completed)
- **Responsive Design**: Mobile-first design that works on all devices
- **Clean UI**: Modern, intuitive interface with Tailwind CSS

## Tech Stack

- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
meeting-companion/
├── src/
│   ├── components/       # React components
│   │   ├── MeetingList.tsx
│   │   ├── MeetingForm.tsx
│   │   ├── MeetingDetail.tsx
│   │   └── ActionItemsPanel.tsx
│   ├── store/           # State management
│   │   └── meetingStore.ts
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

## Key Features

### Meeting Scheduling
- Create meetings with title, date, time, and duration
- Add multiple participants
- Define agenda items
- Add pre-meeting notes

### Action Item Management
- Create action items during meetings
- Assign to participants
- Set due dates
- Track completion status

### Meeting Workflow
- Upcoming meetings dashboard
- Start/end meeting controls
- Real-time status updates
- Meeting history

## Usage

1. Click "New Meeting" to schedule a meeting
2. Fill in meeting details, participants, and agenda
3. During the meeting, add action items and notes
4. Track action items completion after the meeting
5. Review meeting history and pending actions

Created: 2025-09-10