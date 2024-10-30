import axios from 'axios';
import config from '../config/config.js';

const apiClient = axios.create({
  baseURL: config.baseURL,
  headers: { 'Content-Type': 'application/json' },
  validateStatus: () => true
});

export async function createUser({ userName, password }) {
  const response = await apiClient.post('/Account/v1/User', {
    userName,
    password
  });
  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  };
}

export async function generateToken({ userName, password }) {
  const response = await apiClient.post('/Account/v1/GenerateToken', {
    userName,
    password
  });
  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  };
}

export async function authorizeUser({ userName, password }) {
  const response = await apiClient.post('/Account/v1/Authorized', { userName, password });
  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  };
}