import axios from 'axios';
import { config } from 'process';

const api = axios.create({
  baseURL: 'http://localhost:3001/api' || process.env.BACKEND_URL,
  withCredentials: true,
});

api.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export const apiCreden = axios.create({
  withCredentials: true,
});
export default api;
