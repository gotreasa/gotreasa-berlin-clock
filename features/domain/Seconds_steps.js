/* eslint-disable import/no-extraneous-dependencies */
const { Given, When, Then, And, Fusion } = require('jest-cucumber-fusion');

const request = require('supertest');

const app = require('../../src/api/app');

let endpoint;

let response;
const LIGHT_OFF = 'O';

Given('the API endpoint /time', () => {
  endpoint = '/api/v1/time';
});

When(/^I request the time for (.*)$/, async (time) => {
  response = await request(app)
    .get(`${endpoint}/${time}`)
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
