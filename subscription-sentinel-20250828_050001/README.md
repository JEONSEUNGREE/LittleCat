# 🛡️ Subscription Sentinel

A modern, feature-rich subscription management application built with Vite, React, TypeScript, and Tailwind CSS.

## ✨ Features

### 📊 Dashboard Overview
- **Total Spending Analysis**: View monthly and yearly subscription costs
- **Active Subscription Count**: Track all your active subscriptions
- **Upcoming Payments**: Get notified about payments due in the next 30 days
- **Category Breakdown**: See spending distribution across different categories

### 🏷️ Subscription Management
- **Add/Edit/Delete**: Complete CRUD operations for subscriptions
- **Multiple Billing Cycles**: Support for weekly, monthly, and yearly billing
- **Category Organization**: 8 built-in categories (Entertainment, Productivity, Utilities, Health, Education, Business, Lifestyle, Other)
- **Status Management**: Activate/deactivate subscriptions without losing data

### 🔍 Smart Filtering & Search
- **Search Functionality**: Find subscriptions by name or description
- **Category Filtering**: Filter by specific subscription categories
- **View Modes**: Switch between grid and list views
- **Real-time Updates**: Instant filtering and search results

### 🔔 Reminder System
- **Customizable Reminders**: Set reminders 1, 3, 7, or 14 days before payment
- **Payment Status Indicators**: Visual cues for overdue, upcoming, and future payments
- **Color-coded Alerts**: Red for overdue, orange for due soon, green for future payments

### 🎨 Beautiful Design
- **Mobile-First Responsive**: Works perfectly on all device sizes
- **Modern Glass Morphism UI**: Beautiful backdrop blur effects and gradients
- **Smooth Animations**: Floating elements and hover effects
- **Customizable Colors**: Set custom color themes for each subscription
- **Dark/Light Theme Support**: Built-in theme system (expandable)

### 💾 Data Persistence
- **Local Storage**: All data saved locally in your browser
- **State Management**: React Context for global state management
- **Real-time Calculations**: Automatic insights and spending calculations

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup

1. **Clone or download** this project to your local machine

2. **Navigate** to the project directory:
   ```bash
   cd subscription-sentinel-20250828_050001
   ```

3. **Run the setup script** (recommended):
   ```bash
   ./setup.sh
   ```
   
   Or manually:
   ```bash
   npm install
   npm run dev
   ```

4. **Open your browser** and visit: `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation header
│   ├── Dashboard.tsx    # Main dashboard view
│   ├── SubscriptionCard.tsx  # Individual subscription cards
│   └── AddSubscription.tsx   # Add/Edit subscription form
├── context/             # React Context for state management
│   └── SubscriptionContext.tsx
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles with Tailwind CSS
```

## 🎯 How to Use

### Adding Your First Subscription

1. Click the **+ button** (floating action button) or **Add** in the header
2. Fill in the subscription details:
   - **Service Name**: Netflix, Spotify, etc.
   - **Cost**: Monthly/yearly price
   - **Billing Cycle**: How often you're charged
   - **Next Payment**: When is your next payment due
   - **Category**: Choose from 8 categories
   - **Reminders**: Set how many days before you want to be reminded

### Managing Subscriptions

- **Toggle Active/Inactive**: Click the power button to pause tracking without deleting
- **Set Reminders**: Click the bell icon to cycle through reminder options (1, 3, 7 days)
- **Visit Website**: Click the external link icon to go to the service website
- **Delete**: Click the trash icon twice to confirm deletion

### Dashboard Features

- **Search**: Use the search bar to find specific subscriptions
- **Filter by Category**: Use the dropdown to show only specific categories
- **Change View**: Switch between grid and list views
- **View Insights**: See total spending, upcoming payments, and category breakdowns

## 🔧 Customization

### Adding New Categories
Edit the `SubscriptionCategory` type in `src/types.ts`:

```typescript
export type SubscriptionCategory = 
  | 'entertainment'
  | 'productivity'
  | 'your-new-category';
```

### Changing Color Themes
Modify the color palette in `tailwind.config.js` or add new preset colors in the AddSubscription component.

### Extending Billing Cycles
Add new billing cycles in the AddSubscription component's `billingCycles` array.

## 🔮 Future Enhancements

- **Export/Import**: CSV/JSON data export and import functionality
- **Advanced Analytics**: Spending trends, year-over-year comparisons
- **Budget Alerts**: Set monthly spending limits with alerts
- **Multi-Currency**: Support for different currencies
- **Cloud Sync**: Sync data across devices
- **Subscription Recommendations**: AI-powered subscription optimization

## 🎨 Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for beautiful, consistent icons
- **Date Handling**: date-fns for robust date manipulation
- **State Management**: React Context API
- **Local Storage**: Browser localStorage for data persistence

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues, feature requests, and pull requests to improve this application!

---

**Happy subscription tracking!** 🎉