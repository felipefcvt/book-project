import axios from 'axios';

const api: any = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export default api;
