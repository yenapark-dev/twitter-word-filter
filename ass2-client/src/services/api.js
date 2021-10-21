import axios from './axios-client';

export const fetchTwitter = async (data) => {
  return await axios.post('/twitter', data);
};
