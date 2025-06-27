import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';
import { Science, Warning } from '@mui/icons-material';

const DevBanner = () => {
  return (
    <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}>
      <Alert 
        severity="info" 
        icon={<Science />}
        sx={{ 
          borderRadius: 0,
          '& .MuiAlert-message': {
            width: '100%'
          }
        }}
      >
        <AlertTitle>Development Mode</AlertTitle>
        This is a test environment with dummy data. Use the test credentials below to access different user roles.
        <Box sx={{ mt: 1, fontFamily: 'monospace', fontSize: '0.875rem' }}>
          <strong>Admin:</strong> brandrkhanoffical@gmail.com / admin123 | 
          <strong>User:</strong> brandrkhanoffical@gmail.com / user123
        </Box>
      </Alert>
    </Box>
  );
};

export default DevBanner; 