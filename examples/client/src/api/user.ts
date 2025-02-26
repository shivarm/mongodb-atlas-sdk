import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const createUser = async (userData: { name: string; email: string; age: number }) => {
  const response = await axios.post(`${API_BASE_URL}/users`, userData);
  return response.data;
};

export const getUser = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};
