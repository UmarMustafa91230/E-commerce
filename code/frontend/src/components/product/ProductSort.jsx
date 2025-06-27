import React from 'react';
import { FormControl, Select, MenuItem, InputLabel, Box } from '@mui/material';

const ProductSort = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price_asc', label: 'Price (Low to High)' },
    { value: 'price_desc', label: 'Price (High to Low)' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
  ];

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          label="Sort By"
          onChange={(e) => onSortChange(e.target.value)}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProductSort;