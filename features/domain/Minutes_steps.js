/* eslint-disable import/no-extraneous-dependencies */
const { Given, When, Then, Fusion } = require('jest-cucumber-fusion');
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

Then(/^the third row is (.*)$/, (thirdRow) => {
  expect(response.body.thirdRow).toBe(thirdRow);
});

Then(/^the fourth row is (.*)$/, (fourthRow) => {
  expect(response.body.fourthRow).toBe(fourthRow);
});

Fusion('Minutes.feature');
