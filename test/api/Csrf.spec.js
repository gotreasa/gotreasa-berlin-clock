import request from 'supertest';
import app from '../../src/api/app';

describe('CSRF protection', () => {
  test.each([
    ['POST', '/health'],
    ['PUT', '/health'],
    ['DELETE', '/health'],
    ['POST', '/api-docs/'],
  ])('should reject a %s to %s without a CSRF token', async (method, path) => {
    const response = await request(app)[method.toLowerCase()](path).send();

    expect(response.status).toBe(403);
  });

  test('should reject a POST with a well-formed but forged CSRF token', async () => {
    // Right shape (<hmac>.<random>, same in cookie and header) so it reaches the
    // HMAC check, but signed by nobody: the signature comparison must reject it.
    const forgedToken = 'forgedhmacthatnoserversigned.forgedrandomvalue';

    const response = await request(app)
      .post('/health')
      .set('Cookie', `__Host-psifi.x-csrf-token=${forgedToken}`)
      .set('x-csrf-token', forgedToken)
      .send();

    expect(response.status).toBe(403);
  });

  test('should not require a CSRF token for a GET of the time', async () => {
    const response = await request(app).get('/api/v1/time/12:17:57').send();

    expect(response.status).toBe(200);
  });
});
