import { apiClient } from './apiClient';

export const petClient = {
  async addPet(petData) {
    return apiClient.post('/pet', petData);
  },

  async updatePet(petData) {
    return apiClient.put('/pet', petData);
  },

  async getPetsByStatus(status) {
    return apiClient.get(`/pet/findByStatus?status=${encodeURIComponent(status)}`);
  },

  async getPetById(petId) {
    return apiClient.get(`/pet/${petId}`);
  },

  async deletePet(petId) {
    return apiClient.delete(`/pet/${petId}`);
  }
};
