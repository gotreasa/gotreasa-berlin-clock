/* eslint-disable import/no-extraneous-dependencies */
const { Given, When, Then, And, Fusion } = require('jest-cucumber-fusion');

const request = require('supertest');

const app = require('../../src/api/app');

let endpoint;

let response;
const LIGHT_OFF = 'O';

Given('the API endpoint /time', () => {
  endpoint = '/time';
});

When(/^I request the time for (.*)$/, async (time) => {
  const mockDateObject = new Date(`2021-02-26T${time}.652Z`);
  global.Date = jest.fn().mockReturnValue(mockDateObject);
  response = await request(app)
    .get(endpoint)
    .set({
      Accept: 'application/json',
    })
    .send();
});

Then('the seconds lightbulb is ON', () => {
  expect(response.seconds).not.toBe(LIGHT_OFF);
});

And('the seconds is Y', () => {
  expect(response.seconds).toBe('Y');
});

Fusion('Seconds.feature');
