import { faker } from '@faker-js/faker';
import { createUser } from './helper/userHelper.js';
import { generateToken } from './helper/tokenHelper.js';

const validPassword = 'Qazwsx123!';

describe('User Creation', () => {
  it('Successfully creates a new user', async () => {
    const email = faker.internet.email();
    const { status, data } = await createUser(email, validPassword);

    expect(status).toBe(201);
    expect(data.userID).toMatch(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);
    expect(data.username).toBe(email);
  });

  it('Returns error when user already exists', async () => {
    const email = faker.internet.email();
    await createUser(email, validPassword);

    await expect(createUser(email, validPassword)).rejects.toMatchObject({
      response: {
        status: 406,
        data: { code: '1204', message: 'User exists!' }
      }
    });
  });

  it('Returns error for invalid password', async () => {
    const email = faker.internet.email();
    const invalidPassword = '123';

    await expect(createUser(email, invalidPassword)).rejects.toMatchObject({
      response: {
        status: 400,
        data: {
          code: '1300',
          message:
            "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."
        }
      }
    });
  });
});

describe('Generation token', () => {
  it('Successful generation token', async () => {
    const email = faker.internet.email();
    await createUser(email, validPassword);

    const { status: statusToken, data: dataToken } = await generateToken(email, validPassword);

    expect(statusToken).toEqual(200);
    expect(dataToken.token).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
    expect(dataToken.expires).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    expect(dataToken.status).toEqual('Success');
    expect(dataToken.result).toEqual('User authorized successfully.');
  });

  it('Failed generation token', async () => {
    const email = faker.internet.email();

    const { status: statusToken, data: dataToken } = await generateToken(email, validPassword);

    expect(statusToken).toEqual(200);
    expect(dataToken.token).toEqual(null);
    expect(dataToken.expires).toEqual(null);
    expect(dataToken.status).toEqual('Failed');
    expect(dataToken.result).toEqual('User authorization failed.');
  });
});
