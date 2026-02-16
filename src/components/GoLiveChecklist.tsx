import { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Download,
  RotateCcw,
  Rocket,
  Search,
  Scale,
  Accessibility,
  Wrench,
  FileText,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { checklistTasks, categoryLabels, type ChecklistTask } from '../data/checklistTasks';
import { useChecklist } from '../hooks/useChecklist';

const categoryIcons = {
  seo: Search,
  legal: Scale,
  accessibility: Accessibility,
  technical: Wrench,
};

export const GoLiveChecklist = () => {
  const { completedTasks, completedCount, progress, toggleTask, resetChecklist, isComplete } =
    useChecklist(checklistTasks.length);

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
    const categories = ['seo', 'legal', 'accessibility', 'technical'] as const;

    let report = '# Go-Live Checklist Report\n\n';
    report += `Generated: ${new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}\n\n`;
    report += `**Progress:** ${completedCount} of ${checklistTasks.length} tasks completed (${Math.round(progress)}%)\n\n`;
    report += '---\n\n';

    categories.forEach((category) => {
      const categoryTasks = checklistTasks.filter(task => task.category === category);
      const completedInCategory = categoryTasks.filter(task => completedTasks.has(task.id)).length;

      report += `## ${categoryLabels[category].title}\n\n`;
      report += `Progress: ${completedInCategory}/${categoryTasks.length}\n\n`;

      categoryTasks.forEach((task) => {
        const isChecked = completedTasks.has(task.id);
        report += `- [${isChecked ? 'x' : ' '}] **${task.title}**: ${task.description}\n`;
      });

      report += '\n';
    });

    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `go-live-checklist-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    const categories = ['seo', 'legal', 'accessibility', 'technical'] as const;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let html = `
<!DOCTYPE html>
<html>
<head>
  <title>Go-Live Checklist Report</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }
    h1 { color: #1e293b; border-bottom: 3px solid #3b82f6; padding-bottom: 10px; }
    h2 { color: #334155; margin-top: 30px; }
    .meta { color: #64748b; font-size: 14px; margin: 20px 0; }
    .progress { background: #e2e8f0; padding: 15px; border-radius: 8px; margin: 20px 0; font-weight: 600; }
    .category { margin: 30px 0; }
    .task { margin: 10px 0 10px 20px; }
    .task-title { font-weight: 600; color: #1e293b; }
    .task-desc { color: #475569; margin-left: 10px; }
    .completed { color: #059669; }
    .incomplete { color: #64748b; }
    @media print { body { margin: 20px; } }
  </style>
</head>
<body>
  <h1>🚀 Go-Live Checklist Report</h1>
  <div class="meta">Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
  <div class="progress">Progress: ${completedCount} of ${checklistTasks.length} tasks completed (${Math.round(progress)}%)</div>
`;

    categories.forEach((category) => {
      const categoryTasks = checklistTasks.filter(task => task.category === category);
      const completedInCategory = categoryTasks.filter(task => completedTasks.has(task.id)).length;

      html += `<div class="category">`;
      html += `<h2>${categoryLabels[category].title}</h2>`;
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
  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
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

  const tasksByCategory = checklistTasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<ChecklistTask['category'], ChecklistTask[]>);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="sticky top-4 z-10 mb-8 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Rocket className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Go-Live Checklist</h1>
                <p className="text-sm text-slate-600">Production readiness tracker</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleExportReport}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors"
                title="Export as Markdown"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">MD</span>
              </button>
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors"
                title="Export as PDF"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">PDF</span>
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
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">
                  {completedCount} of {checklistTasks.length} tasks completed
                </span>
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 border border-slate-300">
                  {progress === 0 && '🚧 Sketchy'}
                  {progress > 0 && progress < 40 && '🔨 Getting Started'}
                  {progress >= 40 && progress < 70 && '⚡ Making Progress'}
                  {progress >= 70 && progress < 100 && '🚀 Almost Ready'}
                  {progress === 100 && '✨ Production Ready!'}
                </span>
              </div>
              <span className="text-sm font-bold text-primary-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full transition-all duration-500 ease-out ${
                  progress === 100
                    ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-green-600'
                    : progress >= 70
                    ? 'bg-gradient-to-r from-blue-500 via-primary-500 to-primary-600'
                    : progress >= 40
                    ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500'
                    : 'bg-gradient-to-r from-red-400 via-red-500 to-rose-500'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-slate-500">
              <span>Sketchy</span>
              <span>Production Ready</span>
            </div>
          </div>

          {isComplete && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-800 text-center">
                🎉 Congratulations! All tasks completed. You're ready to go live!
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {(['seo', 'legal', 'accessibility', 'technical'] as const).map((category) => {
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
                    <div className="p-2 bg-primary-50 rounded-lg">
                      <IconComponent className="w-5 h-5 text-primary-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {categoryLabels[category].title}
                    </h2>
                  </div>
                  <span className="text-sm font-medium text-slate-600">
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
                        className={`relative group p-4 rounded-xl border-2 transition-all ${
                          isChecked
                            ? 'bg-primary-50/50 border-primary-200 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleTask(task.id)}
                            className="mt-0.5 hover:scale-110 transition-transform"
                          >
                            {isChecked ? (
                              <CheckCircle2 className="w-5 h-5 text-primary-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-400" />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <h3
                              className={`font-medium mb-1 ${
                                isChecked ? 'text-primary-900' : 'text-slate-900'
                              }`}
                            >
                              {task.title}
                            </h3>
                            <p
                              className={`text-sm mb-2 ${
                                isChecked ? 'text-primary-700' : 'text-slate-600'
                              }`}
                            >
                              {task.description}
                            </p>
                            <button
                              onClick={(e) => handleCopyPrompt(task.id, task.aiPrompt, e)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                                isCopied
                                  ? 'bg-green-100 text-green-700 border border-green-300'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
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

        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Built with React 19, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
};
