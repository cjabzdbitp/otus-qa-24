import axios from 'axios';
import { userUrl } from '../config.js';

export const createUser = async (email, password) => {
  const response = await axios.post(userUrl, {
    userName: email,
    password: password
  });

  return { status: response.status, data: response.data };
};
