/* eslint-disable import/no-extraneous-dependencies */
const { Given, When, Then, And, Fusion } = require('jest-cucumber-fusion');
const request = require('supertest');
const app = require('../../src/api/app');

let endpoint;
let response;

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

Then('the response is 400', () => {
  expect(response.error.status).toBe(400);
});

And('the response contains an error message', () => {
  expect(JSON.parse(response.error.text).message).toBe(
    'Your input should be in the format of HH:MM:ss',
  );
});

Fusion('Error.feature');
