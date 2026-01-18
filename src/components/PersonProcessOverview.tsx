import { Box, Typography, Card } from '@mui/material';
import { BackNavigation } from './BackNavigation';
import { getSubflowTrafficLight } from '../utils/subflowHelpers';
import { useParams, useNavigate } from 'react-router-dom';
import type { WorkflowData, StatusData } from '../types/workflow';
import type { Area } from '../types/area';
import type { SubflowCard } from '../types/subflow';
import type { SubflowCheckpoint } from '../types/subflow';
import { PersonDataCard } from './PersonDataCard';
import { useState, useEffect } from 'react';

export function PersonProcessOverview() {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState<WorkflowData[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [subflowCards, setSubflowCards] = useState<SubflowCard[]>([]);
  const [subflowSteps, setSubflowSteps] = useState<SubflowCheckpoint[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data from backend
  useEffect(() => {
    console.log('PersonProcessOverview: Starting data fetch...');
    Promise.all([
      fetch('http://localhost:3000/processes').then(res => {
        console.log('PersonProcessOverview processes response:', res.status);
        return res.json();
      }),
      fetch('http://localhost:3000/areas').then(res => {
        console.log('PersonProcessOverview areas response:', res.status);
        return res.json();
      }),
      fetch('http://localhost:3000/subflow-cards').then(res => {
        console.log('PersonProcessOverview subflow-cards response:', res.status);
        return res.json();
      }),
      fetch('http://localhost:3000/subflow-steps').then(res => {
        console.log('PersonProcessOverview subflow-steps response:', res.status);
        return res.json();
      })
    ])
      .then(([processesData, areasData, cardsData, stepsData]) => {
        console.log('PersonProcessOverview fetched processes:', processesData);
        console.log('PersonProcessOverview fetched areas:', areasData);
        console.log('PersonProcessOverview fetched subflow cards:', cardsData);
        console.log('PersonProcessOverview fetched subflow steps:', stepsData);
        setWorkflows(processesData);
        setAreas(areasData);
        setSubflowCards(cardsData);
        setSubflowSteps(stepsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('PersonProcessOverview error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const workflow = workflows.find(w => w.processId === employeeId);

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">Loading...</Typography>
      </Box>
    );
  }

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
    <Box sx={{ width: '100%', maxWidth: 1200, py: 3, px: 4, bgcolor: '#f5f5f5' }}>
      <BackNavigation />
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, pl: 0, textAlign: 'left' }}>Person Process Overview</Typography>

      <PersonDataCard workflow={workflow} />

      {/* Tiles */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, gridAutoRows: '1fr' }}>
        {workflow.statuses
          .map(status => ({ status, card: subflowCards.find(c => c.id === status.subflowId) }))
          .filter(({ card }) => !!card)
          .map(({ status, card }) => {
            const area = card ? areas.find((a: Area) => a.id === card.areaId) : undefined;
            const shortname = area ? area.shortname : 'UNK';
            const total = card ? card.checkpointIds.length : 0;
            const done = status.completion.length;
            const firstUnchecked = getFirstUnchecked(status);
            const trafficColor = getSubflowTrafficLight(status.completion, total);
            let badgeBg = '#e53935';
            if (trafficColor === 'yellow') badgeBg = '#fbc02d';
            if (trafficColor === 'green') badgeBg = '#43a047';

            return (
              <Card
                key={status.subflowId}
                onClick={() => navigate(`/process/${workflow.processId}/${status.subflowId}`, { state: { processId: workflow.processId, subflowId: status.subflowId, completion: status.completion } })}
                sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1976d2' }}>{shortname}</Typography>
                  <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 26, borderRadius: '14px', fontSize: '0.95rem', fontWeight: 700, color: '#fff', background: badgeBg }}>
                      {`${done}/${total}`}
                    </Box>
                  </Box>
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
