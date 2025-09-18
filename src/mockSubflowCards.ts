export type SubflowCheckpoint = {
  id: string;
  text: string;
};

export type SubflowCard = {
  id: string;
  areaIds: string[];
  name: string;
  useCase: string;
  checkpointIds: string[];
};

export const subflowCards: SubflowCard[] = [
  {
    id: 'hr-voluntary',
    areaIds: ['b7e2c7e2-1a2b-4c3d-8e9f-1a2b3c4d5e6f'],
    name: 'Voluntary Resignation – Standard HR Process',
    useCase: 'Employee resigns voluntarily, HR manages the administrative and cultural exit.',
    checkpointIds: [
      'hr-vol-1', 'hr-vol-2', 'hr-vol-3', 'hr-vol-4', 'hr-vol-5', 'hr-vol-6', 'hr-vol-7', 'hr-vol-8', 'hr-vol-9'
    ],
  },
  {
    id: 'hr-termination',
    areaIds: ['b7e2c7e2-1a2b-4c3d-8e9f-1a2b3c4d5e6f'],
    name: 'Employer-Initiated Termination – Sensitive HR Process',
    useCase: 'Employer-initiated separation (e.g., restructuring, redundancy). HR ensures legal compliance and protects employer reputation.',
    checkpointIds: [
      'hr-term-1', 'hr-term-2', 'hr-term-3', 'hr-term-4', 'hr-term-5', 'hr-term-6', 'hr-term-7', 'hr-term-8', 'hr-term-9'
    ],
  },
];
