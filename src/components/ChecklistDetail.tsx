import { Box, Typography, Button } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import { subflowCards } from '../mockSubflowCards';
import { PersonDataCard } from './PersonDataCard';
import { subflowSteps } from '../mockSubflowSteps';
import type { SubflowCheckpoint } from '../types/subflow';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { mockWorkflows as mockWorkflowsFile } from '../mockProcesses';
import type { WorkflowData, StatusData } from '../types/workflow';

const WaveOverlay = styled('div')(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 2,
    borderRadius: 16,
    background: 'linear-gradient(90deg, #e8f5e9 0%, #a5d6a7 100%)',
    opacity: 0,
    transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1)',
    '&.active': {
        opacity: 0.7,
        animation: 'wave 0.7s cubic-bezier(0.4,0,0.2,1)'
    },
    '@keyframes wave': {
        '0%': { opacity: 0 },
        '40%': { opacity: 0.7 },
        '100%': { opacity: 0 }
    }
}));

const CheckIcon = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="13" stroke="#4caf50" strokeWidth="2" fill="#e8f5e9" />
        <path d="M9 14l3 3 6-6" stroke="#388e3c" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Utility to sync mockWorkflows to localStorage
function syncWorkflowsToLocalStorage(workflows: any[]) {
    localStorage.setItem('mockWorkflows', JSON.stringify(workflows));
}

// Utility to load workflows from localStorage or mock file
function getInitialWorkflows() {
    const stored = localStorage.getItem('mockWorkflows');
    return stored ? JSON.parse(stored) : mockWorkflowsFile;
}

export function ChecklistDetail() {
    const { cardId } = useParams();
    const location = useLocation();
    // Payload from navigation (processId, subflowId, completion, plus process info)
    const payload = location.state || {};
    // Find card and checkpoints
    const card = subflowCards.find(c => c.id === cardId);
    const checkpoints = card ? card.checkpointIds.map(id => subflowSteps.find(s => s.id === id)).filter((cp): cp is SubflowCheckpoint => !!cp) : [];

    // Local state for workflows, loaded from localStorage or mock file
    const [workflows, setWorkflows] = useState<any[]>(getInitialWorkflows());

    // Find workflow and status for this card
    let workflow: WorkflowData | undefined = undefined;
    let status: StatusData | undefined = undefined;
    if (payload.processId && payload.subflowId) {
        workflow = workflows.find((w: WorkflowData) => w.processId === payload.processId);
        status = workflow?.statuses?.find((s: StatusData) => s.subflowId === payload.subflowId);
    }

    const initialChecked: Record<string, boolean> = {};
    // Initial checked: Record<string, boolean> = {};
    if (payload.completion && Array.isArray(payload.completion)) {
        (payload.completion as string[]).forEach((id: string) => { initialChecked[id] = true; });
    } else if (status && status.completion) {
        (status.completion as string[]).forEach((id: string) => { initialChecked[id] = true; });
    }
    // Local state for checkboxes
    const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
    const [waveMap, setWaveMap] = useState<Record<string, boolean>>({});

    // Update checkedMap whenever workflows, payload, or status change
    useEffect(() => {
        let newChecked: Record<string, boolean> = {};
        if (payload.processId && payload.subflowId) {
            const wf = workflows.find((w: WorkflowData) => w.processId === payload.processId);
            const st = wf?.statuses?.find((s: StatusData) => s.subflowId === payload.subflowId);
            if (st && Array.isArray(st.completion)) {
                st.completion.forEach((id: string) => { newChecked[id] = true; });
            }
        } else if (payload.completion && Array.isArray(payload.completion)) {
            (payload.completion as string[]).forEach((id: string) => { newChecked[id] = true; });
        }
        setCheckedMap(newChecked);
    }, [workflows, payload.processId, payload.subflowId, payload.completion]);

    // Sync workflows to localStorage whenever they change
    useEffect(() => {
        syncWorkflowsToLocalStorage(workflows);
    }, [workflows]);

    // Handle checkbox toggle and update workflows/localStorage
    const handleToggle = (id: string) => {
        // Find latest workflows from localStorage
        const stored = localStorage.getItem('mockWorkflows');
        let latestWorkflows = workflows;
        if (stored) {
            try {
                latestWorkflows = JSON.parse(stored);
            } catch {}
        }
        // Find the current workflow and status
        const wfIdx = latestWorkflows.findIndex((wf: WorkflowData) => wf.processId === payload.processId);
        if (wfIdx === -1) return;
        const wf = latestWorkflows[wfIdx];
        const stIdx = wf.statuses.findIndex((st: StatusData) => st.subflowId === payload.subflowId);
        if (stIdx === -1) return;
        const st = wf.statuses[stIdx];
        // Toggle step ID
        if (st.completion.includes(id)) {
            st.completion = st.completion.filter((cid: string) => cid !== id);
        } else {
            st.completion.push(id);
        }
        // Update localStorage and state
        latestWorkflows[wfIdx].statuses[stIdx] = st;
        localStorage.setItem('mockWorkflows', JSON.stringify(latestWorkflows));
        setWorkflows([...latestWorkflows]);
        // Wave animation
        if (!checkedMap[id]) {
            setWaveMap(prev => ({ ...prev, [id]: true }));
            setTimeout(() => setWaveMap(prev => ({ ...prev, [id]: false })), 700);
        }
    };

    // Check all/Uncheck all logic
    const allChecked = checkpoints.every(cp => checkedMap[cp.id]);
    const noneChecked = checkpoints.every(cp => !checkedMap[cp.id]);
    const handleCheckAll = () => {
        const updated: Record<string, boolean> = {};
        checkpoints.forEach(cp => { updated[cp.id] = true; });
        setCheckedMap(updated);
        if (workflow && status) {
            status.completion = checkpoints.map(cp => cp.id);
            setWorkflows([...workflows]);
        }
    };
    const handleUncheckAll = () => {
        const updated: Record<string, boolean> = {};
        checkpoints.forEach(cp => { updated[cp.id] = false; });
        setCheckedMap(updated);
        if (workflow && status) {
            status.completion = [];
            setWorkflows([...workflows]);
        }
    };

    if (!card) {
        return <Box sx={{ p: 4 }}><Typography variant="h5">Card not found</Typography></Box>;
    }

    return (
        <Box sx={{ width: '1100px', maxWidth: 1200, ml: 8, py: 3, px: 4, mr: 6, bgcolor: '#f5f5f5' }}>
            {/* Header box: headline, description, steps header */}
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, pl: 0, textAlign: 'left', maxWidth: 600, whiteSpace: 'normal', wordBreak: 'break-word' }}>
                        {card?.name}
                    </Typography>
                    {/* Hide buttons if payload is present */}
                    {!payload.processId && (
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button variant="contained" color="primary" sx={{ fontWeight: 700 }}>Edit</Button>
                            <Button variant="outlined" color="primary" sx={{ fontWeight: 700 }}>Copy</Button>
                            <Button variant="outlined" color="error" sx={{ fontWeight: 700 }}>Delete</Button>
                        </Box>
                    )}
                </Box>
                {/* Sub-level header for ongoing process info */}
                {payload.processId && workflow && (
                    <PersonDataCard workflow={workflow} />
                )}
                <Typography variant="body1" sx={{ color: '#666', mb: 2, fontSize: '1.08rem', textAlign: 'left', maxWidth: 900 }}>
                    {card?.useCase}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, textAlign: 'left' }}>Steps</Typography>
                {/* Check all / Uncheck all buttons */}
                {payload.processId && (
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Button variant="contained" color="success" disabled={allChecked} onClick={handleCheckAll}>Check all</Button>
                        <Button variant="outlined" color="warning" disabled={noneChecked} onClick={handleUncheckAll}>Uncheck all</Button>
                    </Box>
                )}
            </Box>
            {/* Steps box: visually separated */}
            {checkpoints.length === 0 ? (
                <Typography variant="body2" sx={{ color: '#888', textAlign: 'left' }}>No checkpoints found.</Typography>
            ) : (
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 3, pl: 0, mb: 2 }}>
                    {checkpoints.map(cp => (
                        <Box key={cp.id} sx={{ position: 'relative', bgcolor: '#fff', borderRadius: 2, boxShadow: 2, border: '1px solid #e0e0e0', p: 4, minHeight: 120, maxWidth: 900, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden' }}>
                            <WaveOverlay className={waveMap[cp.id] ? 'active' : ''} />
                            {payload.processId && (
                                <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 3 }}>
                                    <Checkbox
                                        checked={!!checkedMap[cp.id]}
                                        onChange={() => handleToggle(cp.id)}
                                        icon={<span style={{
                                            display: 'block',
                                            width: 28,
                                            height: 28,
                                            borderRadius: '50%',
                                            border: '2px solid #bdbdbd',
                                            background: '#fff',
                                            boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                                        }} />}
                                        checkedIcon={<CheckIcon />}
                                        sx={{ p: 0 }}
                                    />
                                </Box>
                            )}
                            <Typography variant="subtitle2" sx={{ color: '#1976d2', fontWeight: 600, mb: 0.5, pl: 5 }}>
                                {cp.headline}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#333', fontSize: '1.08rem', textAlign: 'left', wordBreak: 'break-word', whiteSpace: 'normal', mb: 0.5, pl: 5 }}>
                                {cp.description}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#888', pl: 5 }}>
                                {cp.class}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}
