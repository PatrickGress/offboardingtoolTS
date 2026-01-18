import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem, IconButton, Popover } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import { WorkflowCard } from './WorkflowCard';
import { FilterPanel } from './FilterPanel';
import type { WorkflowOverviewProps } from './OverviewContainer';
import type { Area } from '../types/area';
import type { SubflowCard } from '../types/subflow';

const sortOptions = [
    { value: 'exitDate', label: 'Exit Date (soonest)' },
    { value: 'exitDateLatest', label: 'Exit Date (latest)' },
    { value: 'nameAZ', label: 'Name A-Z' },
    { value: 'nameZA', label: 'Name Z-A' },
];

function sortWorkflows(workflows: any[], sortBy: string) {
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

export function WorkflowOverview({ onWorkflowClick, filtersOpen, setFiltersOpen, filterPanelProps, activeFilterCount, workflows }: WorkflowOverviewProps) {
    const [sortBy, setSortBy] = useState('exitDate');
    const [areas, setAreas] = useState<Area[]>([]);
    const [subflowCards, setSubflowCards] = useState<SubflowCard[]>([]);

    // Fetch areas and subflow cards from backend
    useEffect(() => {
        console.log('WorkflowOverview: Starting data fetch...');
        Promise.all([
            fetch('http://localhost:3000/areas').then(res => {
                console.log('WorkflowOverview areas response:', res.status);
                return res.json();
            }),
            fetch('http://localhost:3000/subflow-cards').then(res => {
                console.log('WorkflowOverview subflow-cards response:', res.status);
                return res.json();
            })
        ])
            .then(([areasData, cardsData]) => {
                console.log('WorkflowOverview fetched areas:', areasData);
                console.log('WorkflowOverview fetched subflow cards:', cardsData);
                setAreas(areasData);
                setSubflowCards(cardsData);
            })
            .catch(error => console.error('WorkflowOverview error fetching data:', error));
    }, []);

    // Sort the filtered workflows from props
    const sortedWorkflows = sortWorkflows(workflows, sortBy);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleFilterButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setFiltersOpen(!filtersOpen);
    };
    const handleClose = () => {
        setFiltersOpen(false);
        setAnchorEl(null);
    };

    return (
        <Paper elevation={0} sx={{
            p: 0,
            borderRadius: 2,
            border: '1px solid #e0e0e0',
            bgcolor: '#fafafa',
            width: { xs: '900px', lg: '1100px' },
            ml: { xs: 2, lg: 6 },
            boxShadow: 'none'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                bgcolor: '#f5f5f5',
                borderRadius: 2,
                border: 'none',
                minHeight: '64px',
                mb: 2
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1, pl: 4 }}>
                        Ongoing Processes ({sortedWorkflows.length})
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                            color="primary"
                            onClick={handleFilterButtonClick}
                            sx={{
                                mr: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                position: 'relative',
                                border: '2px solid #1976d2',
                                borderRadius: 2,
                                background: filtersOpen ? '#e3f2fd' : '#fff',
                                boxShadow: filtersOpen ? 2 : 0,
                                transition: 'background 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    background: '#e3f2fd',
                                    boxShadow: 3,
                                    borderColor: '#1565c0',
                                },
                                minHeight: 44,
                                minWidth: 120,
                                px: 2,
                            }}
                        >
                            {filtersOpen ? <CloseIcon /> : <FilterAltIcon />}
                            {!filtersOpen && activeFilterCount > 0 && (
                                <Box sx={{ ml: 0.5, bgcolor: '#d32f2f', color: '#fff', borderRadius: '50%', minWidth: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem', fontWeight: 700, boxShadow: 2 }}>
                                    {activeFilterCount}
                                </Box>
                            )}
                            <span style={{ fontSize: '1rem', fontWeight: 500, color: '#1976d2', marginLeft: 8 }}>{filtersOpen ? 'Close Filters' : 'Open Filters'}</span>
                        </IconButton>
                        <Popover
                            open={filtersOpen}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            PaperProps={{ sx: { mt: 1, borderRadius: 2, boxShadow: 4 } }}
                        >
                            <FilterPanel {...filterPanelProps} />
                        </Popover>
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
                </Box>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fafafa' }}>
                    <thead>
                        <tr style={{ background: '#f5f5f5', borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0', height: 64 }}>
                            <th style={{ width: '22%', minWidth: 56, textAlign: 'left', fontWeight: 600, fontSize: '1rem', paddingLeft: 24 }}>Employee</th>
                            <th style={{ width: '14%', minWidth: 120, maxWidth: 420, textAlign: 'left', fontWeight: 600, fontSize: '1rem' }}>Department</th>
                            <th style={{ width: '14%', minWidth: 120, textAlign: 'left', fontWeight: 600, fontSize: '1rem' }}>Location</th>
                            <th style={{ width: '14%', minWidth: 120, textAlign: 'left', fontWeight: 600, fontSize: '1rem' }}>Exit Date</th>
                            {areas.map(area => (
                                <th key={area.id} style={{ width: '9%', minWidth: 60, textAlign: 'center', fontWeight: 600, fontSize: '1rem' }}>{area.shortname}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedWorkflows.map((wf, idx) => (
                            <WorkflowCard key={wf.id} data={wf} onNameClick={() => onWorkflowClick(wf.processId || wf.id)} isTableRow={true} isLast={idx === sortedWorkflows.length - 1} areas={areas} subflowCards={subflowCards} />
                        ))}
                    </tbody>
                </table>
            </Box>
        </Paper>
    );
}
