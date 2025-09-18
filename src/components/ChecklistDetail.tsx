import { Box, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { subflowCards } from '../mockSubflowCards';
import { subflowSteps } from '../mockSubflowSteps';
import type { SubflowCheckpoint } from '../mockSubflowSteps';

export function ChecklistDetail() {
  const { cardId } = useParams();
  const card = subflowCards.find(c => c.id === cardId);
  const checkpoints = card ? card.checkpointIds.map(id => subflowSteps.find(s => s.id === id)).filter((cp): cp is SubflowCheckpoint => !!cp) : [];

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
      <Box sx={{ bgcolor: '#fafafa', borderRadius: 2, boxShadow: 1, border: '1px solid #e0e0e0', p: 3, mt: 2 }}>
        {checkpoints.length === 0 ? (
          <Typography variant="body2" sx={{ color: '#888', textAlign: 'left' }}>No checkpoints found.</Typography>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, pl: 2, mb: 2 }}>
            {checkpoints.map(cp => (
              <Box key={cp.id} sx={{ bgcolor: '#fff', borderRadius: 2, boxShadow: 1, border: '1px solid #e0e0e0', p: 2, minHeight: 48, display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: '#333', fontSize: '1.02rem', textAlign: 'left', wordBreak: 'break-word', whiteSpace: 'normal' }}>{cp.text}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
