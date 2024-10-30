import { generateUserCredentials } from '../framework/fixtures/userFixture.js';
import { createUser, generateToken, authorizeUser } from '../framework/services/authService.js';

describe('User authorization tests', () => {
  let creds;

  beforeAll(async () => {
    creds = generateUserCredentials();

    await createUser({ userName: creds.username, password: creds.password });
  });

  describe('Token generation', () => {
    it('should generate a token for the created user', async () => {
      const response = await generateToken({ userName: creds.username, password: creds.password });

      expect(response.status).toBe(200);
      expect(response.data.token).toBeDefined();
      expect(response.data.status).toBe('Success');
      expect(response.data.result).toBe('User authorized successfully.');
    });

    it('should return an error when trying to login with incorrect credentials', async () => {
      const invalidCreds = { userName: 'invalidUser@example.com', password: 'InvalidPassword123!' };

      const response = await generateToken(invalidCreds);

      expect(response.status).toBe(200);
      expect(response.data.status).toBe('Failed');
      expect(response.data.result).toBe('User authorization failed.');
    });
  });

  describe('Authorization Tests', () => {
    it('should authorize the created user', async () => {
      const response = await authorizeUser({ userName: creds.username, password: creds.password });
      expect(response.status).toBe(200);
      expect(response.data).toBe(true);
    });

    it('should return an error when trying to authorize with invalid credentials', async () => {
      const invalidCreds = { userName: 'invalidUser@example.com', password: 'InvalidPassword123!' };
      const response = await authorizeUser(invalidCreds);
      expect(response.status).toBe(404);
      expect(response.data.message).toBe('User not found!');
    });
  });
});
