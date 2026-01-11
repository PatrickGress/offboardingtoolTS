import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import BusinessIcon from '@mui/icons-material/Business';

export function MainNav() {
  const location = useLocation();

  const menuItems = [
    { path: '/overview', label: 'Overview', icon: <DashboardIcon /> },
    { path: '/areas', label: 'Checklists', icon: <PlaylistAddCheckIcon /> },
  ];

  return (
    <Box
      sx={{
        width: 260,
        minWidth: 260,
        maxWidth: 260,
        flexShrink: 0,
        bgcolor: '#1e293b',
        borderRight: '1px solid #334155',
        minHeight: '100vh',
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        zIndex: 10,
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#0f172a',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#475569',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#64748b',
        },
      }}
    >
      {/* Logo Area */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #334155',
          minHeight: '100px',
          bgcolor: '#0f172a',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <BusinessIcon sx={{ fontSize: 40, color: '#3b82f6' }} />
          <Box>
            <Box
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#f8fafc',
                lineHeight: 1.2,
              }}
            >
              Offboard
            </Box>
            <Box
              sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#94a3b8',
                letterSpacing: '0.05em',
              }}
            >
              MANAGEMENT
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Navigation Items */}
      <List sx={{ pt: 2, px: 1.5, flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (item.path === '/overview' && location.pathname === '/');
          
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  px: 2,
                  transition: 'all 0.2s ease-in-out',
                  bgcolor: isActive ? '#3b82f6' : 'transparent',
                  color: isActive ? '#ffffff' : '#cbd5e1',
                  '&:hover': {
                    bgcolor: isActive ? '#2563eb' : '#334155',
                    color: '#ffffff',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.95rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Footer Area (optional) */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid #334155',
          bgcolor: '#0f172a',
          position: 'relative',
          zIndex: 11,
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Box
          sx={{
            fontSize: '0.75rem',
            color: '#64748b',
            textAlign: 'center',
          }}
        >
          v1.0.0
        </Box>
      </Box>
    </Box>
  );
}
