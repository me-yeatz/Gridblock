'use client';

import { DataGrid } from '@/components/data/data-grid';
import BlockEditor from '@/components/editor/block-editor';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'grid' | 'editor'>('grid');

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-zinc-200">Workspace</h2>
              <p className="text-zinc-400">Manage your projects and documents in one place</p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-sm rounded-md border border-zinc-700 text-zinc-300 hover:bg-zinc-800/50 transition-colors">
                Export
              </button>
              <button className="px-4 py-2 text-sm rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 transition-opacity">
                New Item
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-zinc-900/30 backdrop-blur-sm rounded-xl border border-zinc-800 p-6">
                <h3 className="text-lg font-semibold text-zinc-200 mb-4">Database View</h3>
                <DataGrid />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-zinc-900/30 backdrop-blur-sm rounded-xl border border-zinc-800 p-6 h-full">
                <h3 className="text-lg font-semibold text-zinc-200 mb-4">Document Editor</h3>
                <BlockEditor />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-800 py-6 mt-8">
          <div className="container mx-auto px-4 text-center text-zinc-500 text-sm">
            © {new Date().getFullYear()} GridBlock. Built with Next.js, Tailwind CSS, and Tiptap.
          </div>
        </footer>
      </div>
    </div>
  );
}