import React from 'react';
import { Box, Alert, Button, Typography } from '@mui/material';
import { Refresh } from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Alert severity="error" sx={{ mb: 2, maxWidth: 600 }}>
            <Typography variant="h6" gutterBottom>
              Something went wrong
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </Typography>
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={() => window.location.reload()}
              sx={{ mt: 1 }}
            >
              Refresh Page
            </Button>
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 