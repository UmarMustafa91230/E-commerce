import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, register } from '../../redux/slices/authSlice';
import { Box, Button, TextField, Typography, Paper, Alert } from '@mui/material';

const TestCredentials = () => {
  const dispatch = useDispatch();
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const testBackendConnection = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const response = await fetch('http://localhost:5000/test');
      const data = await response.json();
      
      if (response.ok) {
        setTestResult({
          type: 'success',
          message: `Backend connection successful: ${data.message}`
        });
      } else {
        setTestResult({
          type: 'error',
          message: 'Backend connection failed'
        });
      }
    } catch (error) {
      setTestResult({
        type: 'error',
        message: `Backend connection error: ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testLogin = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const result = await dispatch(login({
        email: 'test@example.com',
        password: 'password123'
      })).unwrap();
      
      setTestResult({
        type: 'success',
        message: `Login successful! Welcome ${result.user.name}`
      });
    } catch (error) {
      setTestResult({
        type: 'error',
        message: `Login failed: ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testRegister = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const result = await dispatch(register({
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123'
      })).unwrap();
      
      setTestResult({
        type: 'success',
        message: `Registration successful! Welcome ${result.user.name}`
      });
    } catch (error) {
      setTestResult({
        type: 'error',
        message: `Registration failed: ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, m: 2, maxWidth: 600 }}>
      <Typography variant="h6" gutterBottom>
        Backend Connection Test
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <Button 
          variant="outlined" 
          onClick={testBackendConnection}
          disabled={isLoading}
        >
          Test Backend Connection
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={testLogin}
          disabled={isLoading}
        >
          Test Login
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={testRegister}
          disabled={isLoading}
        >
          Test Register
        </Button>
              </Box>
              
      {testResult && (
        <Alert severity={testResult.type} sx={{ mt: 2 }}>
          {testResult.message}
        </Alert>
      )}
    </Paper>
  );
};

export default TestCredentials; 