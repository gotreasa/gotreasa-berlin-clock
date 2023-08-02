/* eslint-disable import/no-extraneous-dependencies */
const { Given, When, Then, And, Fusion } = require('jest-cucumber-fusion');
const request = require('supertest');
const child_process = require('child_process');
const app = require('../../src/api/app');

jest.mock('child_process');

let endpoint;
let response;

Given(/^the API endpoint (.*)$/, (path) => {
  endpoint = path;
});

When('I call the endpoint', async () => {
  response = await request(app)
    .get(`${endpoint}`)
    .set({
      Accept: 'application/json',
    })
    .send();
});

Then('the response is 200', () => {
  expect(response.status).toBe(200);
});

And('the goss command exists', () => {
  child_process.exec.mockImplementation((_, callback) =>
    callback(null, { stdout: 'OK' }),
  );
});

And('the goss command is missing', () => {
  child_process.exec.mockImplementation((_, callback) =>
    callback(null, { stdout: 'OK' }),
  );
});

Fusion('Api.feature');
