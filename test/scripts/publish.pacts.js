import { spawnSync } from 'child_process';
import { createRequire } from 'module';
import { versionFromGitTag } from 'absolute-version';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import branchName from 'current-git-branch';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// The token is read by pact-broker from PACT_BROKER_TOKEN, so it never appears in the arguments.
const pactBroker =
  require.resolve('@pact-foundation/pact-cli/bin/pact-broker.js');
const args = [
  pactBroker,
  'publish',
  resolve(__dirname, '../../pact/pacts'),
  '--broker-base-url',
  'https://gotreasa.pactflow.io/',
  '--consumer-app-version',
  versionFromGitTag({
    tagGlob: '[0-9]*',
  }),
  '--branch',
  branchName(),
];

const { status, error } = spawnSync(process.execPath, args, {
  stdio: 'inherit',
});

if (error || status !== 0) {
  console.log(
    'Pact contract publishing failed:',
    error?.message ?? `exit code ${status}`,
  );
  process.exit(status || 1);
}
console.log('Pact contract publishing complete!');
