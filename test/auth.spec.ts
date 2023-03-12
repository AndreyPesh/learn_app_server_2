import request from './lib/request';
// import { createUser } from '../src/services/user.service'
// import { registerUserHandler } from '../src/controllers/auth.controller';

const userData = { name: 'andrei', email: 'awwe@mail.ru', password: '123456789', passwordConfirm: '123456789' };

jest.mock('../src/services/user.service')

describe('Router', () => {
  test('Registration without data must be fail', async () => {
    const res = await request.post('/api/auth/register');
    expect(res.status).toBe(400);
  });

  test('Registration with data must be success', async () => {
    const createUser = jest.fn()
    const res = await request.post('/api/auth/register').send(userData);
  });

  test('Check exist user', async () => {
    const res = await request.post('/api/auth/register').send(userData);
    expect(res.status).toBe(409);
  });
});
