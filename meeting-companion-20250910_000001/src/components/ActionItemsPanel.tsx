import { CheckSquare, Square, Calendar, User, ChevronRight, AlertCircle } from 'lucide-react';
import { useMeetingStore } from '../store/meetingStore';

export default function ActionItemsPanel() {
  const { actionItems, toggleActionItem, getMeetingById } = useMeetingStore();
  
  const sortedItems = [...actionItems].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return a.dueDate ? -1 : 1;
  });
  
  const pendingItems = sortedItems.filter(item => !item.completed);
  const completedItems = sortedItems.filter(item => item.completed);
  
  const getDueDateColor = (dueDate: string | undefined) => {
    if (!dueDate) return 'text-gray-600';
    
    const due = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = due.getTime() - today.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    
    if (days < 0) return 'text-red-600';
    if (days <= 1) return 'text-warning-600';
    if (days <= 3) return 'text-yellow-600';
    return 'text-gray-600';
  };
  
  const formatDueDate = (dateStr: string | undefined) => {
    if (!dateStr) return 'No due date';
    
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Due today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Due tomorrow';
    } else if (date < today) {
      return 'Overdue';
    } else {
      return `Due ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }
  };

  if (actionItems.length === 0) {
    return (
      <div className="text-center py-12">
        <CheckSquare className="mx-auto text-gray-400 mb-4" size={64} />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No action items yet</h3>
        <p className="text-gray-600">Action items will appear here as you add them to meetings</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Action Items</h2>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-600">
            {pendingItems.length} pending
          </span>
          <span className="text-gray-600">
            {completedItems.length} completed
          </span>
        </div>
      </div>
      
      {/* Pending Items */}
      {pendingItems.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
            <AlertCircle size={16} />
            PENDING ITEMS
          </h3>
          <div className="space-y-3">
            {pendingItems.map((item) => {
              const meeting = getMeetingById(item.meetingId);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleActionItem(item.id)}
                      className="mt-0.5 text-gray-400 hover:text-primary-600 transition-colors"
                    >
                      <Square size={20} />
                    </button>
                    
                    <div className="flex-1">
                      <p className="text-gray-900 mb-2">{item.text}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <User size={14} />
                          <span>{item.assignee || 'Unassigned'}</span>
                        </div>
                        
                        <div className={`flex items-center gap-1 ${getDueDateColor(item.dueDate)}`}>
                          <Calendar size={14} />
                          <span>{formatDueDate(item.dueDate)}</span>
                        </div>
                        
                        {meeting && (
                          <div className="flex items-center gap-1 text-gray-600">
                            <ChevronRight size={14} />
                            <span className="text-primary-600 hover:text-primary-700 cursor-pointer">
                              {meeting.title}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Completed Items */}
      {completedItems.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-3">COMPLETED</h3>
          <div className="space-y-3">
            {completedItems.map((item) => {
              const meeting = getMeetingById(item.meetingId);
              return (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg border border-gray-200 p-4 opacity-75"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleActionItem(item.id)}
                      className="mt-0.5 text-success-600"
                    >
                      <CheckSquare size={20} />
                    </button>
                    
                    <div className="flex-1">
                      <p className="text-gray-700 line-through mb-2">{item.text}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>{item.assignee || 'Unassigned'}</span>
                        </div>
                        
                        {meeting && (
                          <div className="flex items-center gap-1">
                            <ChevronRight size={14} />
                            <span>{meeting.title}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}