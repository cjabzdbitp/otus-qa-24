import { apiClient } from './apiClient.js';

export async function createBook({ userId, collectionOfIsbns, username, password }) {
  const response = await apiClient.post(
    '/BookStore/v1/Books',
    { userId, collectionOfIsbns },
    {
      auth: {
        username,
        password
      }
    }
  );

  return {
    status: response.status,
    data: response.data
  };
}

export async function getBookByISBN(isbn) {
  const response = await apiClient.get(`/BookStore/v1/Book?ISBN=${isbn}`);
  return {
    status: response.status,
    data: response.data
  };
}