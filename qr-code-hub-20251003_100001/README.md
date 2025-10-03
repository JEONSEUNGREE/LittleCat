# QR Code Hub

A comprehensive QR code management application for creating, organizing, and tracking QR codes.

## Features

- **QR Code Generation**: Create QR codes for URLs, text, WiFi, email, and phone numbers
- **Custom Styling**: Customize QR code colors to match your brand
- **History Management**: Track all your created QR codes with search and filter
- **Analytics**: Monitor scan counts and performance metrics
- **Mobile-First Design**: Fully responsive interface optimized for mobile devices

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **QR Generation**: qrcode library

## Getting Started

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
src/
├── components/
│   ├── QRGenerator.tsx    # QR code creation component
│   ├── QRHistory.tsx      # History and management view
│   └── QRStats.tsx        # Analytics dashboard
├── store/
│   └── useQRStore.ts      # Zustand state management
├── App.tsx                # Main application component
└── main.tsx              # Application entry point
```

## Usage

1. **Create QR Code**: Select type, enter content, customize color, and save
2. **Manage History**: Search, filter, and manage your QR code collection
3. **View Analytics**: Monitor performance and track top performers

---

Created: 2025-10-03