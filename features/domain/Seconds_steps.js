const {
  Given,
  When,
  Then,
  And,
  Fusion,
  // eslint-disable-next-line import/no-extraneous-dependencies
} = require('jest-cucumber-fusion');

Given('the API endpoint /time', () => {});

When(/^I request the time for (.*)$/, () => {});

Then('the seconds lightbulb is ON', () => {});

And('the seconds is Y', () => {});

Fusion('Seconds.feature');
