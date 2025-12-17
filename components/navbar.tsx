'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Bell, User, Menu, Grid3X3, FileText } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-md hover:bg-zinc-800 text-zinc-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hidden sm:block">
                GridBlock
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1 bg-zinc-800/50 rounded-lg p-1 border border-zinc-700">
            <Link href="/" className="px-3 py-1.5 text-sm rounded-md text-zinc-300 hover:bg-zinc-700/50 transition-colors flex items-center gap-1.5">
              <Grid3X3 className="w-4 h-4" /> Database
            </Link>
            <Link href="/" className="px-3 py-1.5 text-sm rounded-md text-zinc-300 hover:bg-zinc-700/50 transition-colors flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> Documents
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-purple-500 w-40 lg:w-64"
              />
            </div>
            
            <button className="p-2 rounded-md hover:bg-zinc-800 text-zinc-300 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-300">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;