import { Box, List, ListItem, ListItemText, Divider, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';

export function DebugNav() {
  return (
    <Box sx={{ width: 180, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider', minHeight: '100vh', m: 0 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Employee Overview" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/checklist-overview">
            <ListItemText primary="Checklist Overview" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/checklist-detail/hr-voluntary">
            <ListItemText primary="Checklist detail (Voluntary)" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {[...Array(3)].map((_, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={`Placeholder ${idx + 1}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
