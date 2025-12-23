'use client';

import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface NavbarProps {
  currentView?: string;
}

const Navbar = ({ currentView = 'Dashboard' }: NavbarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <header className="border-b border-white/10 glass sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Breadcrumb / Path */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">GridBlock</span>
            <ChevronRight className="w-4 h-4 text-gray-600" />
            <span className="text-white font-medium text-glow-strong">{currentView}</span>
          </div>

          {/* Center: Tagline */}
          <div className="hidden md:block">
            <p className="text-xs accent-text tracking-widest uppercase font-light">
              Design with Soul • Function with Efficiency
            </p>
          </div>

          {/* Right: Date & Time */}
          <div className="text-right">
            <p className="text-sm font-medium text-white text-glow-strong">
              {formatTime(currentTime)}
            </p>
            <p className="text-xs accent-text">
              {formatDate(currentTime)}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
