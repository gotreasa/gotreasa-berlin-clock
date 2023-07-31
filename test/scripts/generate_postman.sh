#!/bin/bash
mkdir -p pact/postman
mkdir -p pact/postman/collections
npx pmpact pact/pacts/berlin_clock_client-berlin_clock_app.json -o pact/postman/collections/postman_collection.json
