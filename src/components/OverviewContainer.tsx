import { Box, Typography, Button, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { WorkflowOverview } from './WorkflowOverview';
import { useState, useEffect, useMemo } from 'react';
import { mockWorkflows } from '../mockCards';

// Dynamically extract unique values from mockWorkflows
const getUnique = (arr: any[], key: string) => Array.from(new Set(arr.map(item => item[key]).filter(Boolean)));

export function OverviewContainer() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [crit, setCrit] = useState('');
  const [teamlead, setTeamlead] = useState('');
  const [teamleadSearch, setTeamleadSearch] = useState('');
  const [debouncedTeamleadSearch, setDebouncedTeamleadSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedTeamleadSearch(teamleadSearch), 500);
    return () => clearTimeout(handler);
  }, [teamleadSearch]);

  // Memoized unique values for select fields
  const departments = useMemo(() => getUnique(mockWorkflows, 'department'), [mockWorkflows]);
  const locations = useMemo(() => getUnique(mockWorkflows, 'location'), [mockWorkflows]);
  // Criticality values: extract all unique traffic light colors from exit date and subflows
  const criticality = useMemo(() => {
    // Get colors from exit dates
    const dateColors = mockWorkflows.map(wf => getDateTrafficLight(wf.exitDate));
    // Get colors from subflows
    const subflowColors = mockWorkflows.flatMap(wf => wf.statuses.map(s => getSubflowTrafficLight(s.completion)));
    const allColors = [...dateColors, ...subflowColors];
    return Array.from(new Set(allColors)).map(c => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }));
  }, [mockWorkflows]);

  // Teamlead search state
  const teamleads = useMemo(() => getUnique(mockWorkflows, 'teamlead'), [mockWorkflows]);
  const filteredTeamleads = useMemo(() => teamleads.filter(tl => tl.toLowerCase().includes(teamleadSearch.toLowerCase())), [teamleadSearch, teamleads]);

  // Helper to determine traffic light color for exit date
  function getDateTrafficLight(exitDate: string): string {
    const exit = new Date(exitDate);
    const now = new Date();
    const diffDays = (exit.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays < 14) return 'red';
    if (diffDays < 30) return 'yellow';
    return 'green';
  }

  // Helper to determine traffic light color for subflows
  function getSubflowTrafficLight(completion: string): string {
    const [done, total] = completion.split('/').map(Number);
    if (total === 0) return 'red';
    const percent = done / total;
    if (percent < 0.5) return 'red';
    if (percent < 1) return 'yellow';
    return 'green';
  }

  // Filtering logic
  const filteredWorkflows = mockWorkflows.filter(wf => {
    const searchLower = debouncedSearch.toLowerCase();
    const teamleadLower = debouncedTeamleadSearch.toLowerCase();
    if (searchLower && !(
      wf.name.toLowerCase().includes(searchLower) ||
      wf.email.toLowerCase().includes(searchLower) ||
      wf.id.toLowerCase().includes(searchLower)
    )) return false;
    if (teamleadLower && !wf.teamlead.toLowerCase().includes(teamleadLower)) return false;
    if (department && wf.department !== department) return false;
    if (location && wf.location !== location) return false;
    // Criticality filter: show if exit date OR ANY subflow matches
    if (crit) {
      const dateColor = getDateTrafficLight(wf.exitDate);
      const anyStatusMatch = wf.statuses.some(s => getSubflowTrafficLight(s.completion) === crit);
      if (!(dateColor === crit || anyStatusMatch)) return false;
    }
    return true;
  });

  // Search result lists for name/email/id and teamlead
  const nameResults = useMemo(() => {
    if (debouncedSearch.length < 3) return [];
    const searchLower = debouncedSearch.toLowerCase();
    return mockWorkflows
      .filter(wf => wf.name.toLowerCase().includes(searchLower))
      .map(wf => wf.name);
  }, [debouncedSearch, mockWorkflows]);

  const teamleadResults = useMemo(() => {
    if (debouncedTeamleadSearch.length < 3) return [];
    const searchLower = debouncedTeamleadSearch.toLowerCase();
    return teamleads.filter(tl => tl.toLowerCase().includes(searchLower));
  }, [debouncedTeamleadSearch, teamleads]);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#f0f2f5', minHeight: '100vh', p: 0 }}>
      {/* Headline row */}
      <Box sx={{ width: { xs: '1100px', lg: '1320px' }, display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 3, px: 4, bgcolor: '#f5f5f5', borderRadius: 2, border: '1px solid #e0e0e0', mb: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Offboarding Overview
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#888', fontWeight: 400 }}>
            Manage and track all ongoing offboarding processes
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined">Placeholder 1</Button>
          <Button variant="outlined">Placeholder 2</Button>
          <Button variant="contained" color="primary">Create/Start new Offboarding</Button>
        </Box>
      </Box>
      {/* Filter/Search box */}
      <Paper elevation={3} sx={{ width: { xs: '1100px', lg: '1320px' }, display: 'flex', alignItems: 'center', gap: 2, px: 4, py: 2, mb: 3, bgcolor: '#fff', borderRadius: 2, border: '1px solid #e0e0e0', position: 'relative' }}>
        <Box sx={{ position: 'relative', minWidth: 220 }}>
          <TextField
            label="Search by name, email, or ID"
            variant="outlined"
            size="small"
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={{ minWidth: 220 }}
          />
          {nameResults.length > 0 && (
            <Box sx={{ position: 'absolute', top: 40, left: 0, zIndex: 10, bgcolor: '#fff', boxShadow: 3, borderRadius: 1, minWidth: 220, maxHeight: 220, overflowY: 'auto', border: '1px solid #e0e0e0' }}>
              {nameResults.map((n, i) => (
                <MenuItem key={n + i}>{n}</MenuItem>
              ))}
            </Box>
          )}
        </Box>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Department</InputLabel>
          <Select value={department} label="Department" onChange={e => setDepartment(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            {departments.map(dep => (
              <MenuItem key={dep} value={dep}>{dep}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ position: 'relative', minWidth: 220 }}>
          <TextField
            label="Search Teamlead"
            variant="outlined"
            size="small"
            value={teamleadSearch}
            onChange={e => setTeamleadSearch(e.target.value)}
            sx={{ minWidth: 220 }}
          />
          {teamleadResults.length > 0 && (
            <Box sx={{ position: 'absolute', top: 40, left: 0, zIndex: 10, bgcolor: '#fff', boxShadow: 3, borderRadius: 1, minWidth: 220, maxHeight: 220, overflowY: 'auto', border: '1px solid #e0e0e0' }}>
              {teamleadResults.map((tl, i) => (
                <MenuItem key={tl + i}>{tl}</MenuItem>
              ))}
            </Box>
          )}
        </Box>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Location</InputLabel>
          <Select value={location} label="Location" onChange={e => setLocation(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            {locations.map(loc => (
              <MenuItem key={loc} value={loc}>{loc}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Criticality</InputLabel>
          <Select value={crit} label="Criticality" onChange={e => setCrit(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            {criticality.map(c => (
              <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          sx={{ minWidth: 160, fontWeight: 700, boxShadow: 2, ml: 2, height: 40 }}
          onClick={() => {
            setSearch('');
            setDepartment('');
            setLocation('');
            setCrit('');
            setTeamleadSearch('');
          }}
        >
          Clear Filters
        </Button>
      </Paper>
      {/* Spacing below filter/search box */}
      <Box sx={{ height: 8 }} />
      {/* Overview table below */}
      <WorkflowOverview onWorkflowClick={() => {}} workflows={filteredWorkflows} />
    </Box>
  );
}
