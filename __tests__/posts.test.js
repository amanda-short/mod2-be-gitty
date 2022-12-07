const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService.js');

describe('posts route', () => {
  beforeEach(() => {
    return setup(pool);
  });
  const mockPost = {
    body: 'Happy Friday',
  };

  const mockUser = {
    first_name: 'Test',
    last_name: 'User',
    email: 'test@example.com',
    password: '321321',
  };

  it('POST /api/v1/posts creates a new post', async () => {
    const agent = request.agent(app);
    await UserService.create({ ...mockUser });
    await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'test@example.com', password: '321321' });
    const res = await agent.post('/api/v1/posts').send(mockPost);
    expect(res.status).toBe(200);
    const { body } = mockPost;

    expect(res.body).toEqual({
      id: expect.any(String),
      body,
    });
  });
});

afterAll(() => {
  pool.end();
});
