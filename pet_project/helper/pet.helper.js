import { petClient } from '../clients/petClient';

export const petHelpers = {
  async addPet(petData) {
    try {
      const response = await petClient.addPet(petData);
      return { status: response.status, data: response.data };
    } catch (error) {
      return { status: error.response?.status || 500, data: error.response?.data || {} };
    }
  },

  async updatePet(petData) {
    try {
      const response = await petClient.updatePet(petData);
      return { status: response.status, data: response.data };
    } catch (error) {
      return { status: error.response?.status || 500, data: error.response?.data || {} };
    }
  },

  async getPetsByStatus(status) {
    try {
      const response = await petClient.getPetsByStatus(status);
      return {
        status: response.status,
        data: response.data
      };
    } catch (error) {
      return {
        status: error.response?.status || 500
      };
    }
  },

  async getPetById(petId) {
    try {
      const response = await petClient.getPetById(petId);
      return { status: response.status, data: response.data };
    } catch (error) {
      return { status: error.response?.status || 500, data: error.response?.data || {} };
    }
  },

  async deletePet(petId) {
    try {
      const response = await petClient.deletePet(petId);
      return { status: response.status, data: response.data };
    } catch (error) {
      return { status: error.response?.status || 500, data: error.response?.data || {} };
    }
  }
};
