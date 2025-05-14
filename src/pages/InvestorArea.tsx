import React, { useState } from 'react';
import { Bell, MessageSquare, Calendar, Users, MessageCircle, Send } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { notifications, comments, currentUser, users } from '../data/mockData';
import { format } from 'date-fns';

const InvestorArea: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [message, setMessage] = useState('');
  
  const unreadNotifications = notifications.filter(n => !n.read);
  const recentComments = comments.slice(0, 5);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;
    // In a real app, this would send the message
    setMessage('');
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader 
        title="Investor Area"
        description="Connect with other investors, participate in discussions, and stay updated."
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="sm:hidden">
              <select
                id="tabs"
                className="block w-full rounded-md border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="discussions">Discussions</option>
                <option value="notifications">Notifications</option>
                <option value="calendar">Events Calendar</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-neutral-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('discussions')}
                    className={`${
                      activeTab === 'discussions'
                        ? 'border-primary-600 text-primary-700'
                        : 'border-transparent text-neutral-600 hover:text-neutral-700 hover:border-neutral-300'
                    } flex items-center whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Discussions
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`${
                      activeTab === 'notifications'
                        ? 'border-primary-600 text-primary-700'
                        : 'border-transparent text-neutral-600 hover:text-neutral-700 hover:border-neutral-300'
                    } flex items-center whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
                  >
                    <Bell className="mr-2 h-5 w-5" />
                    Notifications
                    {unreadNotifications.length > 0 && (
                      <span className="ml-2 bg-primary-100 text-primary-800 py-0.5 px-2 rounded-full text-xs">
                        {unreadNotifications.length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('calendar')}
                    className={`${
                      activeTab === 'calendar'
                        ? 'border-primary-600 text-primary-700'
                        : 'border-transparent text-neutral-600 hover:text-neutral-700 hover:border-neutral-300'
                    } flex items-center whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Events Calendar
                  </button>
                </nav>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in">
            {activeTab === 'discussions' && (
              <div className="bg-white rounded-lg border border-neutral-200 shadow-sm">
                <div className="p-6 border-b border-neutral-200">
                  <h2 className="text-lg font-medium">Project Discussions</h2>
                  <p className="text-sm text-neutral-500 mt-1">
                    Share your thoughts and ask questions about the projects you've invested in.
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    {recentComments.map((comment) => (
                      <div key={comment.id} className="flex space-x-4">
                        <Avatar
                          src={comment.userAvatar}
                          alt={comment.userName}
                          size="md"
                        />
                        <div className="flex-1">
                          <div className="bg-neutral-50 rounded-lg px-4 py-3">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="text-sm font-medium text-neutral-900">{comment.userName}</h4>
                              <span className="text-xs text-neutral-500">
                                {format(new Date(comment.date), 'MMM d, yyyy • h:mm a')}
                              </span>
                            </div>
                            <p className="text-sm text-neutral-700">{comment.content}</p>
                          </div>
                          <div className="mt-2 flex items-center space-x-4 text-xs">
                            <button className="text-neutral-500 hover:text-neutral-700 flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 border-t border-neutral-200">
                  <form onSubmit={handleSendMessage}>
                    <div className="flex items-start space-x-4">
                      <Avatar
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        size="md"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="border border-neutral-300 rounded-lg shadow-sm overflow-hidden focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500">
                          <textarea
                            rows={3}
                            name="comment"
                            id="comment"
                            className="block w-full resize-none border-0 py-3 px-4 focus:ring-0 sm:text-sm"
                            placeholder="Start a discussion or ask a question..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          ></textarea>
                          <div className="py-2 px-3 bg-neutral-50 flex justify-end">
                            <Button
                              type="submit"
                              size="sm"
                              disabled={!message.trim()}
                              icon={<Send className="h-4 w-4" />}
                            >
                              Post
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg border border-neutral-200 shadow-sm">
                <div className="p-6 border-b border-neutral-200">
                  <h2 className="text-lg font-medium">Notifications</h2>
                  <p className="text-sm text-neutral-500 mt-1">
                    Stay updated with important project announcements and updates.
                  </p>
                </div>
                
                <div>
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center">
                      <p className="text-neutral-500">You have no notifications.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-neutral-200">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`px-6 py-4 hover:bg-neutral-50 ${
                            !notification.read ? 'bg-primary-50' : ''
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`h-2 w-2 rounded-full ${getNotificationTypeColor(notification.type)}`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-neutral-900">{notification.title}</p>
                              <p className="text-sm text-neutral-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-neutral-500 mt-1">
                                {format(new Date(notification.date), 'MMM d, yyyy • h:mm a')}
                              </p>
                            </div>
                            {!notification.read && (
                              <Badge variant="primary" size="sm">New</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'calendar' && (
              <div className="bg-white rounded-lg border border-neutral-200 shadow-sm">
                <div className="p-6 border-b border-neutral-200">
                  <h2 className="text-lg font-medium">Upcoming Events</h2>
                  <p className="text-sm text-neutral-500 mt-1">
                    Calendar of upcoming investor meetings, webinars, and project milestone events.
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">Quarterly Investor Meeting</h3>
                          <p className="text-sm text-neutral-600 mt-1">
                            Performance review and Q&A for all current investment projects.
                          </p>
                          <div className="mt-2 flex items-center text-sm text-neutral-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            April 28, 2024 • 2:00 PM EST
                          </div>
                        </div>
                        <Badge variant="secondary">Upcoming</Badge>
                      </div>
                      <div className="mt-4">
                        <Button size="sm" variant="outline">
                          Add to Calendar
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">Green Energy Fund Webinar</h3>
                          <p className="text-sm text-neutral-600 mt-1">
                            Deep dive into the renewable energy market and our portfolio strategy.
                          </p>
                          <div className="mt-2 flex items-center text-sm text-neutral-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            May 10, 2024 • 1:00 PM EST
                          </div>
                        </div>
                        <Badge variant="secondary">Upcoming</Badge>
                      </div>
                      <div className="mt-4">
                        <Button size="sm" variant="outline">
                          Add to Calendar
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">Oceanview Residences Site Visit</h3>
                          <p className="text-sm text-neutral-600 mt-1">
                            In-person tour of the construction progress (limited capacity).
                          </p>
                          <div className="mt-2 flex items-center text-sm text-neutral-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            May 22, 2024 • 10:00 AM EST
                          </div>
                        </div>
                        <Badge variant="secondary">Upcoming</Badge>
                      </div>
                      <div className="mt-4">
                        <Button size="sm" variant="outline">
                          Add to Calendar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 text-primary-600 mr-2" />
                Active Investors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center space-x-3">
                    <Avatar 
                      src={user.avatar} 
                      alt={user.name}
                      size="md"
                    />
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-neutral-500">{user.role === 'admin' ? 'Administrator' : 'Investor'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                View All Members
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Investor Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#" 
                    className="flex items-center text-primary-700 hover:text-primary-900 text-sm font-medium"
                  >
                    <FileIcon className="mr-2 h-4 w-4" />
                    Investment Strategy Guide
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="flex items-center text-primary-700 hover:text-primary-900 text-sm font-medium"
                  >
                    <FileIcon className="mr-2 h-4 w-4" />
                    Tax Information & Forms
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="flex items-center text-primary-700 hover:text-primary-900 text-sm font-medium"
                  >
                    <FileIcon className="mr-2 h-4 w-4" />
                    Quarterly Investment Newsletter
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="flex items-center text-primary-700 hover:text-primary-900 text-sm font-medium"
                  >
                    <FileIcon className="mr-2 h-4 w-4" />
                    Market Analysis Report
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="flex items-center text-primary-700 hover:text-primary-900 text-sm font-medium"
                  >
                    <FileIcon className="mr-2 h-4 w-4" />
                    Frequently Asked Questions
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const getNotificationTypeColor = (type: string): string => {
  switch (type) {
    case 'success':
      return 'bg-success-500';
    case 'warning':
      return 'bg-warning-500';
    case 'error':
      return 'bg-error-500';
    default:
      return 'bg-primary-500';
  }
};

const FileIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
    </svg>
  );
};

export default InvestorArea;