import { faker } from '@faker-js/faker';

export function generateUserCredentials() {
  const creds = {
    username: faker.internet.email(),
    password: faker.internet.password(12, true, /[A-Za-z0-9!@#$%^&*]/) + '!'
  };
  return creds;
}
