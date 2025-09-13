import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Avatar, 
  Menu, 
  MenuItem, 
  IconButton,
  Badge,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { 
  Movie as MovieIcon, 
  Person as PersonIcon, 
  Bookmark as BookmarkIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  RateReview as RateReviewIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items: watchlist } = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setAnchorEl(null);
    setDrawerOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MovieWeb
      </Typography>
      <List>
        <ListItem button component={Link} to="/movies">
          <ListItemIcon><MovieIcon /></ListItemIcon>
          <ListItemText primary="Movies" />
        </ListItem>
        <ListItem button component={Link} to="/reviews">
          <ListItemIcon><RateReviewIcon /></ListItemIcon>
          <ListItemText primary="Reviews" />
        </ListItem>
        <ListItem>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', px: 2 }}>
            <ThemeToggle variant="switch" />
          </Box>
        </ListItem>
        {isAuthenticated ? (
          <>
            <ListItem button component={Link} to="/watchlist">
              <ListItemIcon>
                <Badge badgeContent={watchlist.length} color="secondary">
                  <BookmarkIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Watchlist" />
            </ListItem>
            <ListItem button component={Link} to={`/profile/${user?._id}`}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/login">
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/register">
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <MovieIcon sx={{ mr: 1 }} />
            <Typography 
              variant="h6" 
              component={Link} 
              to="/" 
              sx={{ 
                textDecoration: 'none', 
                color: 'inherit',
                fontWeight: 'bold',
                '&:hover': {
                  color: 'primary.light'
                }
              }}
            >
              MovieWeb
            </Typography>
          </Box>
          
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button 
                color="inherit" 
                component={Link} 
                to="/movies"
                startIcon={<MovieIcon />}
                sx={{ fontWeight: 'medium' }}
              >
                Movies
              </Button>
              
              <Button 
                color="inherit" 
                component={Link} 
                to="/reviews"
                startIcon={<RateReviewIcon />}
                sx={{ fontWeight: 'medium' }}
              >
                Reviews
              </Button>
              
              <ThemeToggle variant="icon" />
              
              {isAuthenticated ? (
                <>
                  <Button 
                    color="inherit" 
                    component={Link} 
                    to="/watchlist"
                    startIcon={<BookmarkIcon />}
                    sx={{ fontWeight: 'medium' }}
                  >
                    <Badge badgeContent={watchlist.length} color="secondary">
                      Watchlist
                    </Badge>
                  </Button>
                  
                  <IconButton
                    color="inherit"
                    onClick={handleMenuOpen}
                    sx={{ ml: 1 }}
                  >
                    <Avatar 
                      src={user?.profilePicture} 
                      sx={{ width: 32, height: 32 }}
                    >
                      {user?.username?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                  
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={handleMenuClose} component={Link} to={`/profile/${user?._id}`}>
                      <PersonIcon sx={{ mr: 1 }} />
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon sx={{ mr: 1 }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button 
                    color="inherit" 
                    component={Link} 
                    to="/login"
                    startIcon={<AccountCircleIcon />}
                    sx={{ fontWeight: 'medium' }}
                  >
                    Login
                  </Button>
                  <Button 
                    color="inherit" 
                    component={Link} 
                    to="/register"
                    variant="outlined"
                    sx={{ 
                      fontWeight: 'medium',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'primary.light',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    Register
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
