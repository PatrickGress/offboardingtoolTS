import { Box, Typography, Card, Avatar } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { mockWorkflows } from '../mockProcesses';
import { subflowCards } from '../mockSubflowCards';
import { subflowSteps } from '../mockSubflowSteps';
import type { WorkflowData, StatusData } from '../types/workflow';
import { initialAreas } from '../mockAreas';

function loadWorkflows(): WorkflowData[] {
  const stored = localStorage.getItem('mockWorkflows');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return mockWorkflows;
    }
  }
  return mockWorkflows;
}

export function PersonProcessOverview() {
  const { processId } = useParams();
  const navigate = useNavigate();
  const workflows = loadWorkflows();
  const workflow = workflows.find(w => w.processId === processId);

  if (!workflow) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">Person process not found</Typography>
      </Box>
    );
  }

  // Helper: get first unchecked step text for a subflow
  const getFirstUnchecked = (status: StatusData) => {
    const card = subflowCards.find(c => c.id === status.subflowId);
    if (!card) return '';
    for (const stepId of card.checkpointIds) {
      if (!status.completion.includes(stepId)) {
        const step = subflowSteps.find(s => s.id === stepId);
        if (step) return step.headline || step.description || '';
      }
    }
    return 'All steps completed';
  };

  return (
    <Box sx={{ width: '1100px', maxWidth: 1200, ml: 8, py: 3, px: 4, mr: 6, bgcolor: '#f5f5f5' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>Person Process Overview</Typography>

      {/* Header like ChecklistDetail */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3, pl: 1, py: 2, border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: '#fff', boxShadow: 1 }}>
        <Avatar src={workflow.picture} alt={workflow.name} sx={{ width: 72, height: 72, border: '2px solid #1976d2' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{workflow.name}</Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>{workflow.email}</Typography>
        </Box>
        <Box sx={{ ml: 'auto', display: 'flex', gap: 3 }}>
          <Typography variant="body2" sx={{ color: '#333' }}><strong>Person Id:</strong> {workflow.id}</Typography>
          <Typography variant="body2" sx={{ color: '#333' }}><strong>Exit Date:</strong> {workflow.exitDate}</Typography>
          <Typography variant="body2" sx={{ color: '#333' }}><strong>Teamlead:</strong> {workflow.teamlead}</Typography>
        </Box>
      </Box>

      {/* Tiles */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {workflow.statuses.map((status) => {
          const card = subflowCards.find(c => c.id === status.subflowId);
          const area = card ? initialAreas.find(a => a.id === card.areaId) : undefined;
          const shortname = area ? area.shortname : 'UNK';
          const total = card ? card.checkpointIds.length : 0;
          const firstUnchecked = getFirstUnchecked(status);

          return (
            <Card
              key={status.subflowId}
              onClick={() => navigate(`/checklist-detail/${status.subflowId}`, { state: { processId: workflow.processId, subflowId: status.subflowId, completion: status.completion } })}
              sx={{ p: 2, height: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1976d2' }}>{shortname} • {total}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{card?.name ?? status.subflowId}</Typography>
                <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>{firstUnchecked}</Typography>
              </Box>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
