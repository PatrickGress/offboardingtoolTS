import { Box } from '@mui/material';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { DebugNav } from './components/DebugNav';
import { OverviewContainer } from './components/OverviewContainer';
import { ChecklistOverview } from './components/ChecklistOverview';
import { ChecklistDetail } from './components/ChecklistDetail';

import './App.css';

const pages = [
  { name: 'Overview' },
  { name: 'Checklist Overview' },
];

function App() {
  const [activePage, setActivePage] = useState('Overview');

  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.100' }}>
        <DebugNav pages={pages.map(p => ({ name: p.name, onClick: () => setActivePage(p.name) }))} />
        <Box sx={{ flex: 1, p: 0 }}>
          <Routes>
            <Route path="/" element={activePage === 'Overview' ? <OverviewContainer /> : <ChecklistOverview />} />
            <Route path="/checklist-detail/:cardId" element={<ChecklistDetail />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
