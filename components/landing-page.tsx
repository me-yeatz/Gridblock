'use client';

import { Grid3X3, FileText, Calendar, BarChart3, Database, Zap, Layout, Download, Sparkles, Shield, Layers } from 'lucide-react';

interface LandingPageProps {
  onLaunchApp: () => void;
}

export default function LandingPage({ onLaunchApp }: LandingPageProps) {
  return (
    <div className="min-h-screen text-foreground font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/10 px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#7A4854] to-[#191A40] rounded-lg flex items-center justify-center glow">
            <Grid3X3 className="w-6 h-6 text-[#EDC5BB]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#EDC5BB] text-glow">GridBlock</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium text-zinc-300 hover:text-[#EDC5BB] transition-colors">Features</a>
          <a href="#showcase" className="text-sm font-medium text-zinc-300 hover:text-[#EDC5BB] transition-colors">Showcase</a>
          <a href="#tech" className="text-sm font-medium text-zinc-300 hover:text-[#EDC5BB] transition-colors">Tech Stack</a>
          <button
            onClick={onLaunchApp}
            className="glass-hover glow px-6 py-2.5 rounded-xl font-semibold text-sm text-[#EDC5BB] border border-[#EDC5BB]/30"
          >
            Launch App
          </button>
        </div>
        <button
          onClick={onLaunchApp}
          className="md:hidden glass-hover px-4 py-2 rounded-lg font-semibold text-xs text-[#EDC5BB]"
        >
          Launch
        </button>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-24 pb-16 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-semibold tracking-wide w-fit border border-[#EDC5BB]/20">
              <Sparkles className="w-4 h-4 text-[#EDC5BB]" />
              <span className="text-[#EDC5BB]">Database with Soul</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white">
              Stop Using <span className="text-glow-strong text-[#EDC5BB]">Boring</span> Databases
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-xl">
              A high-performance database app that combines the power of Baserow, the sleek aesthetic of Teable, and the free-flow content capability of Notion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={onLaunchApp}
                className="glass-hover glow-strong px-8 py-4 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-[#7A4854] to-[#191A40] border border-[#EDC5BB]/30"
              >
                Launch App
              </button>
              <a
                href="https://github.com/meyaaaaaa/gridblock"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-hover px-8 py-4 rounded-2xl text-lg font-semibold text-[#EDC5BB] border border-[#EDC5BB]/30 text-center"
              >
                View Source
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="glass-strong rounded-2xl overflow-hidden glow border border-white/10">
              <div className="glass-dark px-4 py-3 border-b border-white/10 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#7A4854]"></div>
                <div className="w-3 h-3 rounded-full bg-[#191A40]"></div>
                <div className="w-3 h-3 rounded-full bg-[#EDC5BB]"></div>
                <span className="ml-4 text-xs text-zinc-400 font-mono">gridblock-app</span>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 p-3 glass rounded-xl border border-white/10">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#7A4854] to-[#191A40] rounded-lg flex items-center justify-center">
                    <Grid3X3 className="w-4 h-4 text-[#EDC5BB]" />
                  </div>
                  <span className="text-sm font-medium text-zinc-200">Database Grid</span>
                  <span className="ml-auto text-xs text-zinc-400">12 tasks</span>
                </div>
                <div className="flex items-center gap-3 p-3 glass rounded-xl border border-white/10">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#7A4854] to-[#191A40] rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[#EDC5BB]" />
                  </div>
                  <span className="text-sm font-medium text-zinc-200">Block Editor</span>
                  <span className="ml-auto text-xs text-zinc-400">Notion-style</span>
                </div>
                <div className="flex items-center gap-3 p-3 glass rounded-xl border border-white/10">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#7A4854] to-[#191A40] rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-[#EDC5BB]" />
                  </div>
                  <span className="text-sm font-medium text-zinc-200">Calendar View</span>
                  <span className="ml-auto text-xs text-zinc-400">Dec 2025</span>
                </div>
                <div className="flex items-center gap-3 p-3 glass rounded-xl border border-white/10">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#7A4854] to-[#191A40] rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-[#EDC5BB]" />
                  </div>
                  <span className="text-sm font-medium text-zinc-200">Gantt Chart</span>
                  <span className="ml-auto text-xs text-zinc-400">Timeline</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-semibold tracking-wide mb-4 border border-[#EDC5BB]/20">
              <Zap className="w-4 h-4 text-[#EDC5BB]" />
              <span className="text-[#EDC5BB]">Features</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white text-glow">
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
              icon={<Shield className="w-7 h-7" />}
              title="Elegant Design"
              description="Beautiful glassmorphic dark theme with burgundy and rose gold accents."
            />
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="py-24 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-semibold tracking-wide mb-4 border border-[#EDC5BB]/20">
              <Layers className="w-4 h-4 text-[#EDC5BB]" />
              <span className="text-[#EDC5BB]">Why GridBlock?</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white text-glow">
              No Bloat. Just Power.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ul className="space-y-4">
                <ShowcaseItem number="1" text="Modern Next.js 14+ with App Router architecture" />
                <ShowcaseItem number="2" text="Type-safe with TypeScript throughout" />
                <ShowcaseItem number="3" text="Supabase PostgreSQL backend for real data" />
                <ShowcaseItem number="4" text="TanStack Query for efficient state management" />
                <ShowcaseItem number="5" text="Responsive design for all devices" />
                <ShowcaseItem number="6" text="Open source and free forever" />
              </ul>
            </div>
            <div className="glass-strong rounded-2xl p-8 border border-white/10 glow">
              <div className="space-y-3">
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
      <section id="tech" className="py-24 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-semibold tracking-wide mb-4 border border-[#EDC5BB]/20">
              <Database className="w-4 h-4 text-[#EDC5BB]" />
              <span className="text-[#EDC5BB]">Tech Stack</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white text-glow">
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
      <section className="py-24 px-4 md:px-8 relative text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#7A4854]/20 to-transparent"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white text-glow-strong mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl text-zinc-300 mb-8">
            Stop using boring databases. Start being productive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onLaunchApp}
              className="glass-hover glow-strong px-8 py-4 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-[#7A4854] to-[#191A40] border border-[#EDC5BB]/30"
            >
              Open GridBlock
            </button>
            <a
              href="https://github.com/meyaaaaaa/gridblock"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-hover px-8 py-4 rounded-2xl text-lg font-semibold text-[#EDC5BB] border border-[#EDC5BB]/30"
            >
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-white/10 py-8 px-4 text-center">
        <p className="text-zinc-400 text-sm">
          Made with power and precision by{' '}
          <a href="https://github.com/meyaaaaaa" target="_blank" rel="noopener noreferrer" className="text-[#EDC5BB] hover:text-[#7A4854] transition-colors">
            @meyaaaaaa
          </a>{' '}
          | Open Source on{' '}
          <a href="https://github.com/meyaaaaaa/gridblock" target="_blank" rel="noopener noreferrer" className="text-[#EDC5BB] hover:text-[#7A4854] transition-colors">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="glass-hover p-8 rounded-2xl border border-white/10 group cursor-pointer">
      <div className="w-14 h-14 bg-gradient-to-br from-[#7A4854] to-[#191A40] flex items-center justify-center mb-6 rounded-xl glow text-[#EDC5BB] transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-bold tracking-tight mb-3 text-white">{title}</h3>
      <p className="text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}

function ShowcaseItem({ number, text }: { number: string; text: string }) {
  return (
    <li className="flex items-start gap-4 text-lg">
      <span className="w-8 h-8 bg-gradient-to-br from-[#7A4854] to-[#191A40] flex items-center justify-center font-bold text-[#EDC5BB] flex-shrink-0 rounded-lg glow-rose text-sm">
        {number}
      </span>
      <span className="text-zinc-300">{text}</span>
    </li>
  );
}

function TechRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-4 glass rounded-xl border border-white/10">
      <span className="font-semibold text-sm text-zinc-300">{label}</span>
      <span className="text-[#EDC5BB] font-mono text-sm">{value}</span>
    </div>
  );
}

function TechCard({ name }: { name: string }) {
  return (
    <div className="glass-hover p-8 text-center rounded-2xl border border-white/10 cursor-pointer group">
      <h3 className="text-lg font-semibold text-white group-hover:text-[#EDC5BB] transition-colors">{name}</h3>
    </div>
  );
}
