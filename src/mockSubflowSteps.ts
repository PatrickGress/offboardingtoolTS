export enum SubflowCheckpointClass {
  TextDocument = 'text document',
  Interview = 'interview',
}

// A minimal rich text document type (Slate.js-like)
export type RichTextNode = {
  type: 'paragraph' | 'heading' | 'list' | 'text';
  children: Array<RichTextNode> | string;
};

export type SubflowCheckpoint = {
  id: string;
  class: SubflowCheckpointClass;
  headline: string;
  description: string;
  body: RichTextNode[];
};

export const subflowSteps: SubflowCheckpoint[] = [
  // Voluntary Resignation – Standard HR Process
  {
    id: 'e2a1c7b2-1f3a-4b2c-9e8f-1a2b3c4d5e01',
    class: SubflowCheckpointClass.TextDocument,
    headline: 'Resignation Confirm',
    description: 'Formally confirm resignation (verify written form, send confirmation of receipt)',
    body: [],
  },
  {
    id: 'b3d2e7c1-2a4b-5c6d-7e8f-2b3c4d5e6f02',
    class: SubflowCheckpointClass.TextDocument,
    headline: 'Vacation/O.T. Check',
    description: 'Clarify remaining vacation days and overtime (coordinate with payroll)',
    body: [],
  },
  {
    id: 'c4e3f8d2-3b5c-6d7e-8f9a-3c4d5e6f7g03',
    class: SubflowCheckpointClass.TextDocument,
    headline: 'Exit Interview Prep',
    description: 'Prepare exit interview (questionnaire, scheduling, assign responsible HR)',
    body: [],
  },
  {
    id: 'd5f4g9e3-4c6d-7e8f-9a0b-4d5e6f7g8h04',
    class: SubflowCheckpointClass.TextDocument,
    headline: 'Conduct Interview',
    description: 'Conduct and document exit interview',
    body: [],
  },
  {
    id: 'e6g5h0f4-5d7e-8f9a-0b1c-5e6f7g8h9i05',
    class: SubflowCheckpointClass.TextDocument,
    headline: 'Reference Draft',
    description: 'Draft and finalize employment reference / certificate',
    body: [],
  },
  {
    id: 'f7h6i1g5-6e8f-9a0b-1c2d-6f7g8h9i0j06',
    class: SubflowCheckpointClass.TextDocument,
    headline: 'Benefits End',
    description: 'Terminate benefits and additional perks (insurance, allowances, bonuses)',
    body: [],
  },
  {
    id: 'g8i7j2h6-7f9a-0b1c-2d3e-7g8h9i0j1k07',
    class: SubflowCheckpointClass.TextDocument,
    headline: 'Deregistration',
    description: 'Administrative deregistration (social security, health insurance, authorities)',
    body: [],
  },
  {
    id: 'h9j8k3i7-8a0b-1c2d-3e4f-8h9i0j1k2l08',
    class: SubflowCheckpointClass.TextDocument,
    headline: 'Final Payroll',
    description: 'Coordinate final payroll and possible severance payment',
    body: [],
  },
  {
    id: 'i0k9l4j8-9b1c-2d3e-4f5g-9i0j1k2l3m09',
    class: SubflowCheckpointClass.TextDocument,
    headline: 'Close Docs',
    description: 'Close HR documentation in the system (archive process, complete audit log)',
    body: [],
  },
  // Employer-Initiated Termination – Sensitive HR Process
  {
    id: 'j1l0m5k9-0c2d-3e4f-5g6h-0j1k2l3m4n10',
    class: SubflowCheckpointClass.TextDocument,
    headline: 'Termination Docs',
    description: 'Review and prepare termination documents (legal compliance check)',
    body: [],
  },
  {
    id: 'k2m1n6l0-1d3e-4f5g-6h7i-1k2l3m4n5o11',
    class: SubflowCheckpointClass.TextDocument,
    headline: 'Termination Meeting',
    description: 'Organize and attend termination meeting',
    body: [],
  },
  {
    id: 'l3n2o7m1-2e4f-5g6h-7i8j-2l3m4n5o6p12',
    class: SubflowCheckpointClass.TextDocument,
    headline: 'Settlement Plan',
    description: 'Create settlement plan (deadlines, severance, possible release from duties)',
    body: [],
  },
  {
    id: 'm4o3p8n2-3f5g-6h7i-8j9k-3m4n5o6p7q13',
    class: SubflowCheckpointClass.TextDocument,
    headline: 'Support Measures',
    description: 'Offer support measures (outplacement, counseling, internal resources)',
    body: [],
  },
  {
    id: 'n5p4q9o3-4g6h-7i8j-9k0l-4n5o6p7q8r14',
    class: SubflowCheckpointClass.TextDocument,
    headline: 'Feedback Process',
    description: 'Initiate feedback process (exit questionnaire or interview, documented)',
    body: [],
  },
  {
    id: 'o6q5r0p4-5h7i-8j9k-0l1m-5o6p7q8r9s15',
    class: SubflowCheckpointClass.TextDocument,
    headline: 'Reference Approval',
    description: 'Draft and legally approve employment reference / certificate',
    body: [],
  },
  {
    id: 'p7r6s1q5-6i8j-9k0l-1m2n-6p7q8r9s0t16',
    class: SubflowCheckpointClass.TextDocument,
    headline: 'Benefits End',
    description: 'Terminate benefits, insurances, and special allowances',
    body: [],
  },
  {
    id: 'q8s7t2r6-7j9k-0l1m-2n3o-7q8r9s0t1u17',
    class: SubflowCheckpointClass.TextDocument,
    headline: 'Deregistration',
    description: 'Administrative deregistration (social security, health insurance, authorities)',
    body: [],
  },
  {
    id: 'r9t8u3s7-8k0l-1m2n-3o4p-8r9s0t1u2v18',
    class: SubflowCheckpointClass.TextDocument,
    headline: 'Close Docs',
    description: 'Close case documentation (HR system entry, legal archiving, compliance confirmation)',
    body: [],
  }
];
