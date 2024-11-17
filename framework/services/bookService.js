import { apiClient } from './apiClient.js';

export async function createBook({ userId, collectionOfIsbns, username, password }) {
  try {
    const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');

    const headers = {
      Authorization: `Basic ${basicAuth}`
    };

    const response = await apiClient.post('/BookStore/v1/Books', { userId, collectionOfIsbns }, { headers });

    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: error.response?.data || { message: 'Unexpected error occurred' }
    };
  }
}

export async function getBookByISBN(isbn) {
  try {
    const response = await apiClient.get(`/BookStore/v1/Book?ISBN=${isbn}`);
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    return {
      status: error.response?.status || 500,
      data: error.response?.data || { message: 'Unexpected error occurred' }
    };
  }
}
