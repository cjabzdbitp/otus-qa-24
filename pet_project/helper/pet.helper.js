import { petClient } from '../clients/petClient';

export const petHelpers = {
  async addPet(petData) {
    const response = await petClient.addPet(petData);
    return { status: response.status, data: response.data };
  },

  async updatePet(petData) {
    const response = await petClient.updatePet(petData);
    return { status: response.status, data: response.data };
  },

  async getPetsByStatus(status) {
    const response = await petClient.getPetsByStatus(status);
    return {
      status: response.status,
      data: response.data
    };
  },

  async getPetById(petId) {
    const response = await petClient.getPetById(petId);
    return { status: response.status, data: response.data };
  },

  async deletePet(petId) {
    const response = await petClient.deletePet(petId);
    return { status: response.status, data: response.data };
  }
};
