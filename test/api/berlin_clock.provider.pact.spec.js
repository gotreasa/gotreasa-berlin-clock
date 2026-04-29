import path from 'path';
import { versionFromGitTag } from 'absolute-version';
import { Verifier } from '@pact-foundation/pact';
import { simpleGit } from 'simple-git';
import server from '../../app';

let baseUrl;
if (process.env.SMOKE_TEST) {
  baseUrl = process.env.APP_HOST;
} else {
  baseUrl = `http://localhost:${process.env.SERVER_PORT || 9080}`;
}

let branchName = 'main';

beforeAll(async () => {
  branchName = await simpleGit().branchLocal(['--show-current']);
});

const providerOptions = {
  logLevel: 'INFO',
  providerBaseUrl: baseUrl,
  provider: 'berlin_clock_app',
  providerVersionBranch: branchName,
  providerVersion: versionFromGitTag({
    tagGlob: '[0-9]*',
  }),
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
    '': () => {
      return '';
    },
    'health check': () => {
      return '';
    },
  },
};

if (process.env.CI || process.env.PACT_PUBLISH_RESULTS) {
  Object.assign(providerOptions, {
    pactBrokerUrl: 'https://gotreasa.pactflow.io/',
    /**
     * @TODO: update the code based on the error:
     * pactBrokerUrl requires one of the following properties: pactUrls,consumerVersionSelectors,consumerVersionTags
     */
    pactUrls: [
      path.resolve(
        __dirname,
        '../../pact/pacts/berlin_clock_client-berlin_clock_app.json',
      ),
    ],
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
    const output = JSON.parse(
      await new Verifier(providerOptions).verifyProvider(),
    );
    expect(output.interactionResults.length).toBeGreaterThan(0);
    for (const interaction of output.interactionResults) {
      console.log(`Test: ${interaction.description}`);
      expect(interaction.result).toEqual('OK');
    }
    expect(output.result).toBe(true);
    expect(output.notices.length).toBeLessThan(2);
    expect(output.pendingErrors).toHaveLength(0);
    expect(output.errors).toHaveLength(0);
  });
});
