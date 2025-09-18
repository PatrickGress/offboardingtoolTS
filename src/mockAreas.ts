export type Area = { name: string; shortname: string };

export const initialAreas: Area[] = [
  { name: 'HR', shortname: 'HR' },
  { name: 'Finance', shortname: 'FIN' },
  { name: 'IT', shortname: 'IT' },
  { name: 'Team', shortname: 'TEAM' },
];

export const subflowMock: Record<string, string[]> = {
  HR: ['Onboarding', 'Exit Interview'],
  Finance: ['Payroll', 'Expense Approval'],
  IT: ['Laptop Return', 'Account Deactivation'],
  Team: ['Knowledge Transfer', 'Farewell'],
};
