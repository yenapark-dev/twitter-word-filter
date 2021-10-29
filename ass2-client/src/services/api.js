import axios from 'axios';

export const fetchTwitter = async (data) => {
  return await axios.post('/api/twitter', data);
};

export const fetchTwitterHashtag = async (data) => {
  return await axios.post('/api/twitter-hashtag', data);
};
