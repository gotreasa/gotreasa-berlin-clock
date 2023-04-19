/* eslint-disable import/no-extraneous-dependencies */
const {
  Given,
  When,
  Then,
  And,
  Fusion,
  After,
} = require('jest-cucumber-fusion');

const MockDate = require('mockdate');
const request = require('supertest');

const app = require('../../app');

let endpoint;

let response;
const LIGHT_OFF = 'O';

After(() => {
  MockDate.reset();
});

Given('the API endpoint /time', () => {
  endpoint = '/api/v1/time';
});

When(/^I request the time for (.*)$/, async (time) => {
  MockDate.set(`2021-02-26T${time}.652Z`);
  response = await request(app)
    .get(endpoint)
    .set({
      Accept: 'application/json',
    })
    .send();
});

Then('the seconds lightbulb is ON', () => {
  expect(response.body.seconds).not.toBe(LIGHT_OFF);
});

And('the seconds is Y', () => {
  expect(response.body.seconds).toBe('Y');
});

Then('the seconds lightbulb is OFF', () => {
  expect(response.body.seconds).toBe(LIGHT_OFF);
});

And('the seconds is O', () => {
  expect(response.body.seconds).toBe(LIGHT_OFF);
});

Fusion('Seconds.feature');
