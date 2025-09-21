// This file is now deprecated. Please use arrayHelpers, dateHelpers, and subflowHelpers instead.

// Workflow-related helper functions

export const getUnique = (arr: any[], key: string) => Array.from(new Set(arr.map(item => item[key]).filter(Boolean)));

export function getDateTrafficLight(exitDate: string): string {
  const exit = new Date(exitDate);
  const now = new Date();
  const diffDays = (exit.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  if (diffDays < 14) return 'red';
  if (diffDays < 30) return 'yellow';
  return 'green';
}

export function getSubflowTrafficLight(completion: string[], total: number): string {
  if (total === 0) return 'red';
  const percent = completion.length / total;
  if (percent < 0.5) return 'red';
  if (percent < 1) return 'yellow';
  return 'green';
}
