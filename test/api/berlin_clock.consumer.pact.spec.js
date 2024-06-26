import { pactWith } from 'jest-pact';
import axios from 'axios';
import http from 'http';

const OK = 200;
const BAD_REQUEST = 400;
const HTML_BODY = 'text/html; charset=utf-8';
const TIME_ENDPOINT = '/api/v1/time';

const YELLOW_LIGHT = 'Y';
const LIGHT_OFF = 'O';
pactWith(
  { consumer: 'berlin_clock_client', provider: 'berlin_clock_app' },
  (provider) => {
    describe('Berlin Clock API', () => {
      let instance;

      beforeAll(() => {
        instance = axios.create({
          baseURL: provider.mockService.baseUrl,
          httpAgent: new http.Agent({ keepAlive: false }),
        });
      });

      describe('Health Endpoint', () => {
        beforeEach(() => {
          return provider.addInteraction({
            state: 'health check',
            uponReceiving: 'a request the health endpoint',
            withRequest: {
              method: 'GET',
              path: '/health',
            },
            willRespondWith: {
              status: OK,
            },
          });
        });

        test('should return a response of OK for the health endpoint', async () => {
          const response = await instance.get('/health');
          expect(response.status).toBe(OK);
        });
      });

      describe('OpenAPI Endpoint', () => {
        beforeEach(() => {
          return provider.addInteraction({
            state: 'openapi endpoint',
            uponReceiving: 'a request the openapi endpoint',
            withRequest: {
              method: 'GET',
              path: '/api-docs/',
            },
            willRespondWith: {
              status: OK,
              headers: {
                'Content-Type': HTML_BODY,
              },
            },
          });
        });

        test('should return a response of OK for the OpenAPI endpoint', async () => {
          const response = await instance.get('/api-docs/');
          expect(response.status).toBe(OK);
        });
      });

      describe('Even Seconds', () => {
        const midnightTime = `${TIME_ENDPOINT}/00:00:00`;

        beforeEach(() => {
          return provider.addInteraction({
            state: 'Midnight',
            uponReceiving: 'a request for midnight',
            withRequest: {
              method: 'GET',
              path: midnightTime,
            },
            willRespondWith: {
              status: OK,
              body: {
                seconds: 'O',
                firstRow: 'OOOO',
                secondRow: 'OOOO',
                thirdRow: 'OOOOOOOOOOO',
                fourthRow: 'OOOO',
              },
            },
          });
        });

        test('should return a response of OK', async () => {
          const response = await instance.get(midnightTime);
          expect(response.status).toBe(OK);
        });

        test('should switch off the second light yellow at midnight', async () => {
          const response = await instance.get(midnightTime);
          expect(response.data.seconds).toBe(LIGHT_OFF);
        });

        test('should have all the lights on the first row off', async () => {
          const response = await instance.get(midnightTime);
          expect(response.data.firstRow).toBe('OOOO');
        });

        test('should have all the lights on the second row off', async () => {
          const response = await instance.get(midnightTime);
          expect(response.data.secondRow).toBe('OOOO');
        });

        test('should have all the lights on the third row off', async () => {
          const response = await instance.get(midnightTime);
          expect(response.data.thirdRow).toBe('OOOOOOOOOOO');
        });

        test('should have all the lights on the fourth row off', async () => {
          const response = await instance.get(midnightTime);
          expect(response.data.fourthRow).toBe('OOOO');
        });
      });

      describe('Odd Seconds', () => {
        const timeWithOddSeconds = `${TIME_ENDPOINT}/12:17:57`;

        beforeEach(() => {
          return provider.addInteraction({
            state: '12:17:57',
            uponReceiving: 'a request for the time 12:17:57',
            withRequest: {
              method: 'GET',
              path: timeWithOddSeconds,
            },
            willRespondWith: {
              status: OK,
              body: {
                seconds: 'Y',
                firstRow: 'RROO',
                secondRow: 'RROO',
                thirdRow: 'YYROOOOOOOO',
                fourthRow: 'YYOO',
              },
            },
          });
        });

        test('should return a response of OK', async () => {
          const response = await instance.get(timeWithOddSeconds);
          expect(response.status).toBe(OK);
        });

        test('should light the second light yellow at 12:17:57', async () => {
          const response = await instance.get(timeWithOddSeconds);
          expect(response.data.seconds).toBe(YELLOW_LIGHT);
        });

        test('should light the first two lights red in the first row at 12:17:57', async () => {
          const response = await instance.get(timeWithOddSeconds);
          expect(response.data.firstRow).toBe('RROO');
        });

        test('should light the first two lights red in the second row at 12:17:57', async () => {
          const response = await instance.get(timeWithOddSeconds);
          expect(response.data.secondRow).toBe('RROO');
        });

        test('should light all the lights on the third row at 12:17:57', async () => {
          const response = await instance.get(timeWithOddSeconds);
          expect(response.data.thirdRow).toBe('YYROOOOOOOO');
        });

        test('should light the first two lights yellow the fourth row at 12:17:57', async () => {
          const response = await instance.get(timeWithOddSeconds);
          expect(response.data.fourthRow).toBe('YYOO');
        });
      });

      describe('Invalid Time', () => {
        const invalidTime = `${TIME_ENDPOINT}/1a:17:57`;

        beforeEach(() => {
          return provider.addInteraction({
            uponReceiving: 'a request for invalid time',
            withRequest: {
              method: 'GET',
              path: invalidTime,
            },
            willRespondWith: {
              status: BAD_REQUEST,
              body: {
                message: 'Your input should be in the format of HH:MM:ss',
              },
            },
          });
        });

        test('should return a response of Bad Request', async () => {
          try {
            await instance.get(invalidTime);
            expect(true).toBe(false);
          } catch (error) {
            expect(error.response.status).toBe(BAD_REQUEST);
          }
        });

        test('should light the second light yellow at 1a:17:57', async () => {
          try {
            await instance.get(invalidTime);
            expect(true).toBe(false);
          } catch (error) {
            expect(error.response.data.message).toBe(
              'Your input should be in the format of HH:MM:ss',
            );
          }
        });
      });
    });
  },
);
