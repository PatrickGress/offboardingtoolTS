import { Box, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { subflowCards } from '../mockSubflowCards';
import { subflowSteps } from '../mockSubflowSteps';
import type { SubflowCheckpoint } from '../mockSubflowSteps';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';

const WaveOverlay = styled('div')(({ theme }) => ({
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

export function ChecklistDetail() {
  const { cardId } = useParams();
  const card = subflowCards.find(c => c.id === cardId);
  const checkpoints = card ? card.checkpointIds.map(id => subflowSteps.find(s => s.id === id)).filter((cp): cp is SubflowCheckpoint => !!cp) : [];

  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
  const [waveMap, setWaveMap] = useState<Record<string, boolean>>({});

  const handleToggle = (id: string) => {
    setCheckedMap(prev => ({ ...prev, [id]: !prev[id] }));
    if (!checkedMap[id]) {
      setWaveMap(prev => ({ ...prev, [id]: true }));
      setTimeout(() => setWaveMap(prev => ({ ...prev, [id]: false })), 700);
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
          <Typography variant="h4" sx={{ fontWeight: 700, pl: 0, textAlign: 'left' }}>
            {card.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" sx={{ fontWeight: 700 }}>Edit</Button>
            <Button variant="outlined" color="primary" sx={{ fontWeight: 700 }}>Copy</Button>
            <Button variant="outlined" color="error" sx={{ fontWeight: 700 }}>Delete</Button>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ color: '#666', mb: 2, fontSize: '1.08rem', textAlign: 'left', maxWidth: 900 }}>
          {card.useCase}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, textAlign: 'left' }}>Steps</Typography>
      </Box>
      {/* Steps box: visually separated */}
      {checkpoints.length === 0 ? (
        <Typography variant="body2" sx={{ color: '#888', textAlign: 'left' }}>No checkpoints found.</Typography>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 3, pl: 0, mb: 2 }}>
          {checkpoints.map(cp => (
            <Box key={cp.id} sx={{ position: 'relative', bgcolor: '#fff', borderRadius: 2, boxShadow: 2, border: '1px solid #e0e0e0', p: 4, minHeight: 120, maxWidth: 900, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden' }}>
              <WaveOverlay className={waveMap[cp.id] ? 'active' : ''} />
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
