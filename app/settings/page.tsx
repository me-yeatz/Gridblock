'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { taskService } from '@/lib/task-service';
import { getInitialAppState } from '@/lib/initial-data';
import {
  User as UserIcon,
  Mail,
  Building,
  MapPin,
  FileText,
  Save,
  LogOut,
  Camera,
  Bell,
  Shield,
  Palette,
} from 'lucide-react';

export default function SettingsPage() {
  const { user, updateProfile, logout } = useAuth();
  const router = useRouter();
  const [appState] = useState(getInitialAppState());

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [company, setCompany] = useState(user?.company || '');
  const [location, setLocation] = useState(user?.location || '');
  const [isSaving, setIsSaving] = useState(false);

  // Fetch tasks for sidebar
  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks'],
    queryFn: taskService.getAllTasks,
    staleTime: 1000 * 60 * 5,
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    updateProfile({
      name,
      email,
      bio,
      company,
      location,
    });

    setIsSaving(false);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      logout();
      router.push('/login');
    }
  };

  const handleSpaceChange = () => {};
  const handleBaseChange = () => {};
  const handleTableChange = () => {};
  const handleNewBase = () => {};

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
        <Navbar currentView="Settings" />

        <main className="flex-grow container mx-auto px-4 py-6 relative z-10 max-w-4xl">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white text-glow-strong mb-2">Settings</h2>
            <p className="accent-text">Manage your account and preferences</p>
          </div>

          <div className="space-y-6">
            {/* Profile Section */}
            <div className="glass-strong rounded-2xl border border-white/10 glow p-6">
              <div className="flex items-center gap-3 mb-6">
                <UserIcon className="w-6 h-6 accent-text" />
                <h3 className="text-xl font-semibold text-white">Profile Information</h3>
              </div>

              {/* Avatar */}
              <div className="mb-6">
                <label className="block text-sm font-medium accent-text mb-3">
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7A4854] to-[#EDC5BB] flex items-center justify-center glow text-2xl font-bold text-white">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <Button variant="secondary" size="sm" leftIcon={<Camera className="w-4 h-4" />}>
                    Change Photo
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium accent-text mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 glass-light accent-border rounded-xl text-[#EDC5BB] placeholder:text-gray-600 focus:outline-none focus:glass focus:glow-rose transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium accent-text mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 glass-light accent-border rounded-xl text-[#EDC5BB] placeholder:text-gray-600 focus:outline-none focus:glass focus:glow-rose transition-all"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium accent-text mb-2">
                    Company
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Your company"
                      className="w-full pl-10 pr-4 py-2.5 glass-light accent-border rounded-xl text-[#EDC5BB] placeholder:text-gray-600 focus:outline-none focus:glass focus:glow-rose transition-all"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium accent-text mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City, Country"
                      className="w-full pl-10 pr-4 py-2.5 glass-light accent-border rounded-xl text-[#EDC5BB] placeholder:text-gray-600 focus:outline-none focus:glass focus:glow-rose transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-5">
                <label className="block text-sm font-medium accent-text mb-2">
                  Bio
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={3}
                    className="w-full pl-10 pr-4 py-2.5 glass-light accent-border rounded-xl text-[#EDC5BB] placeholder:text-gray-600 focus:outline-none focus:glass focus:glow-rose transition-all resize-none"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-6 flex gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleSave}
                  isLoading={isSaving}
                  leftIcon={<Save className="w-4 h-4" />}
                >
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="glass-strong rounded-2xl border border-white/10 glow p-6">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-6 h-6 accent-text" />
                <h3 className="text-xl font-semibold text-white">Preferences</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 glass-light rounded-xl">
                  <div>
                    <p className="text-white font-medium">Theme</p>
                    <p className="text-sm text-gray-400">Dark mode with glassmorphic design</p>
                  </div>
                  <div className="text-sm accent-text">Active</div>
                </div>

                <div className="flex items-center justify-between p-4 glass-light rounded-xl">
                  <div>
                    <p className="text-white font-medium">Notifications</p>
                    <p className="text-sm text-gray-400">Receive updates about your tasks</p>
                  </div>
                  <Bell className="w-5 h-5 text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-4 glass-light rounded-xl">
                  <div>
                    <p className="text-white font-medium">Privacy</p>
                    <p className="text-sm text-gray-400">Control who can see your content</p>
                  </div>
                  <Shield className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="glass-strong rounded-2xl border border-white/10 glow p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Account Actions</h3>

              <div className="space-y-3">
                <Button
                  variant="danger"
                  size="md"
                  onClick={handleLogout}
                  leftIcon={<LogOut className="w-4 h-4" />}
                >
                  Log Out
                </Button>
              </div>

              <div className="mt-6 p-4 glass-light rounded-xl border border-red-500/20">
                <p className="text-sm text-red-300">
                  <span className="font-medium">Note:</span> Your data is stored locally in your browser.
                  Clearing browser data will remove all your information.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
