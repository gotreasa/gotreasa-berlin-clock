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

      beforeEach(() => {
        return provider.addInteraction({
          state: 'Midnight',
          uponReceiving: 'a request for the time',
          withRequest: {
            method: 'GET',
            path: TIME_ENDPOINT,
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
        const response = await instance.get(TIME_ENDPOINT);
        expect(response.status).toBe(OK);
      });

      test('should light the second light yellow at midnight', async () => {
        const response = await instance.get(TIME_ENDPOINT);
        expect(response.data.seconds).toBe('Y');
      });
    });
  },
);
