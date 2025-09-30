import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  Activity, 
  BarChart3, 
  Settings as SettingsIcon,
  Menu,
  X,
  Bell,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import PostureMonitor from './components/PostureMonitor';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import OnboardingFlow from './components/OnboardingFlow';
import { clsx } from 'clsx';

type TabType = 'monitor' | 'dashboard' | 'settings';

function AppContent() {
  const { hasCompletedOnboarding, alerts, dismissAlert } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('monitor');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

  const unseenAlerts = alerts.filter(a => !a.seen);

  useEffect(() => {
    // Close mobile menu when tab changes
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  if (!hasCompletedOnboarding) {
    return <OnboardingFlow />;
  }

  const tabs = [
    {
      id: 'monitor' as const,
      label: 'Monitor',
      icon: <Activity className="w-5 h-5" />,
      component: <PostureMonitor />,
    },
    {
      id: 'dashboard' as const,
      label: 'Dashboard',
      icon: <BarChart3 className="w-5 h-5" />,
      component: <Dashboard />,
    },
    {
      id: 'settings' as const,
      label: 'Settings',
      icon: <SettingsIcon className="w-5 h-5" />,
      component: <Settings />,
    },
  ];

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning-600" />;
      case 'danger':
        return <AlertTriangle className="w-5 h-5 text-danger-600" />;
      default:
        return <Info className="w-5 h-5 text-primary-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                PC
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Posture Coach Pro</h1>
                <p className="text-xs text-gray-600 hidden sm:block">Better posture, better health</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors',
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              {/* Alerts Button */}
              <button
                onClick={() => setShowAlerts(!showAlerts)}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-6 h-6" />
                {unseenAlerts.length > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger-500 rounded-full animate-pulse" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-200 bg-white overflow-hidden"
            >
              <nav className="px-4 py-3 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={clsx(
                      'flex items-center space-x-3 w-full px-3 py-2 rounded-lg font-medium transition-colors',
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    )}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Alerts Dropdown */}
      <AnimatePresence>
        {showAlerts && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setShowAlerts(false)}
            />
            
            {/* Alerts Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-4 top-20 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                {unseenAlerts.length > 0 && (
                  <p className="text-xs text-gray-600 mt-1">
                    {unseenAlerts.length} new notification{unseenAlerts.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {alerts.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {alerts.slice(0, 10).map((alert) => (
                      <div
                        key={alert.id}
                        className={clsx(
                          'p-4 hover:bg-gray-50 transition-colors cursor-pointer',
                          !alert.seen && 'bg-primary-50/50'
                        )}
                        onClick={() => {
                          dismissAlert(alert.id);
                          setShowAlerts(false);
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          {getAlertIcon(alert.severity)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">{alert.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatTimeAgo(alert.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">No notifications yet</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {tabs.find(tab => tab.id === activeTab)?.component}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;