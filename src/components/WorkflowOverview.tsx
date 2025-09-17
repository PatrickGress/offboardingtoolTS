import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fafafa' }}>
          <thead>
            <tr style={{ background: '#f5f5f5', borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0', height: 64 }}>
              <th style={{ width: '22%', minWidth: 56, textAlign: 'left', fontWeight: 600, fontSize: '1rem', paddingLeft: 78 }}>Employee</th>
              <th style={{ width: '14%', minWidth: 120, maxWidth: 420, textAlign: 'left', fontWeight: 600, fontSize: '1rem' }}>Department</th>
              <th style={{ width: '14%', minWidth: 120, textAlign: 'left', fontWeight: 600, fontSize: '1rem' }}>Location</th>
              <th style={{ width: '14%', minWidth: 120, textAlign: 'left', fontWeight: 600, fontSize: '1rem' }}>Exit Date</th>
              <th style={{ width: '36%', minWidth: 320, textAlign: 'left', fontWeight: 600, fontSize: '1rem', paddingRight: 24 }}>
                <span style={{ minWidth: 60, textAlign: 'center', display: 'inline-block' }}>HR</span>
                <span style={{ minWidth: 60, textAlign: 'center', display: 'inline-block' }}>IT</span>
                <span style={{ minWidth: 60, textAlign: 'center', display: 'inline-block' }}>Finance</span>
                <span style={{ minWidth: 60, textAlign: 'center', display: 'inline-block' }}>Team</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedWorkflows.map((wf, idx) => (
              <WorkflowCard key={wf.id} data={wf} onNameClick={() => onWorkflowClick(wf.id)} isTableRow={true} isLast={idx === sortedWorkflows.length - 1} />
            ))}
          </tbody>
        </table>
      </Box>
    </Paper>
  );
}
