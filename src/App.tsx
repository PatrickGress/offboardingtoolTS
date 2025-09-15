import { useState } from 'react';
import { Box } from '@mui/material';
import { DebugNav } from './components/DebugNav';
import { WorkflowOverview } from './components/WorkflowOverview';
import './App.css';

function App() {
  const [page, setPage] = useState<'overview' | 'placeholder1' | 'placeholder2' | 'placeholder3' | 'placeholder4' | 'placeholder5'>('overview');

  const pages = [
    { name: 'Overview', onClick: () => setPage('overview') },
    { name: 'Placeholder 1', onClick: () => setPage('placeholder1') },
    { name: 'Placeholder 2', onClick: () => setPage('placeholder2') },
    { name: 'Placeholder 3', onClick: () => setPage('placeholder3') },
    { name: 'Placeholder 4', onClick: () => setPage('placeholder4') },
    { name: 'Placeholder 5', onClick: () => setPage('placeholder5') },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.100' }}>
      <DebugNav pages={pages} />
      <Box sx={{ flex: 1, p: 3 }}>
        {page === 'overview' && (
          <WorkflowOverview onWorkflowClick={(id) => alert(`Go to workflow detail for ${id}`)} />
        )}
        {page !== 'overview' && (
          <Box sx={{ p: 4 }}>
            <h2>{pages.find(p => p.name.toLowerCase().includes(page))?.name}</h2>
            <p>Placeholder page. Instructions will follow.</p>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default App;
