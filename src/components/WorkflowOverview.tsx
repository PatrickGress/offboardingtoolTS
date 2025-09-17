import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { WorkflowCard } from './WorkflowCard';
import type { WorkflowData } from './WorkflowCard';
import { useState } from 'react';
import { mockWorkflows } from '../mockCards';

const sortOptions = [
  { value: 'exitDate', label: 'Exit Date (soonest)' },
  { value: 'exitDateLatest', label: 'Exit Date (latest)' },
  { value: 'nameAZ', label: 'Name A-Z' },
  { value: 'nameZA', label: 'Name Z-A' },
];

function sortWorkflows(workflows: WorkflowData[], sortBy: string) {
  switch (sortBy) {
    case 'nameAZ':
      return [...workflows].sort((a, b) => a.name.localeCompare(b.name));
    case 'nameZA':
      return [...workflows].sort((a, b) => b.name.localeCompare(a.name));
    case 'exitDateLatest':
      return [...workflows].sort((a, b) => new Date(b.exitDate).getTime() - new Date(a.exitDate).getTime());
    case 'exitDate':
    default:
      return [...workflows].sort((a, b) => new Date(a.exitDate).getTime() - new Date(b.exitDate).getTime());
  }
}

export function WorkflowOverview({ onWorkflowClick, workflows }: { onWorkflowClick: (id: string) => void; workflows?: WorkflowData[] }) {
  const [sortBy, setSortBy] = useState('exitDate');
  const sortedWorkflows = sortWorkflows(workflows ?? mockWorkflows, sortBy);
  return (
    <Paper elevation={0} sx={{ p: 0, borderRadius: 2, border: '2px solid #e0e0e0', bgcolor: '#fafafa' }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        bgcolor: '#f5f5f5',
        borderRadius: 2,
        border: 'none',
        width: { xs: '1100px', lg: '1320px' },
        minHeight: '64px',
        mb: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1, pl: 4 }}>
            Ongoing Processes ({sortedWorkflows.length})
          </Typography>
          <FormControl size="small" sx={{ minWidth: 220, pr: 4 }}>
            <InputLabel id="sort-by-label">Sort by</InputLabel>
            <Select
              labelId="sort-by-label"
              value={sortBy}
              label="Sort by"
              onChange={e => setSortBy(e.target.value)}
              sx={{ width: 220, textAlign: 'left' }}
              MenuProps={{ PaperProps: { sx: { minWidth: 220 } } }}
            >
              {sortOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value} sx={{ textAlign: 'left' }}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fafafa' }}>
          <thead>
            <tr style={{ background: '#f5f5f5', borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0', height: 64 }}>
              <th style={{ width: '22%', minWidth: 56, textAlign: 'left', fontWeight: 600, fontSize: '1rem', paddingLeft: 24 }}>Employee</th>
              <th style={{ width: '14%', minWidth: 120, maxWidth: 420, textAlign: 'left', fontWeight: 600, fontSize: '1rem' }}>Department</th>
              <th style={{ width: '14%', minWidth: 120, textAlign: 'left', fontWeight: 600, fontSize: '1rem' }}>Location</th>
              <th style={{ width: '14%', minWidth: 120, textAlign: 'left', fontWeight: 600, fontSize: '1rem' }}>Exit Date</th>
              <th style={{ width: '9%', minWidth: 60, textAlign: 'center', fontWeight: 600, fontSize: '1rem' }}>HR</th>
              <th style={{ width: '9%', minWidth: 60, textAlign: 'center', fontWeight: 600, fontSize: '1rem' }}>IT</th>
              <th style={{ width: '9%', minWidth: 60, textAlign: 'center', fontWeight: 600, fontSize: '1rem' }}>Finance</th>
              <th style={{ width: '9%', minWidth: 60, textAlign: 'center', fontWeight: 600, fontSize: '1rem' }}>Team</th>
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
