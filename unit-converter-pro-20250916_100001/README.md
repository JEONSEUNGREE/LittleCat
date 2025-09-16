# Unit Converter Pro

A modern, mobile-first unit converter application built with React, TypeScript, and Vite.

## Features

- 🔄 Convert between multiple unit categories (Length, Weight, Temperature, Volume, Area, Speed, Time, Data)
- ⭐ Favorite your frequently used units
- 📱 Responsive mobile-first design
- 🕒 Conversion history tracking
- 🌙 Dark mode support
- ⚡ Real-time conversion
- 🎨 Clean and intuitive UI

## Tech Stack

- **Frontend Framework:** React 18+ with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Icons:** Lucide React

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. Select a unit category from the grid
2. Choose your source and target units
3. Enter a value to convert
4. View instant conversion results
5. Access your conversion history
6. Star frequently used units for quick access

## Project Structure

```
src/
├── components/      # React components
│   ├── CategorySelector.tsx
│   ├── ConverterPanel.tsx
│   └── HistoryPanel.tsx
├── data/           # Conversion data and logic
│   └── conversionData.ts
├── store/          # Zustand state management
│   └── useConverterStore.ts
├── App.tsx         # Main app component
├── main.tsx        # Entry point
└── index.css       # Global styles
```

## License

MIT