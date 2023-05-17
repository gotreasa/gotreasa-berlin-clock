/* eslint-disable import/no-extraneous-dependencies */
const { Given, When, Then, And, Fusion } = require('jest-cucumber-fusion');

const request = require('supertest');

const app = require('../../src/api/app');

let endpoint;
let response;
const YELLOW_LIGHT = 'Y';
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
  expect(response.body.seconds).toBe(YELLOW_LIGHT);
});

Then('the seconds lightbulb is OFF', () => {
  expect(response.body.seconds).toBe(LIGHT_OFF);
});

And('the seconds is O', () => {
  expect(response.body.seconds).toBe(LIGHT_OFF);
});

And('the status is OK', () => {
  expect(response.status).toBe(200);
});

Then('the status is BAD_REQUEST', () => {
  expect(response.status).toBe(400);
});

And('the message is Your input should be in the format of HH:MM:ss', () => {
  expect(response.body.message).toBe(
    'Your input should be in the format of HH:MM:ss',
  );
});

Fusion('Seconds.feature');
