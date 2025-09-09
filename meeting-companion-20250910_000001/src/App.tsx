import { useState } from 'react';
import { Calendar, Clock, Users, CheckSquare, Plus, Menu, X } from 'lucide-react';
import MeetingList from './components/MeetingList';
import MeetingForm from './components/MeetingForm';
import ActionItemsPanel from './components/ActionItemsPanel';
import MeetingDetail from './components/MeetingDetail';
import { useMeetingStore } from './store/meetingStore';

type ViewMode = 'meetings' | 'actions' | 'detail';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('meetings');
  const [showNewMeeting, setShowNewMeeting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);
  
  const { meetings, actionItems, getUpcomingMeetings, getPendingActionItems } = useMeetingStore();
  
  const upcomingCount = getUpcomingMeetings().length;
  const pendingCount = getPendingActionItems().length;
  
  const handleMeetingSelect = (meetingId: string) => {
    setSelectedMeetingId(meetingId);
    setViewMode('detail');
    setMobileMenuOpen(false);
  };
  
  const handleCloseDetail = () => {
    setSelectedMeetingId(null);
    setViewMode('meetings');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex items-center gap-2">
                <Calendar className="text-primary-600" size={28} />
                <h1 className="text-xl font-bold text-gray-900">Meeting Companion</h1>
              </div>
            </div>
            
            <button
              onClick={() => setShowNewMeeting(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">New Meeting</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar Navigation */}
        <aside className={`${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative z-30 w-64 h-full bg-white border-r border-gray-200 transition-transform duration-300`}>
          <nav className="p-4 space-y-2">
            <button
              onClick={() => {
                setViewMode('meetings');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                viewMode === 'meetings'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar size={20} />
              <span className="font-medium">Meetings</span>
              {upcomingCount > 0 && (
                <span className="ml-auto bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                  {upcomingCount}
                </span>
              )}
            </button>
            
            <button
              onClick={() => {
                setViewMode('actions');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                viewMode === 'actions'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <CheckSquare size={20} />
              <span className="font-medium">Action Items</span>
              {pendingCount > 0 && (
                <span className="ml-auto bg-warning-100 text-warning-700 text-xs px-2 py-1 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
          </nav>
          
          {/* Quick Stats */}
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>Total Meetings</span>
                </div>
                <span className="font-semibold text-gray-900">{meetings.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users size={16} />
                  <span>Active Items</span>
                </div>
                <span className="font-semibold text-gray-900">{actionItems.length}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile menu */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {viewMode === 'meetings' && (
              <MeetingList onMeetingSelect={handleMeetingSelect} />
            )}
            {viewMode === 'actions' && <ActionItemsPanel />}
            {viewMode === 'detail' && selectedMeetingId && (
              <MeetingDetail 
                meetingId={selectedMeetingId} 
                onClose={handleCloseDetail}
              />
            )}
          </div>
        </main>
      </div>

      {/* New Meeting Modal */}
      {showNewMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-in">
            <MeetingForm onClose={() => setShowNewMeeting(false)} />
          </div>
        </div>
      )}
    </div>
  );
}