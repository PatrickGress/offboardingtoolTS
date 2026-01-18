import { Box, Typography, Button, Card, Collapse, IconButton, Modal, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { BackNavigation } from './BackNavigation';
import { useState, useEffect } from 'react';
import type { Area } from '../types/area';
import type { SubflowCard } from '../types/subflow';
import { useNavigate } from 'react-router-dom';

export function ChecklistOverview() {
    const [areas, setAreas] = useState<Area[]>([]);
    const [subflowCards, setSubflowCards] = useState<SubflowCard[]>([]);
    // Use an array of expanded area ids for true multi-expand
    const [expandedAreas, setExpandedAreas] = useState<string[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newAreaName, setNewAreaName] = useState('');
    const [newAreaShort, setNewAreaShort] = useState('');
    const navigate = useNavigate();

    // Fetch areas and subflow cards from backend
    useEffect(() => {
        console.log('ChecklistOverview: Starting data fetch...');
        Promise.all([
            fetch('http://localhost:3000/areas').then(res => {
                console.log('ChecklistOverview areas response:', res.status);
                return res.json();
            }),
            fetch('http://localhost:3000/subflow-cards').then(res => {
                console.log('ChecklistOverview subflow-cards response:', res.status);
                return res.json();
            })
        ])
            .then(([areasData, cardsData]) => {
                console.log('ChecklistOverview fetched areas:', areasData);
                console.log('ChecklistOverview fetched subflow cards:', cardsData);
                setAreas(areasData);
                setSubflowCards(cardsData);
            })
            .catch(error => console.error('ChecklistOverview error fetching data:', error));
    }, []);

    const handleExpand = (areaId: string) => {
        setExpandedAreas(prev =>
            prev.includes(areaId)
                ? prev.filter(id => id !== areaId)
                : [...prev, areaId]
        );
    };

    const handleAddArea = () => {
        setModalOpen(true);
        setNewAreaName('');
        setNewAreaShort('');
    };

    const handleModalSubmit = () => {
        if (newAreaName && newAreaShort && newAreaShort.length <= 7) {
            const newId = newAreaShort.trim().toLowerCase() || newAreaName.trim().toLowerCase().replace(/\s+/g, '-');
            const updated = [...areas, { id: newId, name: newAreaName, shortname: newAreaShort }];
            setAreas(updated);
            setModalOpen(false);
        }
    };

    // Access payload: location.state?.processId, location.state?.completion, location.state?.subflowId

    return (
        <Box sx={{ width: '100%', maxWidth: '100%', mx: 'auto', bgcolor: '#f5f5f5', minHeight: '100vh', p: 0 }}>
            <Box sx={{ width: '100%', px: 4, mt: 2 }}>
                <BackNavigation />
            </Box>
            <Box sx={{ width: '100%', maxWidth: 1200, py: 3, px: 4, bgcolor: '#f5f5f5', borderRadius: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, pl: 0 }}>
                    Checklist Overview
                </Typography>
                <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} sx={{ fontWeight: 700 }} onClick={handleAddArea}>
                    Create New Area
                </Button>
            </Box>
            <Box sx={{ width: '100%', maxWidth: 1200, px: 4 }}>
                {areas.map(area => {
                    const cards = subflowCards.filter(card => card.areaId === area.id);
                    const isExpanded = expandedAreas.includes(area.id);
                    return (
                        <Card
                            key={area.id}
                            sx={{ mb: 2, p: 2, bgcolor: '#fafafa', borderRadius: 2, boxShadow: 1, cursor: isExpanded ? 'default' : 'pointer' }}
                            onClick={!isExpanded ? () => handleExpand(area.id) : undefined}
                            aria-expanded={isExpanded}
                        >
                            <Box
                                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                                onClick={isExpanded ? () => handleExpand(area.id) : undefined}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.05rem' }}>{area.name}</Typography>
                                <IconButton onClick={(e: React.MouseEvent<HTMLElement>) => { e.stopPropagation(); handleExpand(area.id); }}>
                                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </IconButton>
                            </Box>
                            <Collapse in={isExpanded}>
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mt: 2 }}>
                                    {cards.map(card => (
                                        <Card key={card.id} sx={{ height: 180, minWidth: 0, maxWidth: '100%', bgcolor: '#fff', borderRadius: 2, boxShadow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', p: 2, overflow: 'hidden', cursor: 'pointer' }} onClick={() => navigate(`/checklist/${card.id}`)}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '1.08rem', mb: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                                                {card.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#666', mb: 1, fontSize: '0.98rem', width: '100%', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {card.useCase}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
                                                <Typography variant="caption" sx={{ color: '#1976d2', fontWeight: 600, fontSize: '0.97rem' }}>
                                                    {card.checkpointIds.length} steps
                                                </Typography>
                                            </Box>
                                        </Card>
                                    ))}
                                    <Card sx={{ height: 180, minWidth: 0, maxWidth: '100%', bgcolor: '#e3f2fd', borderRadius: 2, boxShadow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', p: 2 }}>
                                        <AddCircleOutlineIcon color="primary" sx={{ fontSize: 32 }} />
                                    </Card>
                                </Box>
                            </Collapse>
                        </Card>
                    );
                })}
            </Box>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: '#fff', p: 4, borderRadius: 2, boxShadow: 4, minWidth: 340 }}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700, fontSize: '1.15rem' }}>Create New Area</Typography>
                    <TextField label="Area Name" fullWidth sx={{ mb: 2 }} value={newAreaName} onChange={e => setNewAreaName(e.target.value)} />
                    <TextField label="Shortname (max 7 chars)" fullWidth sx={{ mb: 2 }} value={newAreaShort} onChange={e => setNewAreaShort(e.target.value)} inputProps={{ maxLength: 7 }} />
                    <Button variant="contained" color="primary" sx={{ fontWeight: 700 }} onClick={handleModalSubmit} disabled={!newAreaName || !newAreaShort || newAreaShort.length > 7}>
                        Add Area
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}
