import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, X, Search, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { currentUser, notifications } from '../../data/mockData';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  
  const unreadNotifications = notifications.filter(notification => !notification.read);
  
  return (
    <nav className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary-700 font-bold text-xl">InvestorDash</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <NavLink to="/" active={location.pathname === '/'}>Dashboard</NavLink>
              <NavLink to="/projects" active={location.pathname.startsWith('/projects')}>Projects</NavLink>
              <NavLink to="/documents" active={location.pathname === '/documents'}>Documents</NavLink>
              <NavLink to="/investor-area" active={location.pathname === '/investor-area'}>Investor Area</NavLink>
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
            <div className="relative mx-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                className="bg-neutral-50 h-10 pl-10 pr-4 rounded-md border border-neutral-300 focus:ring-primary-500 focus:border-primary-500 block w-full text-sm"
                type="search"
                placeholder="Search..."
              />
            </div>
            
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (showUserMenu) setShowUserMenu(false);
                }}
                className="p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 relative"
              >
                <Bell className="h-6 w-6" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-error-500 ring-2 ring-white" />
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-neutral-200 animate-fade-in">
                  <div className="px-4 py-2 border-b border-neutral-200">
                    <h3 className="text-sm font-medium text-neutral-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-neutral-500">
                        No notifications
                      </div>
                    ) : (
                      notifications.slice(0, 5).map((notification) => (
                        <div key={notification.id} className={`px-4 py-3 hover:bg-neutral-50 ${!notification.read ? 'bg-primary-50' : ''}`}>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                              <div className={`h-2 w-2 rounded-full ${getNotificationTypeColor(notification.type)}`}></div>
                            </div>
                            <div className="ml-3 w-0 flex-1">
                              <p className="text-sm font-medium text-neutral-900">{notification.title}</p>
                              <p className="mt-1 text-sm text-neutral-600">{notification.message}</p>
                              <p className="mt-1 text-xs text-neutral-500">{formatNotificationDate(notification.date)}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="border-t border-neutral-200 px-4 py-2">
                    <Link to="/notifications" className="block text-sm text-center text-primary-600 hover:text-primary-800">
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative ml-3">
              <div>
                <button 
                  onClick={() => {
                    setShowUserMenu(!showUserMenu);
                    if (showNotifications) setShowNotifications(false);
                  }}
                  className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <Avatar 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    size="sm"
                  />
                  <span className="ml-2 text-neutral-700 font-medium hidden lg:block">{currentUser.name}</span>
                  <ChevronDown className="ml-1 h-4 w-4 text-neutral-400" />
                </button>
              </div>
              
              {showUserMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 animate-fade-in">
                  <div className="py-1">
                    <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                      <User className="mr-3 h-4 w-4 text-neutral-500" />
                      Profile
                    </Link>
                    <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                      <Settings className="mr-3 h-4 w-4 text-neutral-500" />
                      Settings
                    </Link>
                    <button className="w-full text-left flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                      <LogOut className="mr-3 h-4 w-4 text-neutral-500" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center md:hidden">
            <button 
              className="p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 relative"
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (isOpen) setIsOpen(false);
              }}
            >
              <Bell className="h-6 w-6" />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-error-500 ring-2 ring-white" />
              )}
            </button>
            
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                if (showNotifications) setShowNotifications(false);
              }}
              className="ml-2 p-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden animate-slide-down">
          <div className="pt-2 pb-4 space-y-1">
            <MobileNavLink to="/" active={location.pathname === '/'}>Dashboard</MobileNavLink>
            <MobileNavLink to="/projects" active={location.pathname.startsWith('/projects')}>Projects</MobileNavLink>
            <MobileNavLink to="/documents" active={location.pathname === '/documents'}>Documents</MobileNavLink>
            <MobileNavLink to="/investor-area" active={location.pathname === '/investor-area'}>Investor Area</MobileNavLink>
          </div>
          <div className="border-t border-neutral-200 pt-4 pb-3">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <Avatar 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-neutral-800">{currentUser.name}</div>
                <div className="text-sm font-medium text-neutral-500">{currentUser.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link 
                to="/profile" 
                className="block px-4 py-2 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              >
                Profile
              </Link>
              <Link 
                to="/settings" 
                className="block px-4 py-2 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              >
                Settings
              </Link>
              <button 
                className="block w-full text-left px-4 py-2 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showNotifications && (
        <div className="md:hidden px-4 pb-4 animate-slide-down">
          <div className="bg-white rounded-md shadow-lg overflow-hidden border border-neutral-200">
            <div className="px-4 py-2 border-b border-neutral-200">
              <h3 className="text-sm font-medium text-neutral-900">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-3 text-sm text-neutral-500">
                  No notifications
                </div>
              ) : (
                notifications.slice(0, 5).map((notification) => (
                  <div key={notification.id} className={`px-4 py-3 hover:bg-neutral-50 ${!notification.read ? 'bg-primary-50' : ''}`}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <div className={`h-2 w-2 rounded-full ${getNotificationTypeColor(notification.type)}`}></div>
                      </div>
                      <div className="ml-3 w-0 flex-1">
                        <p className="text-sm font-medium text-neutral-900">{notification.title}</p>
                        <p className="mt-1 text-sm text-neutral-600">{notification.message}</p>
                        <p className="mt-1 text-xs text-neutral-500">{formatNotificationDate(notification.date)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="border-t border-neutral-200 px-4 py-2">
              <Link to="/notifications" className="block text-sm text-center text-primary-600 hover:text-primary-800">
                View all notifications
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  return (
    <Link
      to={to}
      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
        active
          ? 'border-primary-600 text-primary-900'
          : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  return (
    <Link
      to={to}
      className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
        active
          ? 'border-primary-600 text-primary-900 bg-primary-50'
          : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 hover:border-neutral-300'
      }`}
    >
      {children}
    </Link>
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

const formatNotificationDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.round(diffMs / 60000);
  const diffHours = Math.round(diffMs / 3600000);
  const diffDays = Math.round(diffMs / 86400000);
  
  if (diffMins < 60) {
    return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export default Navbar;