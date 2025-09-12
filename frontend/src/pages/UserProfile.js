import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box, TextField, Button, Avatar, CircularProgress } from '@mui/material';
import { fetchUserProfile, updateUserProfile } from '../store/slices/usersSlice';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    profilePicture: '',
  });

  useEffect(() => {
    if (user) {
      dispatch(fetchUserProfile(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        email: profile.email || '',
        profilePicture: profile.profilePicture || '',
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserProfile({ userId: user.id, profileData: formData })).unwrap();
      setEditMode(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5">Profile not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar
          src={profile.profilePicture || undefined}
          sx={{ width: 100, height: 100, mr: 3 }}
        >
          {profile.username?.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h5">{profile.username}</Typography>
          <Typography variant="body1" color="text.secondary">
            Member since {new Date(profile.joinDate).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>

      {editMode ? (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500 }}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Profile Picture URL"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            margin="normal"
          />
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" sx={{ mr: 2 }}>
              Save Changes
            </Button>
            <Button variant="outlined" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {profile.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Username:</strong> {profile.username}
          </Typography>
          {profile.profilePicture && (
            <Typography variant="body1" gutterBottom>
              <strong>Profile Picture:</strong> {profile.profilePicture}
            </Typography>
          )}
          <Button variant="contained" onClick={() => setEditMode(true)} sx={{ mt: 2 }}>
            Edit Profile
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default UserProfile;
