import { Box, Typography, Grid, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { WorkflowCard } from './WorkflowCard';
import type { WorkflowData } from './WorkflowCard';
import { useState } from 'react';

const sortOptions = [
  { value: 'exitDate', label: 'Exit date' },
  { value: 'nameAZ', label: 'Name A-Z' },
  { value: 'nameZA', label: 'Name Z-A' },
];

const mockWorkflows: WorkflowData[] = [
  {
    id: '1',
    name: 'Hans Herman',
    email: 'hans.herman@example.com',
    department: 'IT',
    location: 'Berlin',
    exitDate: '2025-09-20',
    dueDate: '2025-09-20',
    picture: 'https://mui.com/static/images/avatar/1.jpg',
    statuses: [
      { label: 'HR', color: 'yellow', completion: '1/3' },
      { label: 'IT', color: 'red', completion: '0/2' },
      { label: 'Finance', color: 'green', completion: '2/2' },
      { label: 'Team', color: 'yellow', completion: '2/4' },
    ],
    subflows: [],
  },
  {
    id: '2',
    name: 'Lisa Schmidt',
    email: 'lisa.schmidt@example.com',
    department: 'HR',
    location: 'Munich',
    exitDate: '2025-09-25',
    dueDate: '2025-09-25',
    picture: 'https://mui.com/static/images/avatar/2.jpg',
    statuses: [
      { label: 'HR', color: 'red', completion: '0/1' },
      { label: 'IT', color: 'yellow', completion: '1/2' },
      { label: 'Finance', color: 'green', completion: '1/1' },
      { label: 'Team', color: 'green', completion: '1/1' },
    ],
    subflows: [],
  },
  {
    id: '3',
    name: 'Markus Braun',
    email: 'markus.braun@example.com',
    department: 'Finance',
    location: 'Berlin',
    exitDate: '2025-10-01',
    dueDate: '2025-10-01',
    picture: 'https://mui.com/static/images/avatar/3.jpg',
    statuses: [
      { label: 'HR', color: 'green', completion: '2/2' },
      { label: 'IT', color: 'yellow', completion: '1/3' },
      { label: 'Finance', color: 'red', completion: '0/2' },
      { label: 'Team', color: 'yellow', completion: '2/4' },
    ],
    subflows: [],
  },
  {
    id: '4',
    name: 'Julia Meier',
    email: 'julia.meier@example.com',
    department: 'IT',
    location: 'Hamburg',
    exitDate: '2025-10-05',
    dueDate: '2025-10-05',
    picture: 'https://mui.com/static/images/avatar/4.jpg',
    statuses: [
      { label: 'HR', color: 'yellow', completion: '1/2' },
      { label: 'IT', color: 'green', completion: '3/3' },
      { label: 'Finance', color: 'yellow', completion: '1/2' },
      { label: 'Team', color: 'red', completion: '0/2' },
    ],
    subflows: [],
  },
  {
    id: '5',
    name: 'Peter Müller',
    email: 'peter.mueller@example.com',
    department: 'HR',
    location: 'Berlin',
    exitDate: '2025-10-10',
    dueDate: '2025-10-10',
    picture: 'https://mui.com/static/images/avatar/5.jpg',
    statuses: [
      { label: 'HR', color: 'green', completion: '2/2' },
      { label: 'IT', color: 'yellow', completion: '2/4' },
      { label: 'Finance', color: 'red', completion: '0/1' },
      { label: 'Team', color: 'yellow', completion: '1/2' },
    ],
    subflows: [],
  },
  {
    id: '6',
    name: 'Anna Fischer',
    email: 'anna.fischer@example.com',
    department: 'Finance',
    location: 'Munich',
    exitDate: '2025-10-15',
    dueDate: '2025-10-15',
    picture: 'https://mui.com/static/images/avatar/6.jpg',
    statuses: [
      { label: 'HR', color: 'red', completion: '0/2' },
      { label: 'IT', color: 'green', completion: '2/2' },
      { label: 'Finance', color: 'yellow', completion: '1/3' },
      { label: 'Team', color: 'green', completion: '2/2' },
    ],
    subflows: [],
  },
  {
    id: '7',
    name: 'Tom Becker',
    email: 'tom.becker@example.com',
    department: 'IT',
    location: 'Hamburg',
    exitDate: '2025-10-20',
    dueDate: '2025-10-20',
    picture: 'https://mui.com/static/images/avatar/7.jpg',
    statuses: [
      { label: 'HR', color: 'yellow', completion: '1/2' },
      { label: 'IT', color: 'yellow', completion: '2/3' },
      { label: 'Finance', color: 'green', completion: '2/2' },
      { label: 'Team', color: 'red', completion: '0/1' },
    ],
    subflows: [],
  },
  {
    id: '8',
    name: 'Sophie Klein',
    email: 'sophie.klein@example.com',
    department: 'Finance',
    location: 'Berlin',
    exitDate: '2025-10-25',
    dueDate: '2025-10-25',
    picture: 'https://mui.com/static/images/avatar/8.jpg',
    statuses: [
      { label: 'HR', color: 'green', completion: '2/2' },
      { label: 'IT', color: 'red', completion: '0/2' },
      { label: 'Finance', color: 'yellow', completion: '1/2' },
      { label: 'Team', color: 'yellow', completion: '1/3' },
    ],
    subflows: [],
  },
  {
    id: '9',
    name: 'Max Weber',
    email: 'max.weber@example.com',
    department: 'HR',
    location: 'Munich',
    exitDate: '2025-10-30',
    dueDate: '2025-10-30',
    picture: 'https://mui.com/static/images/avatar/9.jpg',
    statuses: [
      { label: 'HR', color: 'yellow', completion: '1/2' },
      { label: 'IT', color: 'green', completion: '2/2' },
      { label: 'Finance', color: 'red', completion: '0/1' },
      { label: 'Team', color: 'green', completion: '2/2' },
    ],
    subflows: [],
  },
  {
    id: '10',
    name: 'Clara Wolf',
    email: 'clara.wolf@example.com',
    department: 'IT',
    location: 'Berlin',
    exitDate: '2025-11-05',
    dueDate: '2025-11-05',
    picture: 'https://mui.com/static/images/avatar/10.jpg',
    statuses: [
      { label: 'HR', color: 'green', completion: '2/2' },
      { label: 'IT', color: 'yellow', completion: '1/3' },
      { label: 'Finance', color: 'yellow', completion: '1/2' },
      { label: 'Team', color: 'red', completion: '0/2' },
    ],
    subflows: [],
  },
  {
    id: '11',
    name: 'Felix König',
    email: 'felix.koenig@example.com',
    department: 'Finance',
    location: 'Hamburg',
    exitDate: '2025-11-10',
    dueDate: '2025-11-10',
    picture: 'https://mui.com/static/images/avatar/11.jpg',
    statuses: [
      { label: 'HR', color: 'yellow', completion: '1/2' },
      { label: 'IT', color: 'green', completion: '2/2' },
      { label: 'Finance', color: 'red', completion: '0/1' },
      { label: 'Team', color: 'yellow', completion: '1/2' },
    ],
    subflows: [],
  },
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
      <Box sx={{ display: 'flex', alignItems: 'flex-start', fontWeight: 600, fontSize: '1rem', mb: 2, pl: 0, pr: 2, gap: 2, bgcolor: '#f5f5f5', borderRadius: 2, border: '1px solid #e0e0e0', minHeight: '64px', paddingLeft: { xs: '32px', lg: '64px' }, paddingRight: { xs: '32px', lg: '64px' } }}>
        <span style={{ minWidth: 56 }}></span>
        <span style={{ minWidth: 340, maxWidth: 420, textAlign: 'left' }}>Employee</span>
        <span style={{ minWidth: 120, textAlign: 'left' }}>Department</span>
        <span style={{ minWidth: 120, textAlign: 'left' }}>Location</span>
        <span style={{ minWidth: 120, textAlign: 'left' }}>Exit Date</span>
        <span style={{ minWidth: 320, display: 'flex', gap: 18, justifyContent: 'flex-start' }}>
          <span style={{ minWidth: 60, textAlign: 'left' }}>HR</span>
          <span style={{ minWidth: 60, textAlign: 'left' }}>IT</span>
          <span style={{ minWidth: 60, textAlign: 'left' }}>Finance</span>
          <span style={{ minWidth: 60, textAlign: 'left' }}>Team</span>
        </span>
      </Box>
      <Grid container spacing={2}>
        {sortedWorkflows.map((wf) => (
          <Box key={wf.id} sx={{ mb: 2 }}>
            <WorkflowCard data={wf} onNameClick={() => onWorkflowClick(wf.id)} />
          </Box>
        ))}
      </Grid>
    </Paper>
  );
}
