import { jest } from '@jest/globals';
import {
  Given,
  When,
  Then,
  And,
  Fusion,
} from '@g_package/jest-cucumber-fusion';
import request from 'supertest';

// In Jest's ES module mode a mock cannot be hoisted above the imports, so it is registered first
// and the modules that use it are imported afterwards.
jest.unstable_mockModule('child_process', () => {
  const exec = jest.fn();

  return { exec, default: { exec } };
});
const { default: child_process } = await import('child_process');
const { default: app } = await import('../../src/api/app.js');

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

And('the health check is run', () => {
  expect(child_process.exec).toHaveBeenCalledTimes(1);
});

Fusion('Api.feature');
