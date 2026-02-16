import { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Download,
  RotateCcw,
  MapPin,
  Globe,
  FileText as FileTextIcon,
  Clipboard,
  Star,
  Link as LinkIcon,
  Copy,
  Check,
  Sun,
  Moon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { localSeoTasks, localSeoCategoryLabels, type LocalSEOTask } from '../data/localSeoTasks';
import { useChecklist } from '../hooks/useChecklist';
import { useTheme } from '../contexts/ThemeContext';

const categoryIcons = {
  website: Globe,
  gbp: MapPin,
  content: FileTextIcon,
  citations: Clipboard,
  reviews: Star,
  links: LinkIcon,
};

const STORAGE_KEY = 'local-seo-checklist';

export const LocalSEOChecklist = () => {
  const { completedTasks, completedCount, progress, toggleTask, resetChecklist, isComplete } =
    useChecklist(localSeoTasks.length, STORAGE_KEY);
  const { theme, toggleTheme } = useTheme();

  const previousProgressRef = useRef(progress);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const handleCopyPrompt = async (taskId: string, prompt: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPrompt(taskId);
      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

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

  const handleExportPDF = () => {
    const categories = ['website', 'gbp', 'content', 'citations', 'reviews', 'links'] as const;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const sixMonthsLater = new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000);

    let html = `
<!DOCTYPE html>
<html>
<head>
  <title>Local SEO Launch Checklist Report – 2026 Edition</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }
    h1 { color: #1e293b; border-bottom: 3px solid #10b981; padding-bottom: 10px; }
    h2 { color: #334155; margin-top: 30px; }
    .meta { color: #64748b; font-size: 14px; margin: 20px 0; }
    .progress { background: #d1fae5; padding: 15px; border-radius: 8px; margin: 20px 0; font-weight: 600; color: #065f46; }
    .warning { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }
    .category { margin: 30px 0; }
    .task { margin: 10px 0 10px 20px; }
    .task-title { font-weight: 600; color: #1e293b; }
    .task-desc { color: #475569; margin-left: 10px; }
    .completed { color: #059669; }
    .incomplete { color: #64748b; }
    .footer { margin-top: 40px; padding: 20px; background: #f8fafc; border-radius: 8px; }
    @media print { body { margin: 20px; } }
  </style>
</head>
<body>
  <h1>📍 Local SEO Launch Checklist – 2026 Edition</h1>
  <div class="meta">Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
  <div class="progress">Progress: ${completedCount} of ${localSeoTasks.length} tasks completed (${Math.round(progress)}%)</div>
  <div class="warning">
    <strong>⚡ The Commitment:</strong> Do <strong>every item</strong> on this list <strong>every month</strong> for <strong>6 straight months</strong>. Most businesses quit after 6 weeks - don't be one of them.
  </div>
`;

    categories.forEach((category) => {
      const categoryTasks = localSeoTasks.filter(task => task.category === category);
      const completedInCategory = categoryTasks.filter(task => completedTasks.has(task.id)).length;

      html += `<div class="category">`;
      html += `<h2>${localSeoCategoryLabels[category].title}</h2>`;
      html += `<div class="meta">Progress: ${completedInCategory}/${categoryTasks.length}</div>`;

      categoryTasks.forEach((task) => {
        const isChecked = completedTasks.has(task.id);
        html += `<div class="task ${isChecked ? 'completed' : 'incomplete'}">`;
        html += `${isChecked ? '✅' : '⬜'} <span class="task-title">${task.title}</span>: <span class="task-desc">${task.description}</span>`;
        html += `</div>`;
      });

      html += `</div>`;
    });

    html += `
  <div class="footer">
    <h2>📅 Your Timeline</h2>
    <p><strong>Launch date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    <p><strong>6-month review date:</strong> ${sixMonthsLater.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    <p style="margin-top: 20px; font-weight: 600; color: #059669;">Print it. Pin it. Track it. Go dominate your city.</p>
  </div>
  <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; text-align: center;">
    Generated by Go-Live Checklist for Coders | thegolivechecklist.com
  </div>
</body>
</html>`;

    printWindow.document.write(html);
    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
    }, 250);
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
        <div className="sticky top-4 z-10 mb-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Local SEO Launch Checklist</h1>
                <p className="text-sm text-slate-600 dark:text-gray-400">2026 Edition - Battle-tested for local businesses</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-gray-300 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 border border-slate-300 dark:border-gray-600 rounded-lg transition-colors"
                title="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={handleExportReport}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-gray-300 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 border border-slate-300 dark:border-gray-600 rounded-lg transition-colors"
                title="Export as Markdown"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">MD</span>
              </button>
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-gray-300 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 border border-slate-300 dark:border-gray-600 rounded-lg transition-colors"
                title="Export as PDF"
              >
                <FileTextIcon className="w-4 h-4" />
                <span className="hidden sm:inline">PDF</span>
              </button>
              <button
                onClick={resetChecklist}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-gray-300 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 border border-slate-300 dark:border-gray-600 rounded-lg transition-colors"
                title="Reset Checklist"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700 dark:text-gray-300">
                  {completedCount} of {localSeoTasks.length} tasks completed
                </span>
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-gray-700 text-gray-300 border border-gray-600">
                  {progress === 0 && '📍 Not Started'}
                  {progress > 0 && progress < 40 && '🌱 Getting Visible'}
                  {progress >= 40 && progress < 70 && '📈 Growing Presence'}
                  {progress >= 70 && progress < 100 && '🔥 Strong Position'}
                  {progress === 100 && '👑 Market Dominator!'}
                </span>
              </div>
              <span className="text-sm font-bold text-green-500">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full transition-all duration-500 ease-out ${
                  progress === 100
                    ? 'bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600'
                    : progress >= 70
                    ? 'bg-gradient-to-r from-green-400 via-green-500 to-emerald-500'
                    : progress >= 40
                    ? 'bg-gradient-to-r from-yellow-400 via-green-400 to-green-500'
                    : 'bg-gradient-to-r from-orange-400 via-yellow-500 to-yellow-400'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>Not Visible</span>
              <span>Dominating Local Market</span>
            </div>
          </div>

          {isComplete && (
            <div className="mt-4 p-4 bg-green-900/30 border border-green-700 rounded-lg">
              <p className="text-sm font-medium text-green-400 text-center">
                🎉 Congratulations! All tasks completed. Keep this up for 6 months to dominate your local market!
              </p>
            </div>
          )}
        </div>

        <div className="mb-6 p-4 bg-orange-900/30 border border-orange-700 rounded-xl">
          <p className="text-sm text-orange-300 font-medium">
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
                className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-600 rounded-lg">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">
                      {localSeoCategoryLabels[category].title}
                    </h2>
                  </div>
                  <span className="text-sm font-medium text-gray-400">
                    {completedInCategory}/{tasks.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {tasks.map((task) => {
                    const isChecked = completedTasks.has(task.id);
                    const isCopied = copiedPrompt === task.id;

                    return (
                      <div
                        key={task.id}
                        className={`relative group p-4 rounded-lg border transition-all ${
                          isChecked
                            ? 'bg-green-900/20 border-green-700 shadow-sm'
                            : 'bg-gray-700 border-gray-600 hover:border-gray-500 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleTask(task.id)}
                            className="mt-0.5 hover:scale-110 transition-transform"
                          >
                            {isChecked ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <h3
                              className={`font-medium mb-1 ${
                                isChecked ? 'text-white' : 'text-gray-200'
                              }`}
                            >
                              {task.title}
                            </h3>
                            <p
                              className={`text-sm mb-2 ${
                                isChecked ? 'text-gray-400' : 'text-gray-400'
                              }`}
                            >
                              {task.description}
                            </p>
                            <button
                              onClick={(e) => handleCopyPrompt(task.id, task.aiPrompt, e)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                                isCopied
                                  ? 'bg-green-900/50 text-green-400 border border-green-700'
                                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500 border border-gray-500'
                              }`}
                              title="Copy AI Prompt"
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy AI Prompt</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Built for local service businesses who want to dominate their market</p>
        </div>
      </div>
    </div>
  );
};
