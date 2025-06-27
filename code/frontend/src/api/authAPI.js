import axiosClient from './axiosClient';

export const loginUser = async (credentials) => {
  return await axiosClient.post('/auth/login', credentials);
};

export const registerUser = async (userData) => {
  return await axiosClient.post('/auth/register', userData);
};

export const logoutUser = async () => {
  return await axiosClient.post('/auth/logout');
};

export const getCurrentUser = async () => {
  return await axiosClient.get('/auth/me');
};

export const updateProfile = async (userData) => {
  return await axiosClient.put('/users/profile', userData);
};

export const changePassword = async (passwords) => {
  return await axiosClient.put('/users/change-password', passwords);
};

// OTP and Password Reset Functions
export const sendOtp = async (email) => {
  return await axiosClient.post('/users/sentOtp', { email });
};

export const verifyOtp = async (email, otp) => {
  return await axiosClient.post('/users/verifyOtp', { email, otp });
};

export const resetPassword = async (email, otp, newPassword) => {
  return await axiosClient.post('/users/resetPassword', { email, otp, newPassword });
};