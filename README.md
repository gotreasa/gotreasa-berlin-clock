# Berlin Clock by Gearoid

[![GitHub release](https://img.shields.io/github/release/gotreasa/gotreasa-berlin-clock.svg)](https://github.com/gotreasa/gotreasa-berlin-clock/releases/latest)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/gotreasa/gotreasa-berlin-clock/blob/main/LICENSE)
[![Sonarcloud Status](https://sonarcloud.io/api/project_badges/measure?project=xpfarm_gotreasa-berlin-clock&metric=alert_status)](https://sonarcloud.io/dashboard?id=xpfarm_gotreasa-berlin-clock)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=xpfarm_gotreasa-berlin-clock&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=xpfarm_gotreasa-berlin-clock)
[![Known Vulnerabilities](https://snyk.io/test/github/gotreasa/gotreasa-berlin-clock/badge.svg)](https://snyk.io/test/github/gotreasa/gotreasa-berlin-clock)
[![Build Status](https://github.com/gotreasa/gotreasa-berlin-clock/actions/workflows/pipeline.yml/badge.svg)](https://github.com/gotreasa/gotreasa-berlin-clock/actions/workflows/pipeline.yml)
[![OpenAPI Validation](https://validator.swagger.io/validator?url=https://raw.githubusercontent.com/gotreasa/gotreasa-berlin-clock/main/openapi.json)](https://editor.swagger.io/?url=https://raw.githubusercontent.com/gotreasa/gotreasa-berlin-clock/main/openapi.json)
[![Can I Deploy BRANCH to ENVIRONMENT](https://gotreasa.pactflow.io/pacticipants/berlin_clock_app/branches/main/latest-version/can-i-deploy/to-environment/production/badge)](https://gotreasa.pactflow.io/hal-browser/browser.html#https://gotreasa.pactflow.io/pacticipants/berlin_clock_app/branches/main/latest-version/can-i-deploy/to-environment/production/badge)

API: [https://gotreasa-berlin-clock-gotreasa.cloud.okteto.net/api/v1/time/00:00:00]

## Description

The "Berlin Clock" is the first public clock in the world that tells the time by means of illuminated, coloured fields, for which it entered the Guinness Book of Records upon its installation on 17 June 1975.

alt text

The clock is read from the top row to the bottom. The top row of four red fields denotes five full hours each, alongside the second row, also of four red fields, which denote one full hour each, displaying the hour value in 24-hour format. The third row consists of eleven yellow-and-red fields, which denote five full minutes each (the red ones also denote 15, 30, and 45 minutes past), and the bottom row has another four yellow fields, which mark one full minute each. The round yellow light on top blinks to denote even - (when unlit) or odd-numbered (when lit) seconds.

Example: Two fields are lit in the first row (five hours multiplied by two, i.e. ten hours), but no fields are lit in the second row; therefore the hour value is 10.
Six fields are lit in the third row (five minutes multiplied by six, i.e. thirty minutes), while the bottom row has one field on (plus one minute). Hence, the lights of the clock altogether tell the time as 10:31. (Source: Wikipedia)

Task: Write a function that takes in a particular time in 24h format `('hh:mm:ss')` and outputs a string that reproduces the Berlin Clock. The parameters should be as follows:

“O” = Light off
“R” = Red light
“Y” = Yellow light

Example Test Case:
Input String:
12:56:01

Output String:
O
RROO
RROO
YYRYYRYYRYY
YOOO

Please check the example test cases for the required output format.
