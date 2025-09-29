import React, { useState } from 'react';
import { Target, Plus, Trophy, Clock, AlertCircle } from 'lucide-react';
import useStore from '../store/useStore';
import { FinancialGoal } from '../types';

const GoalsTracker: React.FC = () => {
  const { financialGoals, addFinancialGoal, updateGoalProgress } = useStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '0',
    deadline: '',
    category: 'savings' as FinancialGoal['category'],
    priority: 'medium' as FinancialGoal['priority'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.targetAmount || !formData.deadline) return;

    addFinancialGoal({
      title: formData.title,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount || '0'),
      deadline: new Date(formData.deadline),
      category: formData.category,
      priority: formData.priority,
    });

    setFormData({
      title: '',
      targetAmount: '',
      currentAmount: '0',
      deadline: '',
      category: 'savings',
      priority: 'medium',
    });
    setShowAddForm(false);
  };

  const getProgressPercentage = (goal: FinancialGoal) => {
    return Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
  };

  const getDaysRemaining = (deadline: Date) => {
    const now = new Date();
    const target = new Date(deadline);
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      savings: '💰',
      investment: '📈',
      purchase: '🛒',
      emergency: '🚨',
    };
    return icons[category] || '🎯';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Target className="w-6 h-6 text-purple-600" />
          재무 목표
        </h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-lg transition-shadow"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">목표 추가</span>
        </button>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-4 mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">목표 이름</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="예: 비상금 마련"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">목표 금액</label>
              <input
                type="number"
                value={formData.targetAmount}
                onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">현재 금액</label>
              <input
                type="number"
                value={formData.currentAmount}
                onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">목표 날짜</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as FinancialGoal['category'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="savings">저축</option>
                <option value="investment">투자</option>
                <option value="purchase">구매</option>
                <option value="emergency">비상금</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">우선순위</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as FinancialGoal['priority'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="high">높음</option>
                <option value="medium">중간</option>
                <option value="low">낮음</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              추가
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              취소
            </button>
          </div>
        </form>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {financialGoals.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>아직 설정된 목표가 없습니다</p>
            <p className="text-sm mt-1">재무 목표를 추가해보세요</p>
          </div>
        ) : (
          financialGoals.map((goal) => {
            const progress = getProgressPercentage(goal);
            const daysLeft = getDaysRemaining(goal.deadline);
            const isCompleted = progress >= 100;
            const isUrgent = daysLeft <= 30 && !isCompleted;

            return (
              <div
                key={goal.id}
                className={`rounded-xl p-4 border-2 ${
                  isCompleted
                    ? 'bg-green-50 border-green-300'
                    : isUrgent
                    ? 'bg-red-50 border-red-300'
                    : 'bg-gray-50 border-gray-200'
                } transition-all hover:shadow-md`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getCategoryIcon(goal.category)}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getPriorityColor(goal.priority)}`}>
                          {goal.priority === 'high' ? '높음' : goal.priority === 'medium' ? '중간' : '낮음'}
                        </span>
                        {isCompleted ? (
                          <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                            <Trophy className="w-3 h-3" />
                            달성!
                          </span>
                        ) : (
                          <span className={`text-xs ${isUrgent ? 'text-red-600' : 'text-gray-500'} flex items-center gap-1`}>
                            <Clock className="w-3 h-3" />
                            {daysLeft > 0 ? `${daysLeft}일 남음` : '기한 초과'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {isUrgent && !isCompleted && (
                    <AlertCircle className="w-5 h-5 text-red-500 animate-pulse" />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      ₩{goal.currentAmount.toLocaleString()} / ₩{goal.targetAmount.toLocaleString()}
                    </span>
                    <span className="font-semibold text-gray-900">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted
                          ? 'bg-gradient-to-r from-green-400 to-green-600'
                          : progress > 70
                          ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                          : progress > 30
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                          : 'bg-gradient-to-r from-red-400 to-red-600'
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  {!isCompleted && (
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                      <span>남은 금액: ₩{(goal.targetAmount - goal.currentAmount).toLocaleString()}</span>
                      {daysLeft > 0 && (
                        <span>일일 목표: ₩{Math.ceil((goal.targetAmount - goal.currentAmount) / daysLeft).toLocaleString()}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GoalsTracker;