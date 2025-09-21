// Date-related helpers

export function getDateTrafficLight(exitDate: string): string {
  const exit = new Date(exitDate);
  const now = new Date();
  const diffDays = (exit.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  if (diffDays < 14) return 'red';
  if (diffDays < 30) return 'yellow';
  return 'green';
}
