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

Then(/^the first row is (.*)$/, (firstRow) => {
  expect(response.body.firstRow).toBe(firstRow);
});

Then(/^the second row is (.*)$/, (secondRow) => {
  expect(response.body.secondRow).toBe(secondRow);
});

Fusion('Hours.feature');
