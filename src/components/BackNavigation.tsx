import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export function BackNavigation() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box
      onClick={handleBack}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 2,
        cursor: 'pointer',
        '&:hover': {
          opacity: 0.7,
        },
      }}
    >
      <IconButton
        size="small"
        sx={{
          padding: 0.5,
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
        }}
      >
        Step back
      </Typography>
    </Box>
  );
}
