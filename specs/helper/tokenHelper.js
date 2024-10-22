import axios from 'axios';
import { tokenUrl } from '../config.js';

export const generateToken = async (email, password) => {
  const response = await axios.post(tokenUrl, {
    userName: email,
    password: password
  });

  return { status: response.status, data: response.data };
};
