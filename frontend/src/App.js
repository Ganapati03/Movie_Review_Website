import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider as CustomThemeProvider, useTheme } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AppInitializer from './components/AppInitializer';
import Home from './pages/Home';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import UserProfile from './pages/UserProfile';
import Watchlist from './pages/Watchlist';
import PublicReviews from './pages/PublicReviews';
import Login from './pages/Login';
import Register from './pages/Register';

const AppContent = () => {
  const { isDarkMode } = useTheme();

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#90caf9' : '#1976d2',
        light: isDarkMode ? '#e3f2fd' : '#42a5f5',
        dark: isDarkMode ? '#1565c0' : '#0d47a1',
      },
      secondary: {
        main: isDarkMode ? '#f48fb1' : '#dc004e',
        light: isDarkMode ? '#fce4ec' : '#ff5983',
        dark: isDarkMode ? '#ad1457' : '#9a0036',
      },
      background: {
        default: isDarkMode ? '#121212' : '#fafafa',
        paper: isDarkMode ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#212121',
        secondary: isDarkMode ? '#b3b3b3' : '#757575',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
            border: isDarkMode ? '1px solid #404040' : 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
            border: isDarkMode ? '1px solid #404040' : 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#1976d2',
            borderBottom: isDarkMode ? '1px solid #404040' : 'none',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppInitializer>
        <Header />
        <Container component="main" sx={{ minHeight: '80vh', py: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/reviews" element={<PublicReviews />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
        <Footer />
      </AppInitializer>
    </ThemeProvider>
  );
};

function App() {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
}

export default App;
