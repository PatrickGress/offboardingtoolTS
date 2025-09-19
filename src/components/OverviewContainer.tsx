import { Box, Typography, Button } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { WorkflowOverview } from './WorkflowOverview';
import { useState, useEffect, useMemo, useRef } from 'react';
import { mockWorkflows } from '../mockCards';
import { initialAreas } from '../mockAreas';
import { subflowCards } from '../mockSubflowCards';

// Helper functions
const getUnique = (arr: any[], key: string) => Array.from(new Set(arr.map(item => item[key]).filter(Boolean)));
function getDateTrafficLight(exitDate: string): string {
  const exit = new Date(exitDate);
  const now = new Date();
  const diffDays = (exit.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  if (diffDays < 14) return 'red';
  if (diffDays < 30) return 'yellow';
  return 'green';
}
function getSubflowTrafficLight(completion: string[], total: number): string {
  if (total === 0) return 'red';
  const percent = completion.length / total;
  if (percent < 0.5) return 'red';
  if (percent < 1) return 'yellow';
  return 'green';
}

// Types
export type SubflowFilters = { [key: string]: string };

export interface FilterPanelProps {
  search: string;
  setSearch: (v: string) => void;
  department: string;
  setDepartment: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  crit: string;
  setCrit: (v: string) => void;
  teamleadSearch: string;
  setTeamleadSearch: (v: string) => void;
  departments: string[];
  locations: string[];
  criticality: { value: string; label: string }[];
  onClear: () => void;
  nameResults: string[];
  teamleadResults: string[];
  showNameDropdown: boolean;
  setShowNameDropdown: (v: boolean) => void;
  showTeamleadDropdown: boolean;
  setShowTeamleadDropdown: (v: boolean) => void;
  nameDropdownClosedByClick: React.MutableRefObject<boolean>;
  teamleadDropdownClosedByClick: React.MutableRefObject<boolean>;
  subflowNames: string[];
  subflowFilters: { [key: string]: string };
  setSubflowFilters: (v: { [key: string]: string }) => void;
  handleSubflowFilterChange: (subflow: string, value: string) => void;
}

export interface WorkflowOverviewProps {
  onWorkflowClick: () => void;
  workflows: any[];
  filtersOpen: boolean;
  setFiltersOpen: (v: boolean) => void;
  filterPanelProps: FilterPanelProps;
  activeFilterCount: number;
}

export function OverviewContainer() {
  // State
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [crit, setCrit] = useState('');
  const [teamleadSearch, setTeamleadSearch] = useState('');
  const [debouncedTeamleadSearch, setDebouncedTeamleadSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showNameDropdown, setShowNameDropdown] = useState(false);
  const [showTeamleadDropdown, setShowTeamleadDropdown] = useState(false);
  const nameDropdownClosedByClick = useRef(false);
  const teamleadDropdownClosedByClick = useRef(false);
  const [subflowFilters, setSubflowFilters] = useState<SubflowFilters>({});

  // Memoized values
  const teamleads = useMemo(() => getUnique(mockWorkflows, 'teamlead'), []);
  const departments = useMemo(() => getUnique(mockWorkflows, 'department'), []);
  const locations = useMemo(() => getUnique(mockWorkflows, 'location'), []);
  const criticality = useMemo(() => {
    const dateColors = mockWorkflows.map(wf => getDateTrafficLight(wf.exitDate));
    const subflowColors = mockWorkflows.flatMap(wf => wf.statuses.map(s => {
      const subflowCard = subflowCards.find((card: { id: string }) => card.id === s.subflowId);
      const total = subflowCard ? subflowCard.checkpointIds.length : 0;
      return getSubflowTrafficLight(s.completion, total);
    }));
    const allColors = [...dateColors, ...subflowColors];
    return Array.from(new Set(allColors)).map(c => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }));
  }, []);
  const areaShortnames = initialAreas.map((a: { shortname: string }) => a.shortname);
  const subflowNames = areaShortnames;

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedTeamleadSearch(teamleadSearch), 500);
    return () => clearTimeout(handler);
  }, [teamleadSearch]);

  // Search result lists
  const nameResults = useMemo(() => {
    if (debouncedSearch.length < 3) return [];
    const searchLower = debouncedSearch.toLowerCase();
    return mockWorkflows.filter(wf => wf.name.toLowerCase().includes(searchLower)).map(wf => wf.name);
  }, [debouncedSearch]);
  const teamleadResults = useMemo(() => {
    if (debouncedTeamleadSearch.length < 3) return [];
    const searchLower = debouncedTeamleadSearch.toLowerCase();
    return teamleads.filter(tl => tl.toLowerCase().includes(searchLower));
  }, [debouncedTeamleadSearch, teamleads]);

  // Dropdown logic
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
    if (crit) {
      const dateColor = getDateTrafficLight(wf.exitDate);
      const anyStatusMatch = wf.statuses.some(s => {
        const subflowCard = subflowCards.find((card: { id: string }) => card.id === s.subflowId);
        const total = subflowCard ? subflowCard.checkpointIds.length : 0;
        return getSubflowTrafficLight(s.completion, total) === crit;
      });
      if (!(dateColor === crit || anyStatusMatch)) return false;
    }
    for (const subflow of subflowNames) {
      const filterValue = subflowFilters[subflow];
      if (!filterValue) continue;
      // Find status for this area
      const area = initialAreas.find((a: { shortname: string }) => a.shortname === subflow);
      if (!area) continue;
      const status = wf.statuses.find((s: { subflowId: string }) => {
        const subflowCard = subflowCards.find((card: { id: string; areaId: string }) => card.id === s.subflowId);
        return subflowCard && subflowCard.areaId === area.id;
      });
      if (!status) return false;
      const subflowCard = subflowCards.find((card: { id: string }) => card.id === status.subflowId);
      const total = subflowCard ? subflowCard.checkpointIds.length : 0;
      const done = status.completion.length;
      let match = false;
      if (filterValue === 'done') match = done === total && total > 0;
      else if (filterValue === 'ongoing') match = done > 0 && done < total;
      else if (filterValue === 'notstarted') match = done === 0;
      if (!match) return false;
    }
    return true;
  });

  // Active filter count
  const activeFilterCount = [search, department, location, crit, teamleadSearch]
    .filter(v => v && v !== '').length +
    Object.values(subflowFilters).filter(v => v && v !== '').length;

  // Handlers
  const handleSubflowFilterChange = (subflow: string, value: string) => {
    setSubflowFilters((prev: SubflowFilters) => ({ ...prev, [subflow]: value }));
  };

  // Render
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
        <Box sx={{ ml: 2 }}>
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
              setSubflowFilters,
              handleSubflowFilterChange
            }}
            activeFilterCount={activeFilterCount}
          />
        </Box>
      </Box>
    </Box>
  );
}
