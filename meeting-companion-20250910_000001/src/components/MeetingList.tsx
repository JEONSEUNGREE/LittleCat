import { Calendar, Clock, Users, ChevronRight, AlertCircle } from 'lucide-react';
import { useMeetingStore } from '../store/meetingStore';

interface MeetingListProps {
  onMeetingSelect: (meetingId: string) => void;
}

export default function MeetingList({ onMeetingSelect }: MeetingListProps) {
  const { meetings, getActionItemsByMeeting } = useMeetingStore();
  
  const sortedMeetings = [...meetings].sort((a, b) => {
    const dateA = new Date(a.date + ' ' + a.time);
    const dateB = new Date(b.date + ' ' + b.time);
    return dateB.getTime() - dateA.getTime();
  });
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-700';
      case 'ongoing':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (sortedMeetings.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="mx-auto text-gray-400 mb-4" size={64} />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No meetings scheduled</h3>
        <p className="text-gray-600">Create your first meeting to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">All Meetings</h2>
        <span className="text-sm text-gray-600">
          {sortedMeetings.length} meeting{sortedMeetings.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      {sortedMeetings.map((meeting) => {
        const actionItems = getActionItemsByMeeting(meeting.id);
        const pendingActions = actionItems.filter(item => !item.completed).length;
        
        return (
          <div
            key={meeting.id}
            onClick={() => onMeetingSelect(meeting.id)}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{meeting.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                    {meeting.status}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{formatDate(meeting.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{meeting.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{meeting.participants.length} participants</span>
                  </div>
                </div>
                
                {meeting.agenda.length > 0 && (
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Agenda:</span> {meeting.agenda.slice(0, 2).join(', ')}
                    {meeting.agenda.length > 2 && <span> +{meeting.agenda.length - 2} more</span>}
                  </div>
                )}
                
                {pendingActions > 0 && (
                  <div className="flex items-center gap-2 text-sm text-warning-600">
                    <AlertCircle size={16} />
                    <span>{pendingActions} pending action item{pendingActions !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
              
              <ChevronRight className="text-gray-400 mt-1" size={20} />
            </div>
          </div>
        );
      })}
    </div>
  );
}