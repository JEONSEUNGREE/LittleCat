import { Wifi, User, Link, MessageSquare, Mail, Phone } from 'lucide-react'
import { useQRStore } from '../store/qrStore'

const QuickActions = () => {
  const { addToHistory } = useQRStore()

  const quickActions = [
    {
      icon: <Wifi className="w-5 h-5" />,
      label: 'WiFi',
      color: 'from-blue-500 to-cyan-500',
      action: () => {
        const qr = {
          id: Date.now().toString(),
          type: 'wifi' as const,
          content: 'WIFI:T:WPA;S:MyNetwork;P:password123;;',
          label: 'WiFi: MyNetwork',
          timestamp: Date.now()
        }
        addToHistory(qr)
      }
    },
    {
      icon: <Link className="w-5 h-5" />,
      label: 'URL',
      color: 'from-green-500 to-emerald-500',
      action: () => {
        const qr = {
          id: Date.now().toString(),
          type: 'url' as const,
          content: 'https://example.com',
          label: 'example.com',
          timestamp: Date.now()
        }
        addToHistory(qr)
      }
    },
    {
      icon: <User className="w-5 h-5" />,
      label: 'Contact',
      color: 'from-purple-500 to-pink-500',
      action: () => {
        const qr = {
          id: Date.now().toString(),
          type: 'contact' as const,
          content: 'MECARD:N:John Doe;TEL:+1234567890;EMAIL:john@example.com;;',
          label: 'Contact: John Doe',
          timestamp: Date.now()
        }
        addToHistory(qr)
      }
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: 'Text',
      color: 'from-orange-500 to-red-500',
      action: () => {
        const qr = {
          id: Date.now().toString(),
          type: 'text' as const,
          content: 'Hello, World!',
          label: 'Hello, World!',
          timestamp: Date.now()
        }
        addToHistory(qr)
      }
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      color: 'from-indigo-500 to-purple-500',
      action: () => {
        const qr = {
          id: Date.now().toString(),
          type: 'email' as const,
          content: 'mailto:hello@example.com?subject=Hello&body=Message',
          label: 'Email: hello@example.com',
          timestamp: Date.now()
        }
        addToHistory(qr)
      }
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      color: 'from-teal-500 to-green-500',
      action: () => {
        const qr = {
          id: Date.now().toString(),
          type: 'text' as const,
          content: 'tel:+1234567890',
          label: 'Phone: +1234567890',
          timestamp: Date.now()
        }
        addToHistory(qr)
      }
    }
  ]

  return (
    <div className="mb-6">
      <h2 className="text-white text-lg font-semibold mb-3">Quick Actions</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="group relative overflow-hidden rounded-xl p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
            <div className="flex flex-col items-center gap-2 relative z-10">
              <div className="text-white">
                {action.icon}
              </div>
              <span className="text-xs text-white/80 font-medium">{action.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions