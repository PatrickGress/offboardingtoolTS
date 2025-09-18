import { Box, Typography, Button, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { WorkflowOverview } from './WorkflowOverview';
import { FilterPanel } from './FilterPanel';
import { useState, useEffect, useMemo, useRef } from 'react';
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
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedTeamleadSearch(teamleadSearch), 500);
    return () => clearTimeout(handler);
  }, [teamleadSearch]);

  // Teamlead search state
  const teamleads = useMemo(() => getUnique(mockWorkflows, 'teamlead'), [mockWorkflows]);

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

  const [showNameDropdown, setShowNameDropdown] = useState(false);
  const [showTeamleadDropdown, setShowTeamleadDropdown] = useState(false);

  // Track if dropdown was closed by click to prevent reopening
  const nameDropdownClosedByClick = useRef(false);
  const teamleadDropdownClosedByClick = useRef(false);

  useEffect(() => {
    if (nameDropdownClosedByClick.current) {
      setShowNameDropdown(false);
      nameDropdownClosedByClick.current = false;
    } else {
      setShowNameDropdown(nameResults.length > 0);
    }
  }, [nameResults]);
  useEffect(() => {
    if (teamleadDropdownClosedByClick.current) {
      setShowTeamleadDropdown(false);
      teamleadDropdownClosedByClick.current = false;
    } else {
      setShowTeamleadDropdown(teamleadResults.length > 0);
    }
  }, [teamleadResults]);

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

  // Extract all unique subflow names from mockWorkflows
  const subflowNames = useMemo(() => {
    const all = mockWorkflows.flatMap(wf => wf.statuses.map(s => s.label));
    return Array.from(new Set(all));
  }, [mockWorkflows]);

  // State for each subflow filter
  const [subflowFilters, setSubflowFilters] = useState<{ [key: string]: string }>({});

  // Handler for subflow filter change
  const handleSubflowFilterChange = (subflow: string, value: string) => {
    setSubflowFilters(prev => ({ ...prev, [subflow]: value }));
  };

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
    // Subflow filters
    for (const subflow of subflowNames) {
      const filterValue = subflowFilters[subflow];
      if (!filterValue) continue;
      const status = wf.statuses.find(s => s.label === subflow);
      if (!status) return false;
      const [done, total] = status.completion.split('/').map(Number);
      let match = false;
      if (filterValue === 'done') match = done === total && total > 0;
      else if (filterValue === 'ongoing') match = done > 0 && done < total;
      else if (filterValue === 'notstarted') match = done === 0;
      if (!match) return false;
    }
    return true;
  });

  // Compute active filter count
  const activeFilterCount = [search, department, location, crit, teamleadSearch].filter(v => v && v !== '').length;

  // Remove filter UI from main render
  return (
    <Box sx={{ width: '100%', maxWidth: 1200, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', bgcolor: '#f5f5f5', minHeight: '100vh', p: 0, mx: 'auto', mr: 6 }}>
      {/* Headline row */}
      <Box sx={{ width: '1100px', position: 'relative', display: 'flex', alignItems: 'center', py: 3, px: 4, bgcolor: '#f5f5f5', borderRadius: 2, border: 'none', mb: 2, ml: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, pl: 0 }}>
            Offboarding Overview
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#888', fontWeight: 400, pl: 0 }}>
            Manage and track all ongoing offboarding processes
          </Typography>
        </Box>
        <Box sx={{ position: 'absolute', top: 24, right: 32, display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end', width: 420 }}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', width: '100%' }}>
            <Button variant="outlined" startIcon={<FileDownloadOutlinedIcon />}>Export Report</Button>
            <Button variant="outlined" startIcon={<ListAltOutlinedIcon />}>View Audit Logs</Button>
          </Box>
          <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} sx={{ mt: 1, alignSelf: 'flex-end' }}>Start New Process</Button>
        </Box>
      </Box>
      {/* Overview table below */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
        <Box sx={{ ml: 2 }}> {/* add a bit of left margin for nested look */}
          <WorkflowOverview
            onWorkflowClick={() => {}}
            workflows={filteredWorkflows}
            filtersOpen={filtersOpen}
            setFiltersOpen={setFiltersOpen}
            filterPanelProps={{
              search, setSearch,
              department, setDepartment,
              location, setLocation,
              crit, setCrit,
              teamleadSearch, setTeamleadSearch,
              departments, locations, criticality,
              onClear: () => {
                setSearch('');
                setDepartment('');
                setLocation('');
                setCrit('');
                setTeamleadSearch('');
                setSubflowFilters({});
              },
              nameResults, teamleadResults,
              showNameDropdown, setShowNameDropdown,
              showTeamleadDropdown, setShowTeamleadDropdown,
              nameDropdownClosedByClick, teamleadDropdownClosedByClick,
              subflowNames,
              subflowFilters,
              handleSubflowFilterChange
            }}
            activeFilterCount={activeFilterCount}
          />
        </Box>
      </Box>
    </Box>
  );
}
