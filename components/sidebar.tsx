'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Search,
  Plus,
  Settings,
  HelpCircle,
  LogOut,
  MoreHorizontal,
  Pin,
  Table as TableIcon,
  Home,
  Folder,
  User as UserIcon,
} from 'lucide-react';
import Logo from '@/components/ui/logo';
import { Space, Base } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';

interface SidebarProps {
  spaces: Space[];
  activeSpaceId: string | null;
  activeBaseId: string | null;
  activeTableId: string | null;
  onSpaceChange: (spaceId: string) => void;
  onBaseChange: (baseId: string) => void;
  onTableChange: (tableId: string) => void;
  onNewBase: () => void;
}

const Sidebar = ({
  spaces,
  activeSpaceId,
  activeBaseId,
  activeTableId,
  onSpaceChange,
  onBaseChange,
  onTableChange,
  onNewBase,
}: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSpaces, setExpandedSpaces] = useState<string[]>(['space-1']);
  const [expandedBases, setExpandedBases] = useState<string[]>(['base-1']);
  const { user, logout } = useAuth();
  const router = useRouter();

  const toggleSpace = (spaceId: string) => {
    setExpandedSpaces((prev) =>
      prev.includes(spaceId) ? prev.filter((id) => id !== spaceId) : [...prev, spaceId]
    );
  };

  const toggleBase = (baseId: string) => {
    setExpandedBases((prev) =>
      prev.includes(baseId) ? prev.filter((id) => id !== baseId) : [...prev, baseId]
    );
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  const handleHelp = () => {
    window.open('https://github.com/me-yeatz/Gridblock', '_blank');
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      logout();
      router.push('/login');
    }
  };

  const handleProfileClick = () => {
    router.push('/settings');
  };

  // Filter bases by search
  const filterSpaces = (spaces: Space[]) => {
    if (!searchQuery) return spaces;
    return spaces
      .map((space) => ({
        ...space,
        bases: space.bases.filter(
          (base) =>
            base.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            base.tables.some((table) => table.name.toLowerCase().includes(searchQuery.toLowerCase()))
        ),
      }))
      .filter((space) => space.bases.length > 0);
  };

  const filteredSpaces = filterSpaces(spaces);

  return (
    <div className="flex">
      {/* Collapsible Sidebar */}
      <div
        className={`glass-strong border-r border-white/10 h-screen sticky top-0 flex-col transition-all duration-300 ${
          isExpanded ? 'w-72' : 'w-16'
        } hidden md:flex relative z-10`}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Logo size="sm" showText={isExpanded} />
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-auto p-1.5 rounded-lg glass-light hover:glass hover:glow accent-border text-[#EDC5BB] hover:text-white transition-all"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Search */}
        {isExpanded && (
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bases & tables..."
                className="w-full pl-9 pr-3 py-2 glass-light accent-border rounded-xl text-sm text-[#EDC5BB] placeholder:text-gray-500 focus:outline-none focus:glass focus:glow-rose transition-all"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="p-2 flex-1 overflow-y-auto">
          <nav>
            {/* Home / All Bases */}
            <button
              onClick={() => onSpaceChange('all')}
              className={`w-full flex items-center gap-3 p-2.5 mb-3 rounded-xl glass-hover transition-all ${
                activeSpaceId === 'all'
                  ? 'glass glow text-white'
                  : 'glass-light text-gray-300 hover:text-white'
              }`}
            >
              <Home className="w-5 h-5 shrink-0" />
              {isExpanded && <span className="text-sm font-medium">All Bases</span>}
            </button>

            {/* New Base Button */}
            <button
              onClick={onNewBase}
              className="w-full flex items-center gap-3 p-2.5 mb-4 rounded-xl border border-dashed accent-border glass-light text-[#EDC5BB] hover:glass hover:accent-border hover:text-white hover:glow transition-all"
            >
              <Plus className="w-5 h-5 shrink-0" />
              {isExpanded && <span className="text-sm">New Base</span>}
            </button>

            {/* Spaces & Bases */}
            <div className="space-y-1">
              {filteredSpaces.map((space) => {
                const isSpaceExpanded = expandedSpaces.includes(space.id);
                const isSpaceActive = activeSpaceId === space.id;

                return (
                  <div key={space.id}>
                    {/* Space Header */}
                    <div
                      className={`flex items-center gap-2 p-2 rounded-xl glass-hover transition-all cursor-pointer ${
                        isSpaceActive ? 'glass' : 'glass-light'
                      }`}
                    >
                      <button
                        onClick={() => toggleSpace(space.id)}
                        className="p-0.5 hover:bg-zinc-700/50 rounded"
                      >
                        {isSpaceExpanded ? (
                          <ChevronDown className="w-4 h-4 text-zinc-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-zinc-500" />
                        )}
                      </button>
                      <Folder className="w-4 h-4 text-zinc-400" />
                      {isExpanded && (
                        <>
                          <span
                            onClick={() => onSpaceChange(space.id)}
                            className="flex-1 text-sm font-medium text-zinc-300 truncate"
                          >
                            {space.name}
                          </span>
                          {space.isPinned && <Pin className="w-3 h-3 text-purple-400" />}
                        </>
                      )}
                    </div>

                    {/* Bases within Space */}
                    {isSpaceExpanded && isExpanded && (
                      <div className="ml-4 mt-1 space-y-1 border-l border-zinc-800/50 pl-2">
                        {space.bases.map((base) => {
                          const isBaseExpanded = expandedBases.includes(base.id);
                          const isBaseActive = activeBaseId === base.id;

                          return (
                            <div key={base.id}>
                              {/* Base Header */}
                              <div
                                className={`flex items-center gap-2 p-2 rounded-xl glass-hover transition-all cursor-pointer ${
                                  isBaseActive
                                    ? 'glass glow text-white accent-border'
                                    : 'glass-light text-[#EDC5BB] hover:text-white'
                                }`}
                              >
                                <button
                                  onClick={() => toggleBase(base.id)}
                                  className="p-0.5 hover:bg-zinc-700/50 rounded"
                                >
                                  {isBaseExpanded ? (
                                    <ChevronDown className="w-3 h-3" />
                                  ) : (
                                    <ChevronRight className="w-3 h-3" />
                                  )}
                                </button>
                                <span className="text-base">{base.icon || '📊'}</span>
                                <span
                                  onClick={() => onBaseChange(base.id)}
                                  className="flex-1 text-sm font-medium truncate"
                                >
                                  {base.name}
                                </span>
                              </div>

                              {/* Tables within Base */}
                              {isBaseExpanded && (
                                <div className="ml-6 mt-1 space-y-1">
                                  {base.tables.map((table) => {
                                    const isTableActive = activeTableId === table.id;

                                    return (
                                      <button
                                        key={table.id}
                                        onClick={() => onTableChange(table.id)}
                                        className={`w-full flex items-center gap-2 p-2 rounded-lg text-sm glass-hover transition-all ${
                                          isTableActive
                                            ? 'glass text-white'
                                            : 'text-gray-400 hover:text-gray-200 hover:glass-light'
                                        }`}
                                      >
                                        <TableIcon className="w-3.5 h-3.5 shrink-0" />
                                        <span className="truncate">{table.name}</span>
                                        <span className="ml-auto text-xs text-zinc-600">
                                          {table.tasks.length}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10">
          {/* User Info - Clickable */}
          <button
            onClick={handleProfileClick}
            className="w-full flex items-center gap-3 mb-3 p-2.5 rounded-xl glass accent-border glass-hover transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7A4854] to-[#EDC5BB] flex items-center justify-center glow shrink-0">
              <span className="text-white font-bold text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            {isExpanded && (
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-[#EDC5BB] truncate">
                  {user?.name || 'User Name'}
                </p>
                <p className="text-[10px] text-gray-500 truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            )}
            {isExpanded && (
              <UserIcon className="w-4 h-4 text-gray-400 shrink-0" />
            )}
          </button>

          {/* Footer Actions */}
          <nav>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={handleSettings}
                  className="w-full flex items-center gap-3 p-2 rounded-lg glass-light text-gray-300 hover:glass hover:text-white transition-all"
                  title={!isExpanded ? 'Settings' : undefined}
                >
                  <Settings className="w-4 h-4" />
                  {isExpanded && <span className="text-sm">Settings</span>}
                </button>
              </li>
              <li>
                <button
                  onClick={handleHelp}
                  className="w-full flex items-center gap-3 p-2 rounded-lg glass-light text-gray-300 hover:glass hover:text-white transition-all"
                  title={!isExpanded ? 'Help & Support' : undefined}
                >
                  <HelpCircle className="w-4 h-4" />
                  {isExpanded && <span className="text-sm">Help & Support</span>}
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-2 rounded-lg glass-light text-gray-300 hover:bg-red-500/20 hover:text-red-300 transition-all"
                  title={!isExpanded ? 'Log Out' : undefined}
                >
                  <LogOut className="w-4 h-4" />
                  {isExpanded && <span className="text-sm">Log Out</span>}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/50 text-zinc-300 shadow-lg backdrop-blur-xl hover:border-purple-500/50 transition-all"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
