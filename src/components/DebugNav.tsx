import { Box, List, ListItem, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';

export function DebugNav() {
  return (
    <Box sx={{ width: 180, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider', minHeight: '100vh', m: 0 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            Employee Overview
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/checklist-overview">
            Checklist Overview
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/checklist-detail/e2a1c7b2-1f3a-4b2c-9e8f-1a2b3c4d5e01">
            Checklist detail (Voluntary)
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/checklist-detail/j1l0m5k9-0c2d-3e4f-5g6h-0j1k2l3m4n10" state={{ processId: 'e6f7a8b3-5d7e-8f9a-0a1b-5c6d7e8f9a05', completion: ['j1l0m5k9-0c2d-3e4f-5g6h-0j1k2l3m4n10'], subflowId: 'j1l0m5k9-0c2d-3e4f-5g6h-0j1k2l3m4n10' }}>
            Shortcut: Subflow Detail (Demo)
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        {[...Array(3)].map((_, idx) => (
          <ListItem key={idx}>
            Placeholder {idx + 1}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
