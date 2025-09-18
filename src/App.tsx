import { Box } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { DebugNav } from './components/DebugNav';
import { OverviewContainer } from './components/OverviewContainer';
import { ChecklistOverview } from './components/ChecklistOverview';
import { ChecklistDetail } from './components/ChecklistDetail';

import './App.css';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.100' }}>
        <DebugNav />
        <Box sx={{ flex: 1, p: 0 }}>
          <Routes>
            <Route path="/" element={<OverviewContainer />} />
            <Route path="/checklist-overview" element={<ChecklistOverview />} />
            <Route path="/checklist-detail/:cardId" element={<ChecklistDetail />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
