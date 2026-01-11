import { Box, Typography } from '@mui/material';

export function Footer() {
  return (
    <Box
      sx={{
        position: 'relative',
        left: 0,
        width: '100vw',
        marginLeft: 'calc(-100vw + 100% + 260px)',
        bgcolor: '#0f172a',
        borderTop: '1px solid #334155',
        py: 2,
        px: 4,
        mt: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: '#64748b',
          fontSize: '0.75rem',
        }}
      >
        © 2026 Offboard Management. All rights reserved.
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: '#64748b',
          fontSize: '0.75rem',
        }}
      >
        Built with care
      </Typography>
    </Box>
  );
}
