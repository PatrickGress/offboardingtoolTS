import { Box } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { DebugNav } from './components/DebugNav';
import { MainNav } from './components/MainNav';
import { Footer } from './components/Footer';
import { OverviewContainer } from './components/OverviewContainer';
import { ChecklistOverview } from './components/ChecklistOverview';
import { ChecklistDetail } from './components/ChecklistDetail';
import { PersonProcessOverview } from './components/PersonProcessOverview';

import './App.css';

function App() {
  // Set to true to enable debug navigation
  const debugMode = false;

  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh', margin: 0, padding: 0, width: '100%' }}>
        {debugMode ? <DebugNav /> : <MainNav />}
        <Box sx={{ flex: 1, p: 0, m: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh', width: 'calc(100vw - 260px)', bgcolor: '#f5f5f5' }}>
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<OverviewContainer />} />
              <Route path="/overview" element={<OverviewContainer />} />
              <Route path="/areas" element={<ChecklistOverview />} />
              <Route path="/checklist/:listId" element={<ChecklistDetail />} />
              <Route path="/stepdetail/:stepId" element={<ChecklistDetail />} />
              <Route path="/process/:employeeId" element={<PersonProcessOverview />} />
              <Route path="/process/:employeeId/:listId" element={<ChecklistDetail />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Box>
    </Router>
  );
}

export default App;
