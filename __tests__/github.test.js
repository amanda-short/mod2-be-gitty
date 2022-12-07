const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const UserService = require('../lib/services/UserService');

describe('github route', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('/api/v1/github/login should redirect to oauth', async () => {
    const res = await request(app).get('/api/v1/github/login');
    expect(res.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d.]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/callback/i
    );
  });

  it('/api/v1/github/callback should redirect logged in users to dashboard', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);
    expect(res.body).toEqual({
      id: expect.any(String),
      login: 'mock_github_user',
      email: '1@1.com',
      avatar:
        'https://shatterme.fandom.com/wiki/Dog?file=ArtbreederGeneralLogo_.jpg',
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });
});
