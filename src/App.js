import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Paper, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Login from './pages/Login';
import Exercises from './pages/Exercises';
import DietPlans from './pages/DietPlans';
import AddExercise from './pages/AddExercise';
import AddDietPlan from './pages/AddDietPlan';
import Sidebar from './components/Sidebar';
import AddBlog from './pages/AddBlog';

// Placeholder components for all other sidebar pages
const AllUsers = () => <Box p={2}><Typography variant="h5">All Users</Typography></Box>;
const AddUser = () => <Box p={2}><Typography variant="h5">Add User</Typography></Box>;
const AllDiscounts = () => <Box p={2}><Typography variant="h5">All Discounts</Typography></Box>;
const AddDiscount = () => <Box p={2}><Typography variant="h5">Add Discount</Typography></Box>;
const AllBanners = () => <Box p={2}><Typography variant="h5">All Banners</Typography></Box>;
const AddBanner = () => <Box p={2}><Typography variant="h5">Add Banner</Typography></Box>;
const AllProducts = () => <Box p={2}><Typography variant="h5">All Products</Typography></Box>;
const AddProduct = () => <Box p={2}><Typography variant="h5">Add Product</Typography></Box>;
const AppUpdateInfo = () => <Box p={2}><Typography variant="h5">App Update Info</Typography></Box>;
const AllBlogs = () => <Box p={2}><Typography variant="h5">All Blogs</Typography></Box>;

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f7f9fc',
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  // Custom AppBar with navigation using useNavigate
  const AppBarWithNav = () => {
    const navigate = useNavigate();
    return (
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: '#1976d2' }}>
        <Toolbar>
          {isAuthenticated && (
            <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Box display="flex" alignItems="center" flexGrow={1}>
            <img src="/logo192.png" alt="logo" style={{ width: 32, marginRight: 12 }} />
            <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: 1 }}>
              Fit Veda Admin Panel
            </Typography>
          </Box>
          {isAuthenticated && (
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: '#1565c0', width: 32, height: 32 }}>A</Avatar>
              <Button color="inherit" onClick={() => setIsAuthenticated(false)} sx={{ fontWeight: 500 }}>
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Router>
          <AppBarWithNav />
          <Box sx={{ display: 'flex' }}>
            {isAuthenticated && <Sidebar open={drawerOpen} />}
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
              <Paper elevation={2} sx={{ p: 3, minHeight: '80vh', bgcolor: 'background.paper' }}>
                <Routes>
                  <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                  {/* Exercise Section */}
                  <Route path="/exercises" element={isAuthenticated ? <Exercises /> : <Navigate to="/login" />} />
                  <Route path="/exercises/add" element={isAuthenticated ? <AddExercise /> : <Navigate to="/login" />} />
                  {/* Diet Section */}
                  <Route path="/diets" element={isAuthenticated ? <DietPlans /> : <Navigate to="/login" />} />
                  <Route path="/diets/add" element={isAuthenticated ? <AddDietPlan /> : <Navigate to="/login" />} />
                  {/* User Section */}
                  <Route path="/users" element={isAuthenticated ? <AllUsers /> : <Navigate to="/login" />} />
                  <Route path="/users/add" element={isAuthenticated ? <AddUser /> : <Navigate to="/login" />} />
                  {/* Discount Section */}
                  <Route path="/discounts" element={isAuthenticated ? <AllDiscounts /> : <Navigate to="/login" />} />
                  <Route path="/discounts/add" element={isAuthenticated ? <AddDiscount /> : <Navigate to="/login" />} />
                  {/* Banner Section */}
                  <Route path="/banners" element={isAuthenticated ? <AllBanners /> : <Navigate to="/login" />} />
                  <Route path="/banners/add" element={isAuthenticated ? <AddBanner /> : <Navigate to="/login" />} />
                  {/* Product Section */}
                  <Route path="/products" element={isAuthenticated ? <AllProducts /> : <Navigate to="/login" />} />
                  <Route path="/products/add" element={isAuthenticated ? <AddProduct /> : <Navigate to="/login" />} />
                  {/* App Update Section */}
                  <Route path="/app-update" element={isAuthenticated ? <AppUpdateInfo /> : <Navigate to="/login" />} />
                  {/* Blog Section */}
                  <Route path="/blogs" element={isAuthenticated ? <AllBlogs /> : <Navigate to="/login" />} />
                  <Route path="/blogs/add" element={isAuthenticated ? <AddBlog /> : <Navigate to="/login" />} />
                  {/* Default */}
                  <Route path="*" element={<Navigate to={isAuthenticated ? "/exercises" : "/login"} />} />
                </Routes>
              </Paper>
            </Box>
          </Box>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
