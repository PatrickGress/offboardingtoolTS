import { Box } from '@mui/material';
import { useState } from 'react';

import { DebugNav } from './components/DebugNav';
import { OverviewContainer } from './components/OverviewContainer';
import { ChecklistOverview } from './components/ChecklistOverview';

import './App.css';

const pages = [
  { name: 'Overview' },
  { name: 'Checklist Overview' },
];

function App() {
  const [activePage, setActivePage] = useState('Overview');

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.100' }}>
      <DebugNav pages={pages.map(p => ({ name: p.name, onClick: () => setActivePage(p.name) }))} />
      <Box sx={{ flex: 1, p: 0 }}>
        {activePage === 'Overview' && <OverviewContainer />}
        {activePage === 'Checklist Overview' && <ChecklistOverview />}
      </Box>
    </Box>
  );
}

export default App;
