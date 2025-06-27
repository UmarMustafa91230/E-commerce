import axiosClient from './axiosClient';

// Mock offers data
const mockOffers = [
  {
    id: 1,
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    description: '10% off on your first order',
    minOrder: 100,
    validUntil: '2024-12-31',
    isActive: true
  },
  {
    id: 2,
    code: 'SAVE50',
    type: 'fixed',
    value: 50,
    description: '$50 off on orders above $500',
    minOrder: 500,
    validUntil: '2024-12-31',
    isActive: true
  },
  {
    id: 3,
    code: 'LUXURY20',
    type: 'percentage',
    value: 20,
    description: '20% off on luxury watches',
    category: 'luxury',
    validUntil: '2024-12-31',
    isActive: true
  }
];

export const fetchOffers = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockOffers.filter(offer => offer.isActive);
};

export const applyOfferCode = async (code) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const offer = mockOffers.find(o => o.code === code && o.isActive);
  if (!offer) {
    throw new Error('Invalid or expired offer code');
  }
  
  return offer;
};

export const createOffer = async (offerData) => {
  return await axiosClient.post('/offers', offerData);
};

export const updateOffer = async (id, offerData) => {
  return await axiosClient.put(`/offers/${id}`, offerData);
};

export const deleteOffer = async (id) => {
  return await axiosClient.delete(`/offers/${id}`);
};

export const getOfferUsage = async (id) => {
  return await axiosClient.get(`/offers/${id}/usage`);
};