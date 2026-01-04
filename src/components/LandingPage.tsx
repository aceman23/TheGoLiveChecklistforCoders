import { Rocket, CheckCircle2, Sparkles, Code2, Bot, Users, Download, Shield, Zap, Github } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Production-Ready Checklist</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Ship with Confidence<br />
            <span className="bg-gradient-to-r from-blue-600 to-primary-600 bg-clip-text text-transparent">
              Every Single Time
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            A comprehensive, interactive go-live checklist covering SEO, legal compliance,
            accessibility, and technical performance. Built for developers, vibe coders, and AI coding agents.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-primary-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              Launch Checklist
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-300 hover:border-slate-400 hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">For Developers</h3>
            <p className="text-slate-600">
              Never forget critical launch tasks. Track progress with an intuitive interface
              and export reports for your team.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-purple-200/50 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">For Vibe Coders</h3>
            <p className="text-slate-600">
              Beautiful, intuitive interface that makes pre-launch checks enjoyable. Ship confidently with style and ease.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 shadow-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">For AI Agents</h3>
            <p className="text-slate-600">
              Structured, parseable checklist data. Perfect for AI coding assistants to
              validate and ensure production readiness.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">For Teams</h3>
            <p className="text-slate-600">
              Standardize your launch process across projects. Ensure every deployment
              meets professional standards.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 mb-16 text-white">
          <h2 className="text-3xl font-bold mb-6">What's Included</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">24 Essential Tasks</h4>
                <p className="text-slate-300 text-sm">
                  Comprehensive coverage of SEO, legal, accessibility, and technical requirements
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Progress Tracking</h4>
                <p className="text-slate-300 text-sm">
                  Visual progress bar and completion percentage updated in real-time
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Persistent State</h4>
                <p className="text-slate-300 text-sm">
                  Automatically saves your progress using localStorage
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Export Reports</h4>
                <p className="text-slate-300 text-sm">
                  Download markdown reports for documentation and team sharing
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Celebration Effects</h4>
                <p className="text-slate-300 text-sm">
                  Confetti animation when you achieve 100% completion
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Fully Responsive</h4>
                <p className="text-slate-300 text-sm">
                  Works beautifully on mobile, tablet, and desktop devices
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">The Four Pillars</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 shadow-lg text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-semibold text-slate-900 mb-2">SEO & Discoverability</h3>
              <p className="text-sm text-slate-600">
                Meta tags, social previews, sitemaps, structured data, and canonical links
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 shadow-lg text-center">
              <div className="text-4xl mb-3">⚖️</div>
              <h3 className="font-semibold text-slate-900 mb-2">Legal & Compliance</h3>
              <p className="text-sm text-slate-600">
                Terms of service, privacy policies, cookie consent, and GDPR compliance
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 shadow-lg text-center">
              <div className="text-4xl mb-3">♿</div>
              <h3 className="font-semibold text-slate-900 mb-2">Accessibility & UX</h3>
              <p className="text-sm text-slate-600">
                WCAG compliance, ARIA labels, responsive design, and keyboard navigation
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 shadow-lg text-center">
              <div className="text-4xl mb-3">🛠️</div>
              <h3 className="font-semibold text-slate-900 mb-2">Technical Performance</h3>
              <p className="text-sm text-slate-600">
                SSL, cross-browser testing, code hygiene, and asset optimization
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-blue-200/50 shadow-lg">
            <Shield className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">Type-Safe</h3>
            <p className="text-sm text-slate-600">
              Built with TypeScript and strict type checking for reliability
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-primary-200/50 shadow-lg">
            <Zap className="w-8 h-8 text-primary-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">Modern Stack</h3>
            <p className="text-sm text-slate-600">
              React 19, Tailwind CSS, Lucide icons, and Vite for blazing fast performance
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-green-200/50 shadow-lg">
            <Download className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-2">Easy Integration</h3>
            <p className="text-sm text-slate-600">
              Drop-in component ready to use in any React project
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-primary-50 rounded-3xl p-8 sm:p-12 text-center border border-blue-200/50">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Ship Confidently?</h2>
          <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
            Start checking off tasks and ensure your next deployment is production-ready
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-primary-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <Rocket className="w-5 h-5" />
            Get Started Now
          </button>
        </div>

        <div className="mt-12 text-center text-sm text-slate-500">
          <p>Open source • MIT License • Built for developers and vibe coders</p>
        </div>
      </div>
    </div>
  );
};
