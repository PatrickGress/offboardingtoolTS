import { Box, List, ListItem, ListItemText, Divider, ListItemButton } from '@mui/material';

export function DebugNav({ pages }: { pages: { name: string; onClick: () => void }[] }) {
  return (
    <Box sx={{ width: 140, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider', minHeight: '100vh', m: 0 }}>
      <List>
        {pages.map((page) => (
          <ListItem disablePadding key={page.name}>
            <ListItemButton onClick={page.onClick}>
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[...Array(5)].map((_, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={`Placeholder ${idx + 1}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
