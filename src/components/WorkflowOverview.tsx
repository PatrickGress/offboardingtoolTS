import { Box, Typography, Grid, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { WorkflowCard } from './WorkflowCard';
import type { WorkflowData } from './WorkflowCard';
import { useState } from 'react';
import { mockWorkflows } from '../mockCards';

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
    <Paper elevation={0} sx={{ p: 0, borderRadius: 0, border: 'none', bgcolor: '#fafafa' }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        bgcolor: '#f5f5f5',
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        width: { xs: '1100px', lg: '1320px' },
        minHeight: '64px',
        mb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1, pl: 4 }}>
            Ongoing Processes ({sortedWorkflows.length})
          </Typography>
          <FormControl size="small" sx={{ minWidth: 180, pr: 4 }}>
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
        <Box sx={{ width: '100%', height: '1px', bgcolor: '#e0e0e0', mb: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '1rem', mb: 0, bgcolor: 'inherit', borderRadius: 0, minHeight: '64px', width: '100%' }}>
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
      </Box>
      <Grid container spacing={0} sx={{ borderRadius: 0, boxShadow: 'none', bgcolor: '#fafafa', m: 0, p: 0 }}>
        {sortedWorkflows.map((wf, idx) => (
          <Box key={wf.id} sx={{ m: 0, p: 0, borderBottom: idx < sortedWorkflows.length - 1 ? '1px solid #e0e0e0' : 'none', borderRadius: 0, boxShadow: 'none', bgcolor: '#fafafa' }}>
            <WorkflowCard data={wf} onNameClick={() => onWorkflowClick(wf.id)} />
          </Box>
        ))}
      </Grid>
    </Paper>
  );
}
