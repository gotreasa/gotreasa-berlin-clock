# Backlog

## User Story 1 ✅

AS an API consumer
I NEED the "time"
SO THAT I can use the Berlin clock string to make the Clock Picture on the HomePage

### UAT 1.1 ✅

Given the API endpoint /time
When I request the time for 00:00:00 >> EVEN
Then the seconds lightbulb is ON
And the seconds is Y

### UAT 1.2 ✅

Given the API endpoint /time
When I request the time for 00:00:01 >> ODD
Then the seconds lightbulb is OFF
And the seconds is O

### UAT 1.3 🚧

Given the API endpoint /time
When I request the time for {time} >> EVEN
Then the firstRow is {firstRow}

Examples
time | firstRow
00:00:00 | OOOO
05:00:00 | ROOO
10:00:00 | RROO
15:00:00 | RRRO
20:00:00 | RRRR
04:00:00 | OOOO
06:00:00 | ROOO

### UAT 1.4 ⚠

Given the API endpoint /time
When I request the time for {time} >> EVEN
Then the secondRow is {secondRow}

Examples
time | secondRow
00:00:00 | OOOO
01:00:00 | ROOO
02:00:00 | RROO
08:00:00 | RROO
14:00:00 | RRRR
19:00:00 | RRRR
21:00:00 | ROOO
