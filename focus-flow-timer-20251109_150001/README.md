# Focus Flow Timer - 집중 흐름 타이머

Brain wave rhythm-based focus timer for enhanced productivity.

## Features

- 🧠 **Brain Wave Rhythms**: Choose from 4 different focus modes based on brain wave frequencies
  - Beta (14-30 Hz): Quick 25-minute focus bursts
  - Alpha (8-14 Hz): 45-minute balanced productivity sessions
  - Theta (4-8 Hz): 60-minute deep concentration periods
  - Gamma (30+ Hz): 90-minute peak performance sessions

- ⏱️ **Beautiful Timer Display**: Circular progress indicator with gradient colors
- 📊 **Focus Score Tracking**: Real-time focus score calculation based on session progress
- 📈 **Session Statistics**: Track your total sessions, average focus score, and total minutes
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 🎨 **Modern UI**: Glass-morphism effects and smooth animations

## Tech Stack

- **Frontend**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

1. Select your preferred brain wave rhythm (session type)
2. Click the play button to start the timer
3. Focus on your work while the timer runs
4. Track your progress with the circular timer and focus score
5. View your session history and statistics

## Project Structure

```
src/
├── components/          # React components
│   ├── TimerDisplay.tsx      # Main timer with circular progress
│   ├── SessionSelector.tsx   # Brain wave rhythm selector
│   └── SessionHistory.tsx    # Session stats and history
├── hooks/              # Custom React hooks
│   └── useTimer.ts           # Timer logic hook
├── stores/             # Zustand state management
│   └── useTimerStore.ts      # Timer state store
├── types/              # TypeScript type definitions
│   └── index.ts
├── styles/             # Global styles
│   └── index.css
├── App.tsx             # Main app component
└── main.tsx           # App entry point
```

## License

MIT

## Author

Generated with Claude Code - 2024
