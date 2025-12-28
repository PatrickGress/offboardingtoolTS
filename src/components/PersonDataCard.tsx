import { Box, Typography, Avatar } from '@mui/material';
import type { WorkflowData } from '../types/workflow';

export function PersonDataCard({ workflow }: { workflow: WorkflowData }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2, pl: 1, py: 2, border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: '#f9f9f9', boxShadow: 1, minHeight: 80 }}>
      {workflow.picture ? (
        <Avatar src={workflow.picture} alt={workflow.name} sx={{ width: 64, height: 64, border: '2px solid #1976d2', background: '#fff', mr: 3 }} />
      ) : (
        <Avatar sx={{ width: 64, height: 64, border: '2px solid #1976d2', background: '#fff', color: '#1976d2', fontWeight: 700, mr: 3 }}>{workflow.name ? workflow.name.split(' ').map(n => n[0]).slice(0,2).join('') : '?'}</Avatar>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', minWidth: 180, width: '22%' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2', mb: 0 }}>{workflow.name}</Typography>
          <Typography variant="body2" sx={{ color: '#555', fontWeight: 400, mt: 0.5 }}>{workflow.email}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, width: '78%' }}>
          <Typography variant="body2" sx={{ color: '#333', fontWeight: 500, fontSize: '1.08rem', width: '20%', minWidth: 140, maxWidth: 180, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><span style={{ fontWeight: 400, color: '#888', marginRight: 4 }}>Person Id:</span>{workflow.id}</Typography>
          <Typography variant="body2" sx={{ color: '#333', fontWeight: 500, fontSize: '1.08rem', width: '28%', minWidth: 120, maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><span style={{ fontWeight: 400, color: '#888', marginRight: 4 }}>Exit Date:</span>{workflow.exitDate}</Typography>
          <Typography variant="body2" sx={{ color: '#333', fontWeight: 500, fontSize: '1.08rem', width: '28%', minWidth: 120, maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><span style={{ fontWeight: 400, color: '#888', marginRight: 4 }}>Teamlead:</span>{workflow.teamlead}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default PersonDataCard;
