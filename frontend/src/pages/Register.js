import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { register, clearError } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    dispatch(register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="Username"
          name="username"
          margin="normal"
          required
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          margin="normal"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          margin="normal"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          error={formData.password !== formData.confirmPassword}
          helperText={formData.password !== formData.confirmPassword ? 'Passwords do not match' : ''}
        />
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading || formData.password !== formData.confirmPassword}
        >
          {loading ? <CircularProgress size={24} /> : 'Register'}
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
