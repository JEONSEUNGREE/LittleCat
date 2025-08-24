import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Target, 
  Heart, 
  Book, 
  Dumbbell, 
  Coffee, 
  Moon, 
  Sun, 
  Droplet, 
  Zap, 
  Star,
  Leaf,
  Brain
} from 'lucide-react';
import { useHabitStore } from '../store/habitStore';
import { HabitFormData, HabitColor, HabitIcon } from '../types/habit';

interface AddHabitModalProps {
  onClose: () => void;
}

const iconOptions: { value: HabitIcon; icon: React.ElementType; label: string }[] = [
  { value: 'target', icon: Target, label: 'Target' },
  { value: 'heart', icon: Heart, label: 'Health' },
  { value: 'book', icon: Book, label: 'Reading' },
  { value: 'dumbbell', icon: Dumbbell, label: 'Exercise' },
  { value: 'coffee', icon: Coffee, label: 'Morning' },
  { value: 'moon', icon: Moon, label: 'Evening' },
  { value: 'sun', icon: Sun, label: 'Energy' },
  { value: 'droplet', icon: Droplet, label: 'Hydration' },
  { value: 'zap', icon: Zap, label: 'Power' },
  { value: 'star', icon: Star, label: 'Goals' },
  { value: 'leaf', icon: Leaf, label: 'Nature' },
  { value: 'brain', icon: Brain, label: 'Mental' },
];

const colorOptions: { value: HabitColor; bg: string; name: string }[] = [
  { value: 'blue', bg: 'bg-blue-500', name: 'Blue' },
  { value: 'green', bg: 'bg-green-500', name: 'Green' },
  { value: 'purple', bg: 'bg-purple-500', name: 'Purple' },
  { value: 'red', bg: 'bg-red-500', name: 'Red' },
  { value: 'yellow', bg: 'bg-yellow-500', name: 'Yellow' },
  { value: 'pink', bg: 'bg-pink-500', name: 'Pink' },
  { value: 'indigo', bg: 'bg-indigo-500', name: 'Indigo' },
  { value: 'gray', bg: 'bg-gray-500', name: 'Gray' },
];

const AddHabitModal: React.FC<AddHabitModalProps> = ({ onClose }) => {
  const { addHabit, updateHabit, editingHabit } = useHabitStore();
  const isEditing = !!editingHabit;

  const [formData, setFormData] = useState<HabitFormData>({
    name: '',
    description: '',
    color: 'blue',
    icon: 'target',
    targetDays: undefined,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof HabitFormData, string>>>({});

  // Populate form when editing
  useEffect(() => {
    if (editingHabit) {
      setFormData({
        name: editingHabit.name,
        description: editingHabit.description || '',
        color: editingHabit.color,
        icon: editingHabit.icon,
        targetDays: editingHabit.targetDays,
      });
    }
  }, [editingHabit]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof HabitFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Habit name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Habit name must be at least 2 characters';
    }

    if (formData.targetDays !== undefined && (formData.targetDays < 1 || formData.targetDays > 365)) {
      newErrors.targetDays = 'Target days must be between 1 and 365';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const trimmedData = {
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim(),
    };

    if (isEditing && editingHabit) {
      updateHabit(editingHabit.id, trimmedData);
    } else {
      addHabit(trimmedData);
    }
  };

  const handleChange = (field: keyof HabitFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const selectedIconOption = iconOptions.find(opt => opt.value === formData.icon);
  const SelectedIcon = selectedIconOption?.icon || Target;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 modal-backdrop"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-md bg-white rounded-t-3xl modal-content safe-area-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? 'Edit Habit' : 'Create New Habit'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Preview */}
          <div className="flex items-center justify-center">
            <div className={`w-16 h-16 rounded-full ${colorOptions.find(c => c.value === formData.color)?.bg} flex items-center justify-center shadow-lg`}>
              <SelectedIcon className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Habit Name *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g., Drink 8 glasses of water"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              maxLength={50}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description (optional)
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Add a note about why this habit matters to you..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
              maxLength={200}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/200 characters
            </p>
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose an Icon
            </label>
            <div className="grid grid-cols-6 gap-2">
              {iconOptions.map((option) => {
                const IconComponent = option.icon;
                const isSelected = formData.icon === option.value;
                
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange('icon', option.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    title={option.label}
                  >
                    <IconComponent className={`w-5 h-5 ${
                      isSelected ? 'text-primary-600' : 'text-gray-600'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose a Color
            </label>
            <div className="grid grid-cols-8 gap-2">
              {colorOptions.map((option) => {
                const isSelected = formData.color === option.value;
                
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange('color', option.value)}
                    className={`w-10 h-10 rounded-full ${option.bg} border-4 transition-all ${
                      isSelected
                        ? 'border-gray-800 scale-110'
                        : 'border-white hover:scale-105'
                    } shadow-sm hover:shadow-md`}
                    title={option.name}
                  />
                );
              })}
            </div>
          </div>

          {/* Target Days (Optional) */}
          <div>
            <label htmlFor="targetDays" className="block text-sm font-medium text-gray-700 mb-2">
              Target Days (optional)
            </label>
            <input
              id="targetDays"
              type="number"
              value={formData.targetDays || ''}
              onChange={(e) => handleChange('targetDays', e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="e.g., 30 days"
              min="1"
              max="365"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.targetDays ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.targetDays && (
              <p className="text-red-500 text-xs mt-1">{errors.targetDays}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Set a target to track progress towards a specific goal
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.name.trim()}
              className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isEditing ? 'Update Habit' : 'Create Habit'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddHabitModal;