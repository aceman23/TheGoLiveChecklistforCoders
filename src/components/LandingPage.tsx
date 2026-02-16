import { Rocket, CheckCircle2, Sparkles, Code2, Bot, Users, Download, Shield, Zap, Github, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface LandingPageProps {
  onGetStarted: () => void;
  onLocalSEO: () => void;
}

export const LandingPage = ({ onGetStarted, onLocalSEO }: LandingPageProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="text-sm">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-600/20 border border-blue-300 dark:border-blue-500/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Simple. Secure. Trusted.</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Ship with Confidence<br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 bg-clip-text text-transparent">
              Every Single Time
            </span>
          </h1>

          <p className="text-xl text-slate-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            A comprehensive, interactive go-live checklist covering SEO, legal compliance,
            accessibility, and technical performance. Built for developers, vibe coders, and AI coding agents.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              Launch Checklist
            </button>
            <a
              href="https://github.com/aceman23/TheGoLiveChecklistforCoders"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-slate-700 dark:text-white font-semibold rounded-lg border border-slate-300 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700 hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-slate-200 dark:border-gray-700 shadow-lg hover:border-slate-300 dark:hover:border-gray-600 transition-colors">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">For Developers</h3>
            <p className="text-slate-600 dark:text-gray-400">
              Never forget critical launch tasks. Track progress with an intuitive interface
              and export reports for your team.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-slate-200 dark:border-gray-700 shadow-lg hover:border-slate-300 dark:hover:border-gray-600 transition-colors">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">For Vibe Coders</h3>
            <p className="text-slate-600 dark:text-gray-400">
              Beautiful, intuitive interface that makes pre-launch checks enjoyable. Ship confidently with style and ease.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-slate-200 dark:border-gray-700 shadow-lg hover:border-slate-300 dark:hover:border-gray-600 transition-colors">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Copy-Paste AI Prompts</h3>
            <p className="text-slate-600 dark:text-gray-400">
              Every task includes a pre-written AI prompt. Just click "Copy AI Prompt" and paste into Cursor, Claude, or ChatGPT. No thinking required.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-slate-200 dark:border-gray-700 shadow-lg hover:border-slate-300 dark:hover:border-gray-600 transition-colors">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">For Teams</h3>
            <p className="text-slate-600 dark:text-gray-400">
              Standardize your launch process across projects. Ensure every deployment
              meets professional standards.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">Choose Your Checklist</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-slate-200 dark:border-gray-700 hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="w-8 h-8 text-blue-500" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Go-Live Checklist</h3>
              </div>
              <p className="text-slate-600 dark:text-gray-400 mb-6">
                Comprehensive production-readiness checklist covering SEO, legal compliance, accessibility, and technical performance. Perfect for any web application launch.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-slate-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  24 essential tasks across 4 categories
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  SEO, legal, accessibility, technical
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  For all web applications
                </li>
              </ul>
              <button
                onClick={onGetStarted}
                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Launch This Checklist
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-slate-200 dark:border-gray-700 hover:border-green-500/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-green-500" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Local SEO Checklist</h3>
              </div>
              <p className="text-slate-600 dark:text-gray-400 mb-6">
                Battle-tested local SEO checklist for service-based businesses. Follow this consistently for 6 months and dominate your local market. 2026 Edition.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-slate-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  24 local SEO tasks across 6 categories
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  GBP, citations, reviews, link building
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  For local service businesses
                </li>
              </ul>
              <button
                onClick={onLocalSEO}
                className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Launch This Checklist
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 sm:p-12 mb-16 text-slate-900 dark:text-white border border-slate-300 dark:border-gray-700">
          <h2 className="text-3xl font-bold mb-6">What's Included</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Two Powerful Checklists</h4>
                <p className="text-slate-600 dark:text-gray-400 text-sm">
                  Go-Live for general web apps and Local SEO for service-based businesses
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Progress Tracking</h4>
                <p className="text-slate-600 dark:text-gray-400 text-sm">
                  Visual progress bar and completion percentage updated in real-time
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Persistent State</h4>
                <p className="text-slate-600 dark:text-gray-400 text-sm">
                  Automatically saves your progress using localStorage
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Export Reports</h4>
                <p className="text-slate-600 dark:text-gray-400 text-sm">
                  Download markdown reports for documentation and team sharing
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Celebration Effects</h4>
                <p className="text-slate-600 dark:text-gray-400 text-sm">
                  Confetti animation when you achieve 100% completion
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Fully Responsive</h4>
                <p className="text-slate-600 dark:text-gray-400 text-sm">
                  Works beautifully on mobile, tablet, and desktop devices
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">The Four Pillars</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-slate-200 dark:border-gray-700 shadow-lg text-center hover:border-slate-300 dark:hover:border-gray-600 transition-colors">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">SEO & Discoverability</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400">
                Meta tags, social previews, sitemaps, structured data, and canonical links
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-slate-200 dark:border-gray-700 shadow-lg text-center hover:border-slate-300 dark:hover:border-gray-600 transition-colors">
              <div className="text-4xl mb-3">⚖️</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Legal & Compliance</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400">
                Terms of service, privacy policies, cookie consent, and GDPR compliance
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-slate-200 dark:border-gray-700 shadow-lg text-center hover:border-slate-300 dark:hover:border-gray-600 transition-colors">
              <div className="text-4xl mb-3">♿</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Accessibility & UX</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400">
                WCAG compliance, ARIA labels, responsive design, and keyboard navigation
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-slate-200 dark:border-gray-700 shadow-lg text-center hover:border-slate-300 dark:hover:border-gray-600 transition-colors">
              <div className="text-4xl mb-3">🛠️</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Technical Performance</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400">
                SSL, cross-browser testing, code hygiene, and asset optimization
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-slate-200 dark:border-gray-700 shadow-lg hover:border-slate-300 dark:hover:border-gray-600 transition-colors">
            <Shield className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Type-Safe</h3>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              Built with TypeScript and strict type checking for reliability
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-slate-200 dark:border-gray-700 shadow-lg hover:border-slate-300 dark:hover:border-gray-600 transition-colors">
            <Zap className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Modern Stack</h3>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              React 19, Tailwind CSS, Lucide icons, and Vite for blazing fast performance
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-slate-200 dark:border-gray-700 shadow-lg hover:border-slate-300 dark:hover:border-gray-600 transition-colors">
            <Download className="w-8 h-8 text-green-500 mb-3" />
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Easy Integration</h3>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              Drop-in component ready to use in any React project
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-600/20 dark:to-blue-500/10 rounded-xl p-8 sm:p-12 text-center border border-blue-300 dark:border-blue-500/30">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Ready to Ship Confidently?</h2>
          <p className="text-lg text-slate-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Start checking off tasks and ensure your next deployment is production-ready
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all inline-flex items-center gap-2"
          >
            <Rocket className="w-5 h-5" />
            Get Started Now
          </button>
        </div>

        <div className="mt-12 text-center text-sm text-slate-500 dark:text-gray-500">
          <p>Open source • MIT License • Built for developers and vibe coders</p>
        </div>
      </div>
    </div>
  );
};
