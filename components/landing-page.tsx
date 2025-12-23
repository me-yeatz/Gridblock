'use client';

import { Grid3X3, FileText, Calendar, BarChart3, Database, Zap, Layout, Download } from 'lucide-react';

interface LandingPageProps {
  onLaunchApp: () => void;
}

export default function LandingPage({ onLaunchApp }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-sm border-b-4 border-purple-500 px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500 border-2 border-purple-400 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <Grid3X3 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-extrabold uppercase tracking-tight text-zinc-100">GridBlock</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-semibold uppercase tracking-wide text-zinc-300 hover:text-purple-400 transition-colors">Features</a>
          <a href="#showcase" className="text-sm font-semibold uppercase tracking-wide text-zinc-300 hover:text-purple-400 transition-colors">Showcase</a>
          <a href="#tech" className="text-sm font-semibold uppercase tracking-wide text-zinc-300 hover:text-purple-400 transition-colors">Tech Stack</a>
          <button
            onClick={onLaunchApp}
            className="bg-purple-500 text-white border-2 border-purple-400 px-6 py-3 font-bold text-sm uppercase tracking-wide hover:bg-lime-400 hover:text-zinc-900 hover:border-lime-400 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_rgba(168,85,247,0.5)]"
          >
            Launch App
          </button>
        </div>
        <button
          onClick={onLaunchApp}
          className="md:hidden bg-purple-500 text-white border-2 border-purple-400 px-4 py-2 font-bold text-xs uppercase"
        >
          Launch
        </button>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-24 pb-16 px-4 md:px-8 bg-zinc-950 relative">
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-zinc-800/80 text-lime-400 px-4 py-2 text-xs font-bold uppercase tracking-widest w-fit border border-zinc-700/50 backdrop-blur-sm">
              <Zap className="w-4 h-4" />
              High-Performance Database
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight uppercase tracking-tighter text-zinc-100">
              Stop Using <span className="text-purple-400">Boring</span> Databases
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl">
              A high-performance database app that combines the power of Baserow, the sleek aesthetic of Teable, and the free-flow content capability of Notion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={onLaunchApp}
                className="bg-purple-500 text-white border-4 border-zinc-800 px-8 py-4 text-lg font-bold uppercase tracking-wide shadow-[6px_6px_0_#18181b] hover:bg-lime-400 hover:text-zinc-900 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0_#18181b] transition-all"
              >
                Launch App
              </button>
              <a
                href="https://github.com/meyaaaaaa/gridblock"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-800 text-zinc-100 border-4 border-zinc-800 px-8 py-4 text-lg font-bold uppercase tracking-wide shadow-[6px_6px_0_#18181b] hover:bg-zinc-700 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0_#18181b] transition-all text-center"
              >
                View Source
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="bg-zinc-900 border-4 border-zinc-700 shadow-[16px_16px_0_rgba(168,85,247,0.3)] rounded-xl overflow-hidden">
              <div className="bg-zinc-800 px-4 py-3 border-b border-zinc-700 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-xs text-zinc-500 font-mono">gridblock-app</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <Grid3X3 className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-medium text-zinc-200">Database View</span>
                  <span className="ml-auto text-xs text-zinc-500">12 tasks</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <FileText className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-medium text-zinc-200">Document Editor</span>
                  <span className="ml-auto text-xs text-zinc-500">Notion-style</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-medium text-zinc-200">Calendar View</span>
                  <span className="ml-auto text-xs text-zinc-500">Dec 2025</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-medium text-zinc-200">Gantt Chart</span>
                  <span className="ml-auto text-xs text-zinc-500">Timeline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 md:px-8 bg-zinc-900 border-t-4 border-b-4 border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-lime-400 text-zinc-900 px-4 py-2 text-xs font-bold uppercase tracking-widest mb-4">
              Features
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-zinc-100">
              Built for Productivity
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Database className="w-7 h-7" />}
              title="Database Grid"
              description="TanStack Table powered grid with sorting, filtering, pagination, and full CRUD operations."
            />
            <FeatureCard
              icon={<FileText className="w-7 h-7" />}
              title="Block Editor"
              description="Tiptap-based Notion-style editor with slash commands, rich formatting, and bubble menus."
            />
            <FeatureCard
              icon={<Calendar className="w-7 h-7" />}
              title="Calendar View"
              description="Month view calendar with event management, date navigation, and task scheduling."
            />
            <FeatureCard
              icon={<BarChart3 className="w-7 h-7" />}
              title="Gantt Chart"
              description="Timeline visualization with progress tracking, priority indicators, and date navigation."
            />
            <FeatureCard
              icon={<Download className="w-7 h-7" />}
              title="PDF Export"
              description="Export your data and documents to PDF format with one click."
            />
            <FeatureCard
              icon={<Layout className="w-7 h-7" />}
              title="Dark Mode"
              description="Sleek developer-centric dark theme with neon accents and modern aesthetics."
            />
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="py-24 px-4 md:px-8 bg-zinc-950 relative">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-purple-500 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest mb-4">
              Why GridBlock?
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-zinc-100">
              No Bloat. Just Power.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ul className="space-y-6">
                <ShowcaseItem number="1" text="Modern Next.js 14+ with App Router architecture" />
                <ShowcaseItem number="2" text="Type-safe with TypeScript throughout" />
                <ShowcaseItem number="3" text="Supabase PostgreSQL backend for real data" />
                <ShowcaseItem number="4" text="TanStack Query for efficient state management" />
                <ShowcaseItem number="5" text="Responsive design for all devices" />
                <ShowcaseItem number="6" text="Open source and free forever" />
              </ul>
            </div>
            <div className="bg-zinc-900 border-4 border-purple-500/50 shadow-[16px_16px_0_rgba(168,85,247,0.2)] p-8 rounded-xl">
              <div className="space-y-4">
                <TechRow label="Framework" value="Next.js 14+" />
                <TechRow label="Language" value="TypeScript" />
                <TechRow label="Styling" value="Tailwind CSS" />
                <TechRow label="Database" value="Supabase" />
                <TechRow label="Editor" value="Tiptap" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="py-24 px-4 md:px-8 bg-zinc-900 border-t-4 border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-lime-400 text-zinc-900 px-4 py-2 text-xs font-bold uppercase tracking-widest mb-4">
              Tech Stack
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-zinc-100">
              Modern Tools
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <TechCard name="Next.js" />
            <TechCard name="TypeScript" />
            <TechCard name="Tailwind" />
            <TechCard name="Supabase" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 bg-purple-600 border-t-4 border-purple-400 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl text-purple-100 mb-8">
            Stop using boring databases. Start being productive. No sign-up required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onLaunchApp}
              className="bg-zinc-900 text-purple-400 border-4 border-zinc-900 px-8 py-4 text-lg font-bold uppercase tracking-wide shadow-[6px_6px_0_rgba(0,0,0,0.3)] hover:bg-lime-400 hover:text-zinc-900 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0_rgba(0,0,0,0.3)] transition-all"
            >
              Open GridBlock
            </button>
            <a
              href="https://github.com/meyaaaaaa/gridblock"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-zinc-900 border-4 border-zinc-900 px-8 py-4 text-lg font-bold uppercase tracking-wide shadow-[6px_6px_0_rgba(0,0,0,0.3)] hover:bg-zinc-100 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0_rgba(0,0,0,0.3)] transition-all"
            >
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t-4 border-purple-500 py-8 px-4 text-center">
        <p className="text-zinc-400 text-sm">
          Made with power and precision by{' '}
          <a href="https://github.com/meyaaaaaa" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:text-purple-400 transition-colors">
            @meyaaaaaa
          </a>{' '}
          | Open Source on{' '}
          <a href="https://github.com/meyaaaaaa/gridblock" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:text-purple-400 transition-colors">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-zinc-800 border-4 border-zinc-700 p-8 rounded-xl hover:bg-purple-500 hover:border-purple-400 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_rgba(168,85,247,0.3)] transition-all group cursor-pointer">
      <div className="w-14 h-14 bg-purple-500 border-2 border-purple-400 flex items-center justify-center mb-6 rounded-lg group-hover:bg-zinc-900 group-hover:border-zinc-800 text-white transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)]">
        {icon}
      </div>
      <h3 className="text-xl font-bold uppercase tracking-tight mb-3 text-zinc-100 group-hover:text-white">{title}</h3>
      <p className="text-zinc-400 group-hover:text-purple-100 transition-colors leading-relaxed">{description}</p>
    </div>
  );
}

function ShowcaseItem({ number, text }: { number: string; text: string }) {
  return (
    <li className="flex items-start gap-4 text-lg">
      <span className="w-8 h-8 bg-lime-400 border-2 border-lime-300 flex items-center justify-center font-bold text-zinc-900 flex-shrink-0 rounded">
        {number}
      </span>
      <span className="text-zinc-300">{text}</span>
    </li>
  );
}

function TechRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-zinc-800 border-2 border-zinc-700 rounded-lg">
      <span className="font-bold text-sm uppercase text-zinc-300">{label}</span>
      <span className="text-purple-400 font-mono text-sm">{value}</span>
    </div>
  );
}

function TechCard({ name }: { name: string }) {
  return (
    <div className="bg-zinc-800 border-4 border-zinc-700 p-8 text-center rounded-xl hover:bg-purple-500 hover:border-purple-400 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_rgba(168,85,247,0.3)] transition-all cursor-pointer">
      <h3 className="text-lg font-bold uppercase text-zinc-100">{name}</h3>
    </div>
  );
}
