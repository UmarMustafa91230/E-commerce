import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  Slider,
  Button,
  Divider,
  Rating,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { formatCurrency } from '../../utils/formatters';

const ProductFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const categories = [
    { value: '', label: 'All Categories' },
    { value: "Men's Watches", label: "Men's Watches" },
    { value: "Women's Watches", label: "Women's Watches" },
    { value: "Branded Pre-owned Watches", label: 'Branded Pre-owned Watches' },
    { value: "Top Brand Original Quality Watches", label: 'Top Brand Original Quality Watches' },
    { value: "Master Copy Watches", label: 'Master Copy Watches' },
  ];

  const brands = [
    'Emporio Armani',
    'Michael Kors',
    'Tommy Hilfiger',
    'Hugo Boss',
    'Fossil',
  ];

  const handlePriceChange = (event, newValue) => {
    onFilterChange({
      priceRange: newValue,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    });
  };

  const handleCategoryChange = (event) => {
    onFilterChange({ category: event.target.value });
  };

  const handleBrandChange = (brand) => {
    const currentBrands = filters.brand ? filters.brand.split(',') : [];
    const newBrands = currentBrands.includes(brand)
      ? currentBrands.filter(b => b !== brand)
      : [...currentBrands, brand];
    
    onFilterChange({ brand: newBrands.join(',') });
  };

  const handleRatingChange = (event, value) => {
    onFilterChange({ rating: value });
  };

  const priceRange = filters.priceRange || [0, 10000];
  const selectedBrands = filters.brand ? filters.brand.split(',') : [];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Filters</Typography>
        <Button size="small" onClick={onClearFilters}>
          Clear All
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Category Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" fontWeight={500}>
            Category
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <RadioGroup
              value={filters.category}
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <FormControlLabel
                  key={category.value}
                  value={category.value}
                  control={<Radio size="small" />}
                  label={category.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* Price Range Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" fontWeight={500}>
            Price Range
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 1 }}>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => formatCurrency(value)}
              min={0}
              max={10000}
              step={100}
              marks={[
                { value: 0, label: '$0' },
                { value: 2500, label: '$2.5K' },
                { value: 5000, label: '$5K' },
                { value: 10000, label: '$10K' },
              ]}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2">
                {formatCurrency(priceRange[0])}
              </Typography>
              <Typography variant="body2">
                {formatCurrency(priceRange[1])}
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Brand Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" fontWeight={500}>
            Brand
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {brands.map((brand) => (
              <FormControlLabel
                key={brand}
                control={
                  <Checkbox
                    size="small"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                }
                label={brand}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Rating Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" fontWeight={500}>
            Minimum Rating
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating
              value={filters.rating || 0}
              onChange={handleRatingChange}
              precision={0.5}
            />
            <Typography variant="body2">& up</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ProductFilters;