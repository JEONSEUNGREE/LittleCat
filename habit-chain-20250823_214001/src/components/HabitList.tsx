import React from 'react';
import { motion } from 'framer-motion';
import { useHabitStore } from '../store/habitStore';
import HabitItem from './HabitItem';

const HabitList: React.FC = () => {
  const { getHabitsWithStats } = useHabitStore();
  const habits = getHabitsWithStats();

  if (habits.length === 0) {
    return null; // Empty state is handled in App.tsx
  }

  return (
    <div className="p-4 space-y-3">
      {habits.map((habit, index) => (
        <motion.div
          key={habit.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <HabitItem habit={habit} />
        </motion.div>
      ))}
    </div>
  );
};

export default HabitList;