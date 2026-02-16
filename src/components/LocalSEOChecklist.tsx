import { useEffect, useRef } from 'react';
import {
  CheckCircle2,
  Circle,
  Download,
  RotateCcw,
  MapPin,
  Globe,
  FileText,
  Clipboard,
  Star,
  Link as LinkIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { localSeoTasks, localSeoCategoryLabels, type LocalSEOTask } from '../data/localSeoTasks';
import { useChecklist } from '../hooks/useChecklist';

const categoryIcons = {
  website: Globe,
  gbp: MapPin,
  content: FileText,
  citations: Clipboard,
  reviews: Star,
  links: LinkIcon,
};

const STORAGE_KEY = 'local-seo-checklist';

export const LocalSEOChecklist = () => {
  const { completedTasks, completedCount, progress, toggleTask, resetChecklist, isComplete } =
    useChecklist(localSeoTasks.length, STORAGE_KEY);

  const previousProgressRef = useRef(progress);

  useEffect(() => {
    if (isComplete && previousProgressRef.current < 100) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);
    }

    previousProgressRef.current = progress;
  }, [isComplete, progress]);

  const handleExportReport = () => {
    const categories = ['website', 'gbp', 'content', 'citations', 'reviews', 'links'] as const;

    let report = '# Local SEO Launch Checklist Report – 2026 Edition\n\n';
    report += `Generated: ${new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}\n\n`;
    report += `**Progress:** ${completedCount} of ${localSeoTasks.length} tasks completed (${Math.round(progress)}%)\n\n`;
    report += '---\n\n';

    categories.forEach((category) => {
      const categoryTasks = localSeoTasks.filter(task => task.category === category);
      const completedInCategory = categoryTasks.filter(task => completedTasks.has(task.id)).length;

      report += `## ${localSeoCategoryLabels[category].title}\n\n`;
      report += `Progress: ${completedInCategory}/${categoryTasks.length}\n\n`;

      categoryTasks.forEach((task) => {
        const isChecked = completedTasks.has(task.id);
        report += `- [${isChecked ? 'x' : ' '}] **${task.title}**: ${task.description}\n`;
      });

      report += '\n';
    });

    report += '## The Brutal Truth\n\n';
    report += 'Most businesses fail because they half-do 4-5 of these items for 6 weeks and quit.\n\n';
    report += 'Do **every item** on this list **every month** for **6 straight months** → results compound dramatically.\n\n';
    report += `Launch date: ${new Date().toLocaleDateString('en-US')}\n`;
    report += `6-month review date: ${new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US')}\n\n`;
    report += 'Print it. Pin it. Track it. Go dominate your city.\n';

    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `local-seo-checklist-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tasksByCategory = localSeoTasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<LocalSEOTask['category'], LocalSEOTask[]>);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="sticky top-4 z-10 mb-8 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Local SEO Launch Checklist</h1>
                <p className="text-sm text-slate-600">2026 Edition - Battle-tested for local businesses</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleExportReport}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors"
                title="Export Report"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={resetChecklist}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors"
                title="Reset Checklist"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">
                {completedCount} of {localSeoTasks.length} tasks completed
              </span>
              <span className="text-sm font-bold text-green-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {isComplete && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-800 text-center">
                🎉 Congratulations! All tasks completed. Keep this up for 6 months to dominate your local market!
              </p>
            </div>
          )}
        </div>

        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
          <p className="text-sm text-orange-900 font-medium">
            ⚡ Do <strong>every item</strong> on this list <strong>every month</strong> for <strong>6 straight months</strong>.
            Results compound dramatically. Most businesses quit after 6 weeks - don't be one of them.
          </p>
        </div>

        <div className="space-y-6">
          {(['website', 'gbp', 'content', 'citations', 'reviews', 'links'] as const).map((category) => {
            const tasks = tasksByCategory[category] || [];
            const completedInCategory = tasks.filter(task => completedTasks.has(task.id)).length;
            const IconComponent = categoryIcons[category];

            return (
              <div
                key={category}
                className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <IconComponent className="w-5 h-5 text-green-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {localSeoCategoryLabels[category].title}
                    </h2>
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    {completedInCategory}/{tasks.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {tasks.map((task) => {
                    const isChecked = completedTasks.has(task.id);

                    return (
                      <button
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          isChecked
                            ? 'bg-green-50/50 border-green-200 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {isChecked ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3
                              className={`font-medium mb-1 ${
                                isChecked ? 'text-green-900' : 'text-slate-900'
                              }`}
                            >
                              {task.title}
                            </h3>
                            <p
                              className={`text-sm ${
                                isChecked ? 'text-green-700' : 'text-slate-600'
                              }`}
                            >
                              {task.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Built for local service businesses who want to dominate their market</p>
        </div>
      </div>
    </div>
  );
};
