# Backlog

## User Story 1 🚧

AS an API consumer
I NEED the "time"
SO THAT I can use the Berlin clock string to make the Clock Picture on the HomePage

### UAT 1.1 🚧

Given the API endpoint /time
When I request the time for 00:00:00 >> EVEN
Then the seconds lightbulb is ON
And the seconds is Y

### UAT 1.2 ⚠

Given the API endpoint /time
When I request the time for 00:00:01 >> ODD
Then the seconds lightbulb is OFF
And the seconds is O
