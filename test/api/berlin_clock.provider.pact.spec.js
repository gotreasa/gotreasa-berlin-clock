const path = require('path');
const { versionFromGitTag } = require('@pact-foundation/absolute-version');
const { Verifier } = require('@pact-foundation/pact');
const server = require('../../app');

let baseUrl;
if (process.env.SMOKE_TEST) {
  baseUrl = process.env.APP_HOST;
} else {
  baseUrl = `http://localhost:${process.env.SERVER_PORT || 9080}`;
}

const providerOptions = {
  logLevel: 'INFO',
  providerBaseUrl: baseUrl,
  provider: 'berlin_clock_app',
  providerVersion: versionFromGitTag(),
  matchingRules: {
    body: {},
  },
  stateHandlers: {
    Midnight: () => {
      return '00:00:00';
    },
    '12:17:57': () => {
      return '12:17:57';
    },
  },
};

if (process.env.CI || process.env.PACT_PUBLISH_RESULTS) {
  Object.assign(providerOptions, {
    pactBrokerUrl: 'https://gotreasa.pactflow.io/',
    publishVerificationResult: true,
  });
} else {
  Object.assign(providerOptions, {
    pactUrls: [
      path.resolve(
        __dirname,
        '../../pact/pacts/berlin_clock_client-berlin_clock_app.json',
      ),
    ],
  });
}

describe('Berlin Clock Provider', () => {
  afterAll(async () => {
    await server.close();
  });

  test('tests berlin clock api routes', async () => {
    const output = await new Verifier(providerOptions).verifyProvider();
    console.log(output);
    expect(output).toContain('0 failures');
  });
});
