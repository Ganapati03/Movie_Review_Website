import React from 'react';
import { 
  Switch, 
  FormControlLabel, 
  Box, 
  Tooltip,
  IconButton
} from '@mui/material';
import { 
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon
} from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ variant = 'switch' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  if (variant === 'icon') {
    return (
      <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          sx={{
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <LightModeIcon sx={{ mr: 1, color: isDarkMode ? 'text.secondary' : 'primary.main' }} />
      <FormControlLabel
        control={
          <Switch
            checked={isDarkMode}
            onChange={toggleTheme}
            color="primary"
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#90caf9',
                '& + .MuiSwitch-track': {
                  backgroundColor: '#90caf9',
                },
              },
            }}
          />
        }
        label=""
        sx={{ m: 0 }}
      />
      <DarkModeIcon sx={{ ml: 1, color: isDarkMode ? 'primary.main' : 'text.secondary' }} />
    </Box>
  );
};

export default ThemeToggle;
