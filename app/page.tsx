'use client';

import { DataGrid } from '@/components/data/data-grid';
import BlockEditor from '@/components/editor/block-editor';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import GanttChart from '@/components/gantt-chart';
import CalendarView from '@/components/calendar-view';
import LandingPage from '@/components/landing-page';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Download, Plus, Grid3X3, LayoutList, Calendar as CalendarIcon, BarChart3, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import { AppState, Space, Base, Table, ViewType, Task } from '@/lib/types';
import { getInitialAppState } from '@/lib/initial-data';
import { useAuth } from '@/lib/auth-context';

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [appState, setAppState] = useState<AppState>(getInitialAppState());
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Check if user has previously launched the app
  useEffect(() => {
    const hasLaunched = localStorage.getItem('gridblock-launched');
    if (hasLaunched === 'true') {
      setShowLanding(false);
      // Only redirect to login if they've launched before and are not authenticated
      if (!isLoading && !isAuthenticated) {
        router.push('/login');
      }
    }

    // Load saved state from localStorage if available
    const savedState = localStorage.getItem('gridblock-state');
    if (savedState) {
      try {
        setAppState(JSON.parse(savedState));
      } catch (e) {
        console.error('Failed to load saved state', e);
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (!showLanding) {
      localStorage.setItem('gridblock-state', JSON.stringify(appState));
    }
  }, [appState, showLanding]);

  const handleLaunchApp = () => {
    localStorage.setItem('gridblock-launched', 'true');
    setShowLanding(false);
    // Redirect to login after launching
    if (!isAuthenticated) {
      router.push('/login');
    }
  };

  // Show landing page first
  if (showLanding) {
    return <LandingPage onLaunchApp={handleLaunchApp} />;
  }

  // Show loading while checking auth (after landing page is dismissed)
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#7A4854] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="accent-text">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Get current active items
  const activeSpace = appState.spaces.find((s) => s.id === appState.activeSpaceId);
  const activeBase = activeSpace?.bases.find((b) => b.id === appState.activeBaseId);
  const activeTable = activeBase?.tables.find((t) => t.id === appState.activeTableId);

  // Handlers
  const handleSpaceChange = (spaceId: string) => {
    setAppState({ ...appState, activeSpaceId: spaceId });
  };

  const handleBaseChange = (baseId: string) => {
    // Find the space that contains this base
    const space = appState.spaces.find((s) => s.bases.some((b) => b.id === baseId));
    if (!space) return;

    const base = space.bases.find((b) => b.id === baseId);
    if (!base) return;

    // Update last opened time
    const updatedSpaces = appState.spaces.map((s) =>
      s.id === space.id
        ? {
            ...s,
            bases: s.bases.map((b) =>
              b.id === baseId ? { ...b, lastOpened: new Date().toISOString() } : b
            ),
          }
        : s
    );

    setAppState({
      ...appState,
      spaces: updatedSpaces,
      activeSpaceId: space.id,
      activeBaseId: baseId,
      activeTableId: base.tables[0]?.id || null,
    });
  };

  const handleTableChange = (tableId: string) => {
    setAppState({ ...appState, activeTableId: tableId });
  };

  const handleNewBase = () => {
    const baseName = prompt('Enter base name:');
    if (!baseName) return;

    const newBase: Base = {
      id: `base-${Date.now()}`,
      name: baseName,
      icon: '📊',
      color: 'purple',
      owner: 'You',
      createdAt: new Date().toISOString(),
      lastOpened: new Date().toISOString(),
      tables: [
        {
          id: `table-${Date.now()}`,
          name: 'Table 1',
          icon: '📋',
          tasks: [],
          activeView: 'grid',
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
        },
      ],
    };

    // Add to first space
    const updatedSpaces = [...appState.spaces];
    if (updatedSpaces[0]) {
      updatedSpaces[0].bases.push(newBase);
    }

    setAppState({
      ...appState,
      spaces: updatedSpaces,
      activeBaseId: newBase.id,
      activeTableId: newBase.tables[0].id,
    });
  };

  const handleViewChange = (view: ViewType) => {
    if (!activeTable || !activeBase || !activeSpace) return;

    const updatedSpaces = appState.spaces.map((s) =>
      s.id === activeSpace.id
        ? {
            ...s,
            bases: s.bases.map((b) =>
              b.id === activeBase.id
                ? {
                    ...b,
                    tables: b.tables.map((t) =>
                      t.id === activeTable.id ? { ...t, activeView: view } : t
                    ),
                  }
                : b
            ),
          }
        : s
    );

    setAppState({ ...appState, spaces: updatedSpaces });
  };

  const handleUpdateTasks = (tasks: Task[]) => {
    if (!activeTable || !activeBase || !activeSpace) return;

    const updatedSpaces = appState.spaces.map((s) =>
      s.id === activeSpace.id
        ? {
            ...s,
            bases: s.bases.map((b) =>
              b.id === activeBase.id
                ? {
                    ...b,
                    tables: b.tables.map((t) =>
                      t.id === activeTable.id
                        ? { ...t, tasks, lastModified: new Date().toISOString() }
                        : t
                    ),
                  }
                : b
            ),
          }
        : s
    );

    setAppState({ ...appState, spaces: updatedSpaces });
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(128, 90, 213);
    doc.text('GridBlock Export', 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 30);

    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    if (activeBase && activeTable) {
      doc.text(`Base: ${activeBase.name}`, 20, 45);
      doc.text(`Table: ${activeTable.name}`, 20, 52);
      doc.text(`View: ${activeTable.activeView}`, 20, 59);
    }

    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('GridBlock - Built with Next.js, Tailwind CSS, and Tiptap', 20, 280);

    doc.save(`gridblock-export-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handleNewItem = () => {
    // Add new row to current table
    if (!activeTable) return;
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: '',
      status: 'Todo',
      priority: 'Medium',
      assignee: '',
      dueDate: new Date().toISOString().split('T')[0],
    };
    handleUpdateTasks([...activeTable.tasks, newTask]);
  };

  const renderContent = () => {
    if (!activeTable || !activeBase) {
      return (
        <div className="flex flex-col items-center justify-center h-96 text-zinc-500">
          <p className="text-lg mb-2">No table selected</p>
          <p className="text-sm">Select a table from the sidebar or create a new base</p>
        </div>
      );
    }

    const view = activeTable.activeView;

    switch (view) {
      case 'grid':
        return (
          <div className="glass-strong rounded-2xl border border-white/10 glow h-[calc(100vh-240px)] overflow-hidden">
            <DataGrid
              tasks={activeTable.tasks}
              onTasksChange={handleUpdateTasks}
              tableName={activeTable.name}
            />
          </div>
        );

      case 'kanban':
        return (
          <div className="glass-strong rounded-2xl border border-white/10 p-8 glow">
            <p className="text-gray-300 text-center py-16 text-lg">Kanban view coming soon...</p>
          </div>
        );

      case 'calendar':
        return (
          <div className="glass-strong rounded-2xl border border-white/10 glow overflow-hidden">
            <CalendarView />
          </div>
        );

      case 'gantt':
        return (
          <div className="glass-strong rounded-2xl border border-white/10 glow overflow-hidden">
            <GanttChart tasks={activeTable.tasks} />
          </div>
        );

      case 'form':
        return (
          <div className="glass-strong rounded-2xl border border-white/10 p-8 glow">
            <BlockEditor />
          </div>
        );

      default:
        return null;
    }
  };

  const viewIcons: Record<ViewType, any> = {
    grid: Grid3X3,
    kanban: LayoutList,
    calendar: CalendarIcon,
    gantt: BarChart3,
    form: FileText,
  };

  return (
    <div className="flex min-h-screen text-foreground relative">
      <Sidebar
        spaces={appState.spaces}
        activeSpaceId={appState.activeSpaceId}
        activeBaseId={appState.activeBaseId}
        activeTableId={appState.activeTableId}
        onSpaceChange={handleSpaceChange}
        onBaseChange={handleBaseChange}
        onTableChange={handleTableChange}
        onNewBase={handleNewBase}
      />
      <div className="flex-1 flex flex-col">
        <Navbar currentView={activeBase?.name || 'GridBlock'} />

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-6 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white text-glow-strong flex items-center gap-3">
                <span className="text-4xl">{activeBase?.icon}</span>
                {activeBase?.name || 'No Base Selected'}
              </h2>
              <p className="accent-text mt-1">
                {activeTable?.name || 'Select a table'} • Last modified:{' '}
                {activeTable?.lastModified
                  ? new Date(activeTable.lastModified).toLocaleDateString()
                  : 'Never'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="md"
                leftIcon={<Download className="w-4 h-4" />}
                onClick={handleExportPDF}
              >
                Export
              </Button>
              <Button
                variant="primary"
                size="md"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={handleNewItem}
              >
                New Row
              </Button>
            </div>
          </div>

          {/* View Switcher */}
          {activeTable && (
            <div className="flex items-center gap-3 mb-6">
              {(['grid', 'kanban', 'calendar', 'gantt', 'form'] as ViewType[]).map((view) => {
                const Icon = viewIcons[view];
                const isActive = activeTable.activeView === view;
                return (
                  <button
                    key={view}
                    onClick={() => handleViewChange(view)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium glass-hover transition-all ${
                      isActive
                        ? 'glass glow text-white accent-border'
                        : 'glass-light accent-text hover:text-white hover:glass'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </button>
                );
              })}
            </div>
          )}

          {renderContent()}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 glass py-6 mt-8 relative z-10">
          <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} GridBlock. Built with Next.js, Tailwind CSS, and Tiptap.
          </div>
        </footer>
      </div>
    </div>
  );
}
