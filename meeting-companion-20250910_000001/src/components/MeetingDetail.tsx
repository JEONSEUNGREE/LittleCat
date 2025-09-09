import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Users, Edit2, Trash2, Plus, CheckSquare, Square, Save, X } from 'lucide-react';
import { useMeetingStore } from '../store/meetingStore';

interface MeetingDetailProps {
  meetingId: string;
  onClose: () => void;
}

export default function MeetingDetail({ meetingId, onClose }: MeetingDetailProps) {
  const { 
    getMeetingById, 
    updateMeeting, 
    deleteMeeting,
    getActionItemsByMeeting,
    addActionItem,
    toggleActionItem,
    deleteActionItem 
  } = useMeetingStore();
  
  const meeting = getMeetingById(meetingId);
  const actionItems = getActionItemsByMeeting(meetingId);
  
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState(meeting?.notes || '');
  const [newActionItem, setNewActionItem] = useState('');
  const [newAssignee, setNewAssignee] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  
  if (!meeting) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Meeting not found</p>
        <button
          onClick={onClose}
          className="mt-4 text-primary-600 hover:text-primary-700"
        >
          Go back
        </button>
      </div>
    );
  }
  
  const handleSaveNotes = () => {
    updateMeeting(meetingId, { notes });
    setIsEditingNotes(false);
  };
  
  const handleAddActionItem = () => {
    if (!newActionItem.trim()) return;
    
    addActionItem({
      text: newActionItem.trim(),
      assignee: newAssignee.trim(),
      dueDate: newDueDate || undefined,
      completed: false,
      meetingId
    });
    
    setNewActionItem('');
    setNewAssignee('');
    setNewDueDate('');
  };
  
  const handleDeleteMeeting = () => {
    if (window.confirm('Are you sure you want to delete this meeting? This action cannot be undone.')) {
      deleteMeeting(meetingId);
      onClose();
    }
  };
  
  const handleUpdateStatus = (status: 'upcoming' | 'ongoing' | 'completed') => {
    updateMeeting(meetingId, { status });
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

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back to meetings</span>
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{meeting.title}</h1>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(meeting.status)}`}>
                {meeting.status}
              </span>
              <div className="flex gap-2">
                {meeting.status === 'upcoming' && (
                  <button
                    onClick={() => handleUpdateStatus('ongoing')}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Start Meeting
                  </button>
                )}
                {meeting.status === 'ongoing' && (
                  <button
                    onClick={() => handleUpdateStatus('completed')}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    End Meeting
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <button
            onClick={handleDeleteMeeting}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
      
      {/* Meeting Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Meeting Details</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={18} />
            <span>{new Date(meeting.date).toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={18} />
            <span>{meeting.time} ({meeting.duration} min)</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Users size={18} />
            <span>{meeting.participants.length} participants</span>
          </div>
        </div>
        
        {/* Participants */}
        {meeting.participants.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Participants</h3>
            <div className="flex flex-wrap gap-2">
              {meeting.participants.map((participant, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {participant}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Agenda */}
        {meeting.agenda.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Agenda</h3>
            <ul className="space-y-1">
              {meeting.agenda.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-600">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Notes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Meeting Notes</h2>
          {!isEditingNotes && (
            <button
              onClick={() => setIsEditingNotes(true)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit2 size={18} />
            </button>
          )}
        </div>
        
        {isEditingNotes ? (
          <div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your meeting notes here..."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none"
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleSaveNotes}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Save size={18} />
                Save
              </button>
              <button
                onClick={() => {
                  setNotes(meeting.notes);
                  setIsEditingNotes(false);
                }}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 whitespace-pre-wrap">
            {meeting.notes || 'No notes added yet.'}
          </p>
        )}
      </div>
      
      {/* Action Items */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Action Items</h2>
        
        {/* Add new action item */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-3">
            <input
              type="text"
              value={newActionItem}
              onChange={(e) => setNewActionItem(e.target.value)}
              placeholder="Add a new action item..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
            
            <div className="flex gap-3">
              <input
                type="text"
                value={newAssignee}
                onChange={(e) => setNewAssignee(e.target.value)}
                placeholder="Assignee"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
              
              <input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
              
              <button
                onClick={handleAddActionItem}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Action items list */}
        {actionItems.length > 0 ? (
          <div className="space-y-2">
            {actionItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  item.completed ? 'bg-gray-50' : 'bg-white border border-gray-200'
                }`}
              >
                <button
                  onClick={() => toggleActionItem(item.id)}
                  className={`mt-0.5 ${
                    item.completed ? 'text-success-600' : 'text-gray-400 hover:text-primary-600'
                  } transition-colors`}
                >
                  {item.completed ? <CheckSquare size={20} /> : <Square size={20} />}
                </button>
                
                <div className="flex-1">
                  <p className={`${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {item.text}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                    {item.assignee && <span>Assigned to: {item.assignee}</span>}
                    {item.dueDate && <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>}
                  </div>
                </div>
                
                <button
                  onClick={() => deleteActionItem(item.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">No action items yet</p>
        )}
      </div>
    </div>
  );
}