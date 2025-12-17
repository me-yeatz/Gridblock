'use client';

import { useState } from 'react';
import { 
  LayoutGrid, 
  FileText, 
  Table, 
  Settings, 
  Search, 
  Plus, 
  Users, 
  BarChart3, 
  Calendar,
  HelpCircle,
  LifeBuoy,
  LogOut,
  ChevronDown,
  MoreHorizontal
} from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isExpanded, setIsExpanded] = useState(true);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'database', label: 'Database', icon: Table },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'team', label: 'Team', icon: Users },
  ];

  return (
    <div className="flex">
      {/* Collapsible Sidebar */}
      <div 
        className={`bg-zinc-900/80 backdrop-blur-md border-r border-zinc-800 h-screen sticky top-0 flex-col transition-all duration-300 ${
          isExpanded ? 'w-64' : 'w-16'
        } hidden md:flex`}
      >
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            {isExpanded && (
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                GridBlock
              </h1>
            )}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-auto p-1 rounded-md hover:bg-zinc-800 text-zinc-400"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder={isExpanded ? "Search..." : ""} 
              className="w-full pl-9 pr-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="p-2 flex-1 overflow-y-auto">
          <nav>
            <ul className="space-y-1">
              <li>
                <button className="w-full flex items-center gap-3 p-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 transition-colors">
                  <Plus className="w-5 h-5" />
                  {isExpanded && <span>New Workspace</span>}
                </button>
              </li>
            </ul>

            <div className="mt-6">
              <h3 className={`text-xs font-semibold text-zinc-500 uppercase tracking-wider px-2.5 ${!isExpanded && 'hidden'}`}>
                Workspaces
              </h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <button className={`w-full flex items-center gap-3 p-2.5 rounded-lg ${
                    activeItem === 'dashboard' ? 'bg-purple-900/30 text-purple-400' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                  } transition-colors`}>
                    <div className="w-8 h-8 rounded-md bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                      <LayoutGrid className="w-4 h-4 text-white" />
                    </div>
                    {isExpanded && <span>Project Alpha</span>}
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 p-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 transition-colors">
                    <div className="w-8 h-8 rounded-md bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    {isExpanded && <span>Documentation</span>}
                  </button>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <h3 className={`text-xs font-semibold text-zinc-500 uppercase tracking-wider px-2.5 ${!isExpanded && 'hidden'}`}>
                Navigation
              </h3>
              <ul className="mt-2 space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveItem(item.id)}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-lg ${
                          activeItem === item.id 
                            ? 'bg-purple-900/30 text-purple-400' 
                            : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                        } transition-colors`}
                      >
                        <Icon className="w-5 h-5" />
                        {isExpanded && <span>{item.label}</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>

        <div className="p-3 border-t border-zinc-800">
          <div className="flex items-center gap-3 mb-4 p-2.5 rounded-lg bg-zinc-800/30">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            {isExpanded && (
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-200">User Name</p>
                <p className="text-xs text-zinc-400">user@example.com</p>
              </div>
            )}
          </div>

          <nav>
            <ul className="space-y-1">
              <li>
                <button className="w-full flex items-center gap-3 p-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 transition-colors">
                  <Settings className="w-5 h-5" />
                  {isExpanded && <span>Settings</span>}
                </button>
              </li>
              <li>
                <button className="w-full flex items-center gap-3 p-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 transition-colors">
                  <HelpCircle className="w-5 h-5" />
                  {isExpanded && <span>Help & Support</span>}
                </button>
              </li>
              <li>
                <button className="w-full flex items-center gap-3 p-2.5 rounded-lg text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 transition-colors">
                  <LogOut className="w-5 h-5" />
                  {isExpanded && <span>Log Out</span>}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;