import { Box, Typography, Grid } from '@mui/material';
import { WorkflowCard } from './WorkflowCard';
import type { WorkflowData } from './WorkflowCard';

const mockWorkflows: WorkflowData[] = [
  {
    id: '1',
    name: 'Onboarding',
    dueDate: '2025-09-20',
    picture: 'https://mui.com/static/images/avatar/1.jpg',
    subflows: [
      { name: 'Account Setup', status: { type: 'ongoing', step: 1, total: 3 } },
      { name: 'Training', status: { type: 'not started' } },
      { name: 'Documentation', status: { type: 'done' } },
      { name: 'Access Rights', status: { type: 'ongoing', step: 2, total: 4 } },
    ],
  },
  {
    id: '2',
    name: 'Offboarding',
    dueDate: '2025-09-25',
    picture: 'https://mui.com/static/images/avatar/2.jpg',
    subflows: [
      { name: 'Revoke Access', status: { type: 'not started' } },
      { name: 'Exit Interview', status: { type: 'ongoing', step: 1, total: 2 } },
      { name: 'Asset Return', status: { type: 'done' } },
      { name: 'Final Payroll', status: { type: 'done' } },
    ],
  },
];

export function WorkflowOverview({ onWorkflowClick }: { onWorkflowClick: (id: string) => void }) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Workflow Overview</Typography>
      <Grid container spacing={2}>
        {mockWorkflows.map((wf) => (
          <Box key={wf.id} sx={{ mb: 2 }}>
            <WorkflowCard data={wf} onNameClick={() => onWorkflowClick(wf.id)} />
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
