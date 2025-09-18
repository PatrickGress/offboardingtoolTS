export type SubflowCheckpoint = {
  id: string;
  text: string;
};

export const subflowSteps: SubflowCheckpoint[] = [
  // Voluntary Resignation – Standard HR Process
  { id: 'hr-vol-1', text: 'Formally confirm resignation (verify written form, send confirmation of receipt)' },
  { id: 'hr-vol-2', text: 'Clarify remaining vacation days and overtime (coordinate with payroll)' },
  { id: 'hr-vol-3', text: 'Prepare exit interview (questionnaire, scheduling, assign responsible HR)' },
  { id: 'hr-vol-4', text: 'Conduct and document exit interview' },
  { id: 'hr-vol-5', text: 'Draft and finalize employment reference / certificate' },
  { id: 'hr-vol-6', text: 'Terminate benefits and additional perks (insurance, allowances, bonuses)' },
  { id: 'hr-vol-7', text: 'Administrative deregistration (social security, health insurance, authorities)' },
  { id: 'hr-vol-8', text: 'Coordinate final payroll and possible severance payment' },
  { id: 'hr-vol-9', text: 'Close HR documentation in the system (archive process, complete audit log)' },
  // Employer-Initiated Termination – Sensitive HR Process
  { id: 'hr-term-1', text: 'Review and prepare termination documents (legal compliance check)' },
  { id: 'hr-term-2', text: 'Organize and attend termination meeting' },
  { id: 'hr-term-3', text: 'Create settlement plan (deadlines, severance, possible release from duties)' },
  { id: 'hr-term-4', text: 'Offer support measures (outplacement, counseling, internal resources)' },
  { id: 'hr-term-5', text: 'Initiate feedback process (exit questionnaire or interview, documented)' },
  { id: 'hr-term-6', text: 'Draft and legally approve employment reference / certificate' },
  { id: 'hr-term-7', text: 'Terminate benefits, insurances, and special allowances' },
  { id: 'hr-term-8', text: 'Administrative deregistration (social security, health insurance, authorities)' },
  { id: 'hr-term-9', text: 'Close case documentation (HR system entry, legal archiving, compliance confirmation)' },
];
