import axios from './axios-client';

export const fetchTwitter = async (data = {}) => {
  return await axios.get('/twitter', { params: data });
};
