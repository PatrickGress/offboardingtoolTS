import { Box } from '@mui/material';

import { DebugNav } from './components/DebugNav';
import { OverviewContainer } from './components/OverviewContainer';

import './App.css';

function App() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.100' }}>
      <DebugNav pages={[{ name: 'Overview', onClick: () => {} }]} />
      <Box sx={{ flex: 1, p: 0 }}>
        <OverviewContainer />
      </Box>
    </Box>
  );
}

export default App;
