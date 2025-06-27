import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const checkoutSchema = Yup.object({
  shippingAddress: Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string().required('ZIP code is required'),
    country: Yup.string().required('Country is required'),
    phone: Yup.string().required('Phone number is required'),
  }),
  paymentMethod: Yup.string().required('Payment method is required'),
});

export const profileSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\+?[\d\s-()]+$/, 'Invalid phone number')
    .required('Phone number is required'),
});

export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const productSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Product name must be at least 2 characters')
    .max(100, 'Product name cannot be more than 100 characters')
    .required('Product name is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description cannot be more than 2000 characters')
    .required('Product description is required'),
  price: Yup.number()
    .min(0, 'Price cannot be negative')
    .required('Price is required'),
  category: Yup.string()
    .oneOf(["Men's Watches", "Women's Watches", "Branded Pre-owned Watches", "Top Brand Original Quality Watches", "Master Copy Watches"], 'Invalid category')
    .required('Category is required'),
  brand: Yup.string()
    .min(2, 'Brand must be at least 2 characters')
    .required('Brand is required'),
  stock: Yup.number()
    .min(0, 'Stock cannot be negative')
    .required('Stock quantity is required'),
  images: Yup.array()
    .min(1, 'At least 1 image is required')
    .max(6, 'You can upload up to 6 images only'),
});