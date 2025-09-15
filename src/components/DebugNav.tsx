import React from 'react';
import { Box, List, ListItem, ListItemText, Divider } from '@mui/material';

export function DebugNav({ pages }: { pages: { name: string; onClick: () => void }[] }) {
  return (
    <Box sx={{ width: 250, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider', minHeight: '100vh' }}>
      <List>
        {pages.map((page, idx) => (
          <ListItem button key={page.name} onClick={page.onClick}>
            <ListItemText primary={page.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[...Array(5)].map((_, idx) => (
          <ListItem key={idx} disabled>
            <ListItemText primary={`Placeholder ${idx + 1}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
