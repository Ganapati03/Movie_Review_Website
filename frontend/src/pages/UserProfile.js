import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  Avatar, 
  Button, 
  TextField, 
  Grid, 
  Chip, 
  Divider,
  CircularProgress,
  Paper,
  IconButton
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import api from '../services/api';
import { toast } from 'react-toastify';
import StarRating from '../components/StarRating';

const UserProfile = () => {
  const { id } = useParams();
  const { user: currentUser } = useSelector(state => state.auth);
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    profilePicture: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/users/${id}`);
        setUser(res.data.user);
        setReviews(res.data.reviews);
        setFormData({
          username: res.data.user.username,
          email: res.data.user.email,
          profilePicture: res.data.user.profilePicture || '',
        });
      } catch (error) {
        toast.error('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [id, toast]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.put(`/users/${id}`, formData);
      setUser(res.data);
      toast.success('Profile updated successfully');
      setEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const isOwnProfile = currentUser && currentUser._id === id;

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5">User not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar
                src={user.profilePicture}
                sx={{ width: 120, height: 120, fontSize: '3rem' }}
              >
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                    {user.username}
                  </Typography>
                  {isOwnProfile && (
                    <IconButton
                      color="primary"
                      onClick={() => setEditing(!editing)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </Box>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Member since {new Date(user.joinDate).toLocaleDateString()}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Chip label={`${reviews.length} Reviews`} color="primary" variant="outlined" />
                  <Chip label="Movie Enthusiast" color="secondary" variant="outlined" />
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Edit Profile Form */}
        {editing && isOwnProfile && (
          <Grid item xs={12}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Edit Profile
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Profile Picture URL"
                      name="profilePicture"
                      value={formData.profilePicture}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setEditing(false)}
                        startIcon={<CancelIcon />}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        )}

        {/* Reviews Section */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                Review History
              </Typography>
              <Chip label={`${reviews.length} reviews`} color="primary" variant="outlined" />
            </Box>

            {reviews.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: 'grey.50' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No reviews yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {isOwnProfile ? 'Start reviewing movies to build your review history!' : 'This user hasn\'t written any reviews yet.'}
                </Typography>
                {isOwnProfile && (
                  <Button variant="contained" component={Link} to="/movies">
                    Browse Movies
                  </Button>
                )}
              </Paper>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {reviews.map((review, index) => (
                  <Paper key={review._id} sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" component={Link} to={`/movies/${review.movieId._id}`} sx={{ 
                          textDecoration: 'none', 
                          color: 'primary.main',
                          '&:hover': { textDecoration: 'underline' }
                        }}>
                          {review.movieId.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <StarRating rating={review.rating} size="small" />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(review.timestamp).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {review.reviewText}
                    </Typography>
                    {index < reviews.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Paper>
                ))}
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
