import { petSchema } from '../../shemas/petSchema.js';
import { petData } from '../../data/petData.js';
import { petHelpers } from '../../helper/pet.helper.js';
import { matchers } from 'jest-json-schema';
expect.extend(matchers);

describe('Pet API Tests', () => {
  let createdPets = [];

  afterAll(async () => {
    for (const petId of createdPets) {
      await petHelpers.deletePet(petId);
    }
  });

  it('should create a pet with valid data', async () => {
    const newPet = petData.getValidPet();
    const { status, data } = await petHelpers.addPet(newPet);

    expect(status).toBe(200);
    expect(data).toHaveProperty('id');
    expect(data.name).toBe(newPet.name);
    expect(data).toMatchSchema(petSchema);

    createdPets.push(data.id);
  });

  it('should return error when adding a pet with incorrect data', async () => {
    const invalidPet = petData.getInvalidTypePet();
    const { status, data } = await petHelpers.addPet(invalidPet);

    expect(status).toBe(500);
    expect(data.message).toContain('something bad happened');
  });

  it('should update an existing pet', async () => {
    const newPet = petData.getValidPet();
    const createdPet = await petHelpers.addPet(newPet);
    expect(createdPet.status).toBe(200);

    const updatedPet = { ...createdPet.data, name: 'UpdatedName', status: 'pending' };
    const { status, data } = await petHelpers.updatePet(updatedPet);

    expect(status).toBe(200);
    expect(data.name).toBe('UpdatedName');
    expect(data.status).toBe('pending');
    expect(data).toMatchSchema(petSchema);

    createdPets.push(createdPet.data.id);
  });

  it('should return error when updating with an invalid pet_id', async () => {
    const newPet = petData.getValidPet();
    const createdPet = await petHelpers.addPet(newPet);
    expect(createdPet.status).toBe(200);

    const invalidPet = { ...createdPet.data, id: 'invalid_id' };
    const { status } = await petHelpers.updatePet(invalidPet);

    expect(status).toBe(500);

    createdPets.push(createdPet.data.id);
  });

  it.each(['available', 'pending', 'sold'])("should find a created pet by status '%s'", async status => {
    const newPet = petData.getValidPet();
    newPet.status = status;
    const createdPet = await petHelpers.addPet(newPet);
    expect(createdPet.status).toBe(200);

    const petId = createdPet.data.id;
    const { status: resStatus, data } = await petHelpers.getPetsByStatus(status);

    expect(resStatus).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.some(pet => pet.id === petId)).toBe(true);

    createdPets.push(petId);
  });

  it('should return an empty array for an invalid status', async () => {
    const { status, data } = await petHelpers.getPetsByStatus('invalid_status');

    expect(status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });

  it('should find a created pet by id', async () => {
    const newPet = petData.getValidPet();
    const createdPet = await petHelpers.addPet(newPet);
    expect(createdPet.status).toBe(200);

    const petId = createdPet.data.id;
    const { status, data } = await petHelpers.getPetById(petId);

    expect(status).toBe(200);
    expect(data).toMatchSchema(petSchema);
    expect(data.id).toBe(petId);
    expect(data.name).toBe(newPet.name);
    expect(data.status).toBe(newPet.status);

    createdPets.push(petId);
  });

  it('should return error for non-existent pet_id', async () => {
    const response = await petHelpers.getPetById(0);

    expect(response.status).toBe(404);
    expect(response.data.message).toBe('Pet not found');
  });

  it('should delete a pet successfully', async () => {
    const newPet = petData.getValidPet();
    const createdPet = await petHelpers.addPet(newPet);
    expect(createdPet.status).toBe(200);

    const petId = createdPet.data.id;
    const deleteResponse = await petHelpers.deletePet(petId);
    expect(deleteResponse.status).toBe(200);

    const getResponse = await petHelpers.getPetById(petId);
    expect(getResponse.status).toBe(404);
  });

  it('should return error when deleting non-existent pet', async () => {
    const deleteResponse = await petHelpers.deletePet(0);

    expect(deleteResponse.status).toBe(404);
    expect(deleteResponse.data).toEqual({});
  });
});
