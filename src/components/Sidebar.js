import React, { useState } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Toolbar, Divider, Box, Typography } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ImageIcon from '@mui/icons-material/Image';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;
const miniDrawerWidth = 64;

const sections = [
  {
    label: 'Exercise Section',
    icon: <FitnessCenterIcon />,
    subsections: [
      { label: 'All Exercises', path: '/exercises' },
      { label: 'Add Exercise', path: '/exercises/add' },
    ],
  },
  {
    label: 'Diet Section',
    icon: <RestaurantIcon />,
    subsections: [
      { label: 'All Diet Plans', path: '/diets' },
      { label: 'Add Diet Plan', path: '/diets/add' },
    ],
  },
  {
    label: 'User Section',
    icon: <PeopleIcon />,
    subsections: [
      { label: 'All Users', path: '/users' },
      { label: 'Add User', path: '/users/add' },
    ],
  },
  {
    label: 'Discount Section',
    icon: <LocalOfferIcon />,
    subsections: [
      { label: 'All Discounts', path: '/discounts' },
      { label: 'Add Discount', path: '/discounts/add' },
    ],
  },
  {
    label: 'Banner Section',
    icon: <ImageIcon />,
    subsections: [
      { label: 'All Banners', path: '/banners' },
      { label: 'Add Banner', path: '/banners/add' },
    ],
  },
  {
    label: 'Product Section',
    icon: <ShoppingCartIcon />,
    subsections: [
      { label: 'All Products', path: '/products' },
      { label: 'Add Product', path: '/products/add' },
    ],
  },
  {
    label: 'App Update Section',
    icon: <SystemUpdateAltIcon />,
    subsections: [
      { label: 'Update Info', path: '/app-update' },
    ],
  },
  {
    label: 'Blog Section',
    icon: <ArticleIcon />,
    subsections: [
      { label: 'All Blogs', path: '/blogs' },
      { label: 'Add Blog', path: '/blogs/add' },
    ],
  },
];

const Sidebar = ({ open }) => {
  const [openSections, setOpenSections] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const handleSectionClick = (label) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : miniDrawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        [`& .MuiDrawer-paper`]: {
          width: open ? drawerWidth : miniDrawerWidth,
          transition: 'width 0.2s',
          overflowX: 'hidden',
          background: '#f7f9fc',
          borderRight: '1px solid #e0e0e0',
        },
      }}
    >
      <Toolbar sx={{ justifyContent: open ? 'flex-start' : 'center' }}>
        <Box display="flex" alignItems="center" width="100%" justifyContent={open ? 'flex-start' : 'center'}>
          <img src="/logo192.png" alt="logo" style={{ width: 32, marginRight: open ? 8 : 0 }} />
          {open && <Typography variant="h6" fontWeight="bold" color="primary">Fit Admin</Typography>}
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {sections.map((section) => (
          <React.Fragment key={section.label}>
            <ListItemButton
              onClick={() => open && handleSectionClick(section.label)}
              sx={{
                '&:hover': { background: '#e3eafc' },
                background: openSections[section.label] && open ? '#e3eafc' : 'inherit',
                justifyContent: open ? 'flex-start' : 'center',
                px: 2,
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>{section.icon}</ListItemIcon>
              {open && <ListItemText primary={section.label} />}
              {open && (openSections[section.label] ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            {open && (
              <Collapse in={openSections[section.label]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {section.subsections.map((sub) => (
                    <ListItemButton
                      key={sub.label}
                      sx={{ pl: 4, '&:hover': { background: '#e3eafc' }, background: location.pathname === sub.path ? '#d2e3fc' : 'inherit' }}
                      onClick={() => navigate(sub.path)}
                      selected={location.pathname === sub.path}
                    >
                      <ListItemText primary={sub.label} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
      <Box flexGrow={1} />
      <Divider />
      <List>
        <ListItemButton sx={{ '&:hover': { background: '#e3eafc' }, justifyContent: open ? 'flex-start' : 'center', px: 2 }}>
          <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}><SettingsIcon /></ListItemIcon>
          {open && <ListItemText primary="Settings" />}
        </ListItemButton>
        <ListItemButton sx={{ '&:hover': { background: '#e3eafc' }, justifyContent: open ? 'flex-start' : 'center', px: 2 }}>
          <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}><LogoutIcon /></ListItemIcon>
          {open && <ListItemText primary="Logout" />}
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar; 