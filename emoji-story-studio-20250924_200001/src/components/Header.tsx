import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="text-primary" size={32} />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Emoji Story Studio
          </h1>
          <motion.span 
            className="text-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.span>
        </motion.div>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
          Create amazing stories with just emojis!
        </p>
      </div>
    </header>
  )
}