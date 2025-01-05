import axios from 'axios';
import config from '../config/config.js';

export const apiClient = axios.create({
  baseURL: config.baseURL,
  headers: { 'Content-Type': 'application/json' },
  validateStatus: () => true
});
