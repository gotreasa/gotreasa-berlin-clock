const { pactWith } = require('jest-pact');
const axios = require('axios');

const OK = 200;
const TIME_ENDPOINT = '/api/v1/time';

pactWith(
  { consumer: 'berlin_clock_client', provider: 'berlin_clock_app' },
  (provider) => {
    describe('Berlin Clock API', () => {
      let instance;

      beforeAll(() => {
        instance = axios.create({
          baseURL: provider.mockService.baseUrl,
        });
      });

      describe('Even Seconds', () => {
        const midnightTime = `${TIME_ENDPOINT}/00:00:00`;

        beforeEach(() => {
          return provider.addInteraction({
            state: 'Midnight',
            uponReceiving: 'a request for the time',
            withRequest: {
              method: 'GET',
              path: midnightTime,
            },
            willRespondWith: {
              status: OK,
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              body: {
                seconds: 'Y',
              },
            },
          });
        });

        test('should return a response of OK', async () => {
          const response = await instance.get(midnightTime);
          expect(response.status).toBe(OK);
        });

        test('should light the second light yellow at midnight', async () => {
          const response = await instance.get(midnightTime);
          expect(response.data.seconds).toBe('Y');
        });
      });

      describe('Odd Seconds', () => {
        const timeWithOddSeconds = `${TIME_ENDPOINT}/12:17:57`;

        beforeEach(() => {
          return provider.addInteraction({
            state: '12:17:57',
            uponReceiving: 'a request for the time',
            withRequest: {
              method: 'GET',
              path: timeWithOddSeconds,
            },
            willRespondWith: {
              status: OK,
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              body: {
                seconds: 'O',
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
          expect(response.data.seconds).toBe('O');
        });
      });
    });
  },
);
