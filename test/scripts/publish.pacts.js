const pact = require('@pact-foundation/pact-node');
// eslint-disable-next-line import/no-extraneous-dependencies
const { versionFromGitTag } = require('absolute-version');
// eslint-disable-next-line import/no-extraneous-dependencies
const branchName = require('current-git-branch');
const path = require('path');

const options = {
  pactFilesOrDirs: [path.resolve(__dirname, '../../pact/pacts')],
  pactBroker: 'https://gotreasa.pactflow.io/',
  pactBrokerToken: process.env.PACT_BROKER_TOKEN,
  consumerVersion: versionFromGitTag(),
  branch: branchName(),
};

pact
  .publishPacts(options)
  .then(() => {
    console.log('Pact contract publishing complete!');
  })
  .catch((error) => {
    console.log('Pact contract publishing failed: ', error);
  });
