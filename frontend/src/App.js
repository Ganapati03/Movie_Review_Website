import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import AppInitializer from './components/AppInitializer';
import Home from './pages/Home';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import UserProfile from './pages/UserProfile';
import Watchlist from './pages/Watchlist';
import Login from './pages/Login';
import Register from './pages/Register';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
        <Footer />
      </AppInitializer>
    </ThemeProvider>
  );
}

export default App;
