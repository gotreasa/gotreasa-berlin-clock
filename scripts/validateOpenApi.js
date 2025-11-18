import { Comparator } from '@pactflow/openapi-pact-comparator';

import pact from '../pact/pacts/berlin_clock_client-berlin_clock_app.json' with { type: 'json' };
import openapi from '../openapi.json' with { type: 'json' };

// openapi is object from JSON.parse() or yaml.load()
const comparator = new Comparator(openapi);
let results = [];

// pacts is array of objects the same way
for await (const result of comparator.compare(pact)) {
  results.push(result);
  console.log(result);
}

if (results.length > 0) {
  process.exit(1);
}
