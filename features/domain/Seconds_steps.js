import { Given, When, Then, And, Fusion } from 'jest-cucumber-fusion';

import request from 'supertest';

import app from '../../src/api/app';

const endpoint = '/api/v1/time';
let time;
let response;
const YELLOW_LIGHT = 'Y';
const LIGHT_OFF = 'O';

Given(/^a time of (.*)$/, (inputTime) => {
  time = inputTime;
});

When('I get the berlin clock time', async () => {
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

And("the message is 'Your input should be in the format of HH:MM:ss'", () => {
  expect(response.body.message).toBe(
    'Your input should be in the format of HH:MM:ss',
  );
});

Fusion('Seconds.feature');
