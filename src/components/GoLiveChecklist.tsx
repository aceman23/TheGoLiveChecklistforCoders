import { useEffect, useRef } from 'react';
import {
  CheckCircle2,
  Circle,
  Download,
  RotateCcw,
  Rocket,
  Search,
  Scale,
  Accessibility,
  Wrench
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
                {completedCount} of {checklistTasks.length} tasks completed
              </span>
              <span className="text-sm font-bold text-primary-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
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

                    return (
                      <button
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          isChecked
                            ? 'bg-primary-50/50 border-primary-200 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {isChecked ? (
                              <CheckCircle2 className="w-5 h-5 text-primary-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3
                              className={`font-medium mb-1 ${
                                isChecked ? 'text-primary-900' : 'text-slate-900'
                              }`}
                            >
                              {task.title}
                            </h3>
                            <p
                              className={`text-sm ${
                                isChecked ? 'text-primary-700' : 'text-slate-600'
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
          <p>Built with React 19, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
};
