import { Box, Typography, Grid, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { WorkflowCard } from './WorkflowCard';
import type { WorkflowData } from './WorkflowCard';
import { useState } from 'react';
import { mockWorkflows } from '../mockWorkflows';

const sortOptions = [
  { value: 'exitDate', label: 'Exit date' },
  { value: 'nameAZ', label: 'Name A-Z' },
  { value: 'nameZA', label: 'Name Z-A' },
];

function sortWorkflows(workflows: WorkflowData[], sortBy: string) {
  switch (sortBy) {
    case 'nameAZ':
      return [...workflows].sort((a, b) => a.name.localeCompare(b.name));
    case 'nameZA':
      return [...workflows].sort((a, b) => b.name.localeCompare(a.name));
    case 'exitDate':
    default:
      return [...workflows].sort((a, b) => new Date(a.exitDate).getTime() - new Date(b.exitDate).getTime());
  }
}

export function WorkflowOverview({ onWorkflowClick }: { onWorkflowClick: (id: string) => void }) {
  const [sortBy, setSortBy] = useState('exitDate');
  const sortedWorkflows = sortWorkflows(mockWorkflows, sortBy);
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, border: '1px solid #e0e0e0', bgcolor: '#fafafa' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1 }}>Ongoing Processes</Typography>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="sort-by-label">Sort by</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sortBy}
            label="Sort by"
            onChange={e => setSortBy(e.target.value)}
          >
            {sortOptions.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '1rem', mb: 2, bgcolor: '#f5f5f5', borderRadius: 2, border: '1px solid #e0e0e0', minHeight: '64px', width: { xs: '1100px', lg: '1320px' }, paddingLeft: { xs: '32px', lg: '64px' }, paddingRight: { xs: '32px', lg: '64px' } }}>
        <span style={{ flex: '0 0 22%', display: 'flex', alignItems: 'center', justifyContent: 'left', minWidth: 56 }}>Employee</span>
        <span style={{ flex: '1 1 14%', display: 'flex', alignItems: 'center', justifyContent: 'left', minWidth: 120, maxWidth: 420, textAlign: 'left' }}>Department</span>
        <span style={{ flex: '1 1 14%', display: 'flex', alignItems: 'center', justifyContent: 'left', minWidth: 120, textAlign: 'left' }}>Location</span>
        <span style={{ flex: '1 1 14%', display: 'flex', alignItems: 'center', justifyContent: 'left', minWidth: 120, textAlign: 'left' }}>Exit Date</span>
        <span style={{ flex: '1 1 36%', display: 'flex', gap: 18, alignItems: 'center', minWidth: 320 }}>
          <span style={{ minWidth: 60, textAlign: 'center' }}>HR</span>
          <span style={{ minWidth: 60, textAlign: 'center' }}>IT</span>
          <span style={{ minWidth: 60, textAlign: 'center' }}>Finance</span>
          <span style={{ minWidth: 60, textAlign: 'center' }}>Team</span>
        </span>
      </Box>
      <Grid container spacing={0.5}>
        {sortedWorkflows.map((wf) => (
          <Box key={wf.id} sx={{ mb: 0.5 }}>
            <WorkflowCard data={wf} onNameClick={() => onWorkflowClick(wf.id)} />
          </Box>
        ))}
      </Grid>
    </Paper>
  );
}
