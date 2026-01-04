import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'go-live-checklist-state';

export interface ChecklistState {
  completedTasks: Set<string>;
  totalTasks: number;
  completedCount: number;
  progress: number;
}

export const useChecklist = (totalTasks: number) => {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return new Set(parsed);
      }
    } catch (error) {
      console.error('Failed to load checklist state:', error);
    }
    return new Set<string>();
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completedTasks)));
    } catch (error) {
      console.error('Failed to save checklist state:', error);
    }
  }, [completedTasks]);

  const toggleTask = useCallback((taskId: string) => {
    setCompletedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  }, []);

  const resetChecklist = useCallback(() => {
    setCompletedTasks(new Set());
  }, []);

  const completedCount = completedTasks.size;
  const progress = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  return {
    completedTasks,
    completedCount,
    progress,
    toggleTask,
    resetChecklist,
    isComplete: progress === 100,
  };
};
