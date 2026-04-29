import child_process from 'child_process';
import { Given, When, Then, And, Fusion } from 'jest-cucumber-fusion';
import request from 'supertest';
import app from '../../src/api/app';

jest.mock('child_process');

let endpoint;
let response;

Given(/^the API endpoint (.*)$/, (path) => {
  endpoint = path;
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

When('the endpoint is called', async () => {
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

Fusion('Api.feature');
