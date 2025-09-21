// Subflow-related helpers

export function getSubflowTrafficLight(completion: string[], total: number): string {
  if (total === 0) return 'red';
  if (completion.length === 0) return 'red';
  if (completion.length === total) return 'green';
  return 'yellow';
}
