export type SubflowCheckpoint = {
  id: string;
  text: string;
};

export type SubflowCard = {
  id: string;
  areaId: string;
  name: string;
  useCase: string;
  checkpointIds: string[];
  newVersionId?: string;
};

export const subflowCards: SubflowCard[] = [
  // HR
  {
    id: 'e2a1c7b2-1f3a-4b2c-9e8f-1a2b3c4d5e01',
    areaId: 'b7e2c7e2-1a2b-4c3d-8e9f-1a2b3c4d5e6f',
    name: 'Voluntary Resignation – Standard HR Process',
    useCase: 'Employee resigns voluntarily, HR manages the administrative and cultural exit.',
    checkpointIds: [
      'e2a1c7b2-1f3a-4b2c-9e8f-1a2b3c4d5e01',
      'b3d2e7c1-2a4b-5c6d-7e8f-2b3c4d5e6f02',
      'c4e3f8d2-3b5c-6d7e-8f9a-3c4d5e6f7g03',
      'd5f4g9e3-4c6d-7e8f-9a0b-4d5e6f7g8h04',
      'e6g5h0f4-5d7e-8f9a-0b1c-5e6f7g8h9i05',
      'f7h6i1g5-6e8f-9a0b-1c2d-6f7g8h9i0j06',
      'g8i7j2h6-7f9a-0b1c-2d3e-7g8h9i0j1k07',
      'h9j8k3i7-8a0b-1c2d-3e4f-8h9i0j1k2l08',
      'i0k9l4j8-9b1c-2d3e-4f5g-9i0j1k2l3m09',
    ],
    newVersionId: '',
  },
  {
    id: 'j1l0m5k9-0c2d-3e4f-5g6h-0j1k2l3m4n10',
    areaId: 'b7e2c7e2-1a2b-4c3d-8e9f-1a2b3c4d5e6f',
    name: 'Employer-Initiated Termination – Sensitive HR Process',
    useCase: 'Employer-initiated separation (e.g., restructuring, redundancy). HR ensures legal compliance and protects employer reputation.',
    checkpointIds: [
      'j1l0m5k9-0c2d-3e4f-5g6h-0j1k2l3m4n10',
      'k2m1n6l0-1d3e-4f5g-6h7i-1k2l3m4n5o11',
      'l3n2o7m1-2e4f-5g6h-7i8j-2l3m4n5o6p12',
      'm4o3p8n2-3f5g-6h7i-8j9k-3m4n5o6p7q13',
      'n5p4q9o3-4g6h-7i8j-9k0l-4n5o6p7q8r14',
      'o6q5r0p4-5h7i-8j9k-0l1m-5o6p7q8r9s15',
      'p7r6s1q5-6i8j-9k0l-1m2n-6p7q8r9s0t16',
      'q8s7t2r6-7j9k-0l1m-2n3o-7q8r9s0t1u17',
      'r9t8u3s7-8k0l-1m2n-3o4p-8r9s0t1u2v18',
    ],
    newVersionId: '',
  },
  // Finance
  {
    id: 'f1a2b3c4-5d6e-7f8a-9b0c-1d2e3f4a5b6c',
    areaId: 'c8f3d8e3-2b3c-5d4e-9f0a-2b3c4d5e6f7a',
    name: 'Voluntary Resignation – Standard HR Process',
    useCase: 'Employee resigns voluntarily, HR manages the administrative and cultural exit.',
    checkpointIds: [
      'e2a1c7b2-1f3a-4b2c-9e8f-1a2b3c4d5e01',
      'b3d2e7c1-2a4b-5c6d-7e8f-2b3c4d5e6f02',
      'c4e3f8d2-3b5c-6d7e-8f9a-3c4d5e6f7g03',
      'd5f4g9e3-4c6d-7e8f-9a0b-4d5e6f7g8h04',
      'e6g5h0f4-5d7e-8f9a-0b1c-5e6f7g8h9i05',
      'f7h6i1g5-6e8f-9a0b-1c2d-6f7g8h9i0j06',
      'g8i7j2h6-7f9a-0b1c-2d3e-7g8h9i0j1k07',
      'h9j8k3i7-8a0b-1c2d-3e4f-8h9i0j1k2l08',
      'i0k9l4j8-9b1c-2d3e-4f5g-9i0j1k2l3m09',
    ],
    newVersionId: '',
  },
  {
    id: 'g2b3c4d5-6e7f-8a9b-0c1d-2e3f4a5b6c7d',
    areaId: 'c8f3d8e3-2b3c-5d4e-9f0a-2b3c4d5e6f7a',
    name: 'Employer-Initiated Termination – Sensitive HR Process',
    useCase: 'Employer-initiated separation (e.g., restructuring, redundancy). HR ensures legal compliance and protects employer reputation.',
    checkpointIds: [
      'j1l0m5k9-0c2d-3e4f-5g6h-0j1k2l3m4n10',
      'k2m1n6l0-1d3e-4f5g-6h7i-1k2l3m4n5o11',
      'l3n2o7m1-2e4f-5g6h-7i8j-2l3m4n5o6p12',
      'm4o3p8n2-3f5g-6h7i-8j9k-3m4n5o6p7q13',
      'n5p4q9o3-4g6h-7i8j-9k0l-4n5o6p7q8r14',
      'o6q5r0p4-5h7i-8j9k-0l1m-5o6p7q8r9s15',
      'p7r6s1q5-6i8j-9k0l-1m2n-6p7q8r9s0t16',
      'q8s7t2r6-7j9k-0l1m-2n3o-7q8r9s0t1u17',
      'r9t8u3s7-8k0l-1m2n-3o4p-8r9s0t1u2v18',
    ],
    newVersionId: '',
  },
  // IT
  {
    id: 'h1c2d3e4-5f6a-7b8c-9d0e-1f2a3b4c5d6e',
    areaId: 'd9a4e9f4-3c4d-6e5f-0a1b-3c4d5e6f7a8b',
    name: 'Voluntary Resignation – Standard HR Process',
    useCase: 'Employee resigns voluntarily, HR manages the administrative and cultural exit.',
    checkpointIds: [
      'e2a1c7b2-1f3a-4b2c-9e8f-1a2b3c4d5e01',
      'b3d2e7c1-2a4b-5c6d-7e8f-2b3c4d5e6f02',
      'c4e3f8d2-3b5c-6d7e-8f9a-3c4d5e6f7g03',
      'd5f4g9e3-4c6d-7e8f-9a0b-4d5e6f7g8h04',
      'e6g5h0f4-5d7e-8f9a-0b1c-5e6f7g8h9i05',
      'f7h6i1g5-6e8f-9a0b-1c2d-6f7g8h9i0j06',
      'g8i7j2h6-7f9a-0b1c-2d3e-7g8h9i0j1k07',
      'h9j8k3i7-8a0b-1c2d-3e4f-8h9i0j1k2l08',
      'i0k9l4j8-9b1c-2d3e-4f5g-9i0j1k2l3m09',
    ],
    newVersionId: '',
  },
  {
    id: 'i2d3e4f5-6a7b-8c9d-0e1f-2a3b4c5d6e7f',
    areaId: 'd9a4e9f4-3c4d-6e5f-0a1b-3c4d5e6f7a8b',
    name: 'Employer-Initiated Termination – Sensitive HR Process',
    useCase: 'Employer-initiated separation (e.g., restructuring, redundancy). HR ensures legal compliance and protects employer reputation.',
    checkpointIds: [
      'j1l0m5k9-0c2d-3e4f-5g6h-0j1k2l3m4n10',
      'k2m1n6l0-1d3e-4f5g-6h7i-1k2l3m4n5o11',
      'l3n2o7m1-2e4f-5g6h-7i8j-2l3m4n5o6p12',
      'm4o3p8n2-3f5g-6h7i-8j9k-3m4n5o6p7q13',
      'n5p4q9o3-4g6h-7i8j-9k0l-4n5o6p7q8r14',
      'o6q5r0p4-5h7i-8j9k-0l1m-5o6p7q8r9s15',
      'p7r6s1q5-6i8j-9k0l-1m2n-6p7q8r9s0t16',
      'q8s7t2r6-7j9k-0l1m-2n3o-7q8r9s0t1u17',
      'r9t8u3s7-8k0l-1m2n-3o4p-8r9s0t1u2v18',
    ],
    newVersionId: '',
  },
  // Team
  {
    id: 'j3k4l5m6-7n8o-9p0q-1r2s-3t4u5v6w7x8y',
    areaId: 'e0b5f0a5-4d5e-7f6a-1b2c-4d5e6f7a8b9c',
    name: 'Voluntary Resignation – Standard HR Process',
    useCase: 'Employee resigns voluntarily, HR manages the administrative and cultural exit.',
    checkpointIds: [
      'e2a1c7b2-1f3a-4b2c-9e8f-1a2b3c4d5e01',
      'b3d2e7c1-2a4b-5c6d-7e8f-2b3c4d5e6f02',
      'c4e3f8d2-3b5c-6d7e-8f9a-3c4d5e6f7g03',
      'd5f4g9e3-4c6d-7e8f-9a0b-4d5e6f7g8h04',
      'e6g5h0f4-5d7e-8f9a-0b1c-5e6f7g8h9i05',
      'f7h6i1g5-6e8f-9a0b-1c2d-6f7g8h9i0j06',
      'g8i7j2h6-7f9a-0b1c-2d3e-7g8h9i0j1k07',
      'h9j8k3i7-8a0b-1c2d-3e4f-8h9i0j1k2l08',
      'i0k9l4j8-9b1c-2d3e-4f5g-9i0j1k2l3m09',
    ],
    newVersionId: '',
  },
  {
    id: 'k4l5m6n7-8o9p-0q1r-2s3t-4u5v6w7x8y9z',
    areaId: 'e0b5f0a5-4d5e-7f6a-1b2c-4d5e6f7a8b9c',
    name: 'Employer-Initiated Termination – Sensitive HR Process',
    useCase: 'Employer-initiated separation (e.g., restructuring, redundancy). HR ensures legal compliance and protects employer reputation.',
    checkpointIds: [
      'j1l0m5k9-0c2d-3e4f-5g6h-0j1k2l3m4n10',
      'k2m1n6l0-1d3e-4f5g-6h7i-1k2l3m4n5o11',
      'l3n2o7m1-2e4f-5g6h-7i8j-2l3m4n5o6p12',
      'm4o3p8n2-3f5g-6h7i-8j9k-3m4n5o6p7q13',
      'n5p4q9o3-4g6h-7i8j-9k0l-4n5o6p7q8r14',
      'o6q5r0p4-5h7i-8j9k-0l1m-5o6p7q8r9s15',
      'p7r6s1q5-6i8j-9k0l-1m2n-6p7q8r9s0t16',
      'q8s7t2r6-7j9k-0l1m-2n3o-7q8r9s0t1u17',
      'r9t8u3s7-8k0l-1m2n-3o4p-8r9s0t1u2v18',
    ],
    newVersionId: '',
  },
];
