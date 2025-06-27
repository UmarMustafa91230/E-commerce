import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { Security } from '@mui/icons-material';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  // Check if user is authenticated and has admin role
  // For now, we'll use a simple check - you can modify this based on your user structure
  const isAdmin = isAuthenticated && user?.role === 'admin';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          p: 4,
        }}
      >
        <Security sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          You don't have permission to access this page.
        </Typography>
        <Button variant="contained" href="/dashboard">
          Go to Dashboard
        </Button>
      </Box>
    );
  }

  return children;
};

export default AdminRoute; 