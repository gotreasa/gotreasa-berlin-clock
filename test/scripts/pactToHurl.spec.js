import { pactToHurl } from '../../scripts/pactToHurl';

const pact = (...interactions) => ({ interactions });

describe('Converting the consumer pact into a Hurl file', () => {
  test('should write one entry per interaction with the expected status', () => {
    expect(
      pactToHurl(
        pact(
          {
            description: 'a request the health endpoint',
            request: { method: 'GET', path: '/health' },
            response: { status: 200 },
          },
          {
            description: 'a request for invalid time',
            request: { method: 'get', path: '/api/v1/time/1a:17:57' },
            response: { status: 400 },
          },
        ),
      ),
    ).toBe(
      [
        '# a request the health endpoint',
        'GET {{url}}/health',
        'HTTP 200',
        '',
        '# a request for invalid time',
        'GET {{url}}/api/v1/time/1a:17:57',
        'HTTP 400',
        '',
      ].join('\n'),
    );
  });

  test('should keep a pact v2 query string', () => {
    expect(
      pactToHurl(
        pact({
          description: 'a query',
          request: { method: 'GET', path: '/search', query: 'q=a b&page=2' },
          response: { status: 200 },
        }),
      ),
    ).toContain('GET {{url}}/search?q=a b&page=2\n');
  });

  test('should encode a pact v3 query object with repeated values', () => {
    expect(
      pactToHurl(
        pact({
          description: 'a query',
          request: {
            method: 'GET',
            path: '/search',
            query: { q: ['a b'], tag: ['x', 'y'] },
          },
          response: { status: 200 },
        }),
      ),
    ).toContain('GET {{url}}/search?q=a+b&tag=x&tag=y\n');
  });

  test('should send request headers and a JSON body', () => {
    expect(
      pactToHurl(
        pact({
          description: 'a post',
          request: {
            method: 'POST',
            path: '/time',
            headers: { 'Content-Type': 'application/json' },
            body: { time: '12:00:00' },
          },
          response: { status: 201 },
        }),
      ),
    ).toBe(
      [
        '# a post',
        'POST {{url}}/time',
        'Content-Type: application/json',
        '{"time":"12:00:00"}',
        'HTTP 201',
        '',
      ].join('\n'),
    );
  });

  test('should send a text body as it is', () => {
    expect(
      pactToHurl(
        pact({
          description: 'a text post',
          request: { method: 'POST', path: '/echo', body: 'hello' },
          response: { status: 200 },
        }),
      ),
    ).toContain('POST {{url}}/echo\n```\nhello\n```\nHTTP 200\n');
  });

  test('should refuse a pact without interactions', () => {
    expect(() => pactToHurl({ interactions: [] })).toThrow(
      'The pact has no interactions',
    );
    expect(() => pactToHurl({})).toThrow('The pact has no interactions');
  });
});
