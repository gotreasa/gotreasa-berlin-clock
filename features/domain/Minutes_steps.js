import { Given, When, Then, Fusion } from 'jest-cucumber-fusion';
import request from 'supertest';
import app from '../../src/api/app';

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
