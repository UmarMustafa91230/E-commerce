export const formatCurrency = (amount, currency = 'USD') => {
  // Ensure currency is a valid string, default to USD if invalid
  const validCurrency = typeof currency === 'string' && currency.length === 3 ? currency : 'USD';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: validCurrency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  
  return new Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(date));
};

export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const formatRating = (rating) => {
  return parseFloat(rating).toFixed(1);
};

export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getOrderStatusColor = (status) => {
  const statusColors = {
    pending: '#ffab00',
    processing: '#2196f3',
    shipped: '#ff9800',
    delivered: '#4caf50',
    cancelled: '#DC143C',
    refunded: '#9c27b0',
  };
  
  return statusColors[status.toLowerCase()] || '#757575';
};

export const getStockStatus = (stock) => {
  if (stock === 0) return { text: 'Out of Stock', color: '#DC143C' };
  if (stock < 5) return { text: 'Low Stock', color: '#ff9800' };
  return { text: 'In Stock', color: '#4caf50' };
};