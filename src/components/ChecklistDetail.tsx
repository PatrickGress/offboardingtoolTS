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
    <Box sx={{ width: '1100px', maxWidth: 1200, ml: 8, mt: 6, bgcolor: '#f5f5f5', p: 4, borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>{card.name}</Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Checkpoints</Typography>
        {checkpoints.length === 0 ? (
          <Typography variant="body2" sx={{ color: '#888' }}>No checkpoints found.</Typography>
        ) : (
          <Box component="ul" sx={{ pl: 2, mb: 2 }}>
            {checkpoints.map(cp => (
              <li key={cp.id}>
                <Typography variant="body1" sx={{ mb: 1 }}>{cp.text}</Typography>
              </li>
            ))}
          </Box>
        )}
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary">Edit</Button>
        <Button variant="outlined" color="primary">Copy</Button>
        <Button variant="outlined" color="error">Delete</Button>
      </Box>
    </Box>
  );
}
