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

### UAT 1.3 ✅

Given the API endpoint /time
When I request the time for {time}
Then the first row is {firstRow}

Examples
time | firstRow
00:00:00 | OOOO
05:00:00 | ROOO
10:00:00 | RROO
15:00:00 | RRRO
20:00:00 | RRRR
04:00:00 | OOOO
06:00:00 | ROOO

### UAT 1.4 ✅

Given the API endpoint /time
When I request the time for {time}
Then the second row is {secondRow}

Examples
time | secondRow
00:00:00 | OOOO
01:00:00 | ROOO
02:00:00 | RROO
08:00:00 | RRRO
14:00:00 | RRRR
19:00:00 | RRRR
21:00:00 | ROOO

### UAT 1.5 ✅

Given the API endpoint /time
When I request the time for {time}
Then the fourth row is {fourthRow}

Examples
time | fourthRow
00:00:00 | OOOO
00:01:00 | YOOO
00:02:00 | YYOO
00:08:00 | YYYO
00:14:00 | YYYY
00:19:00 | YYYY
00:21:00 | YOOO

### UAT 1.6 ✅

Given the API endpoint /time
When I request the time for {time}
Then the third row is {thirdRow}

Examples
time | thirdRow
00:00:00 | OOOOOOOOOOO
00:05:00 | YOOOOOOOOOO
00:10:00 | YYOOOOOOOOO
00:15:00 | YYROOOOOOOO
00:20:00 | YYRYOOOOOOO
00:25:00 | YYRYYOOOOOO
00:30:00 | YYRYYROOOOO
00:35:00 | YYRYYRYOOOO
00:40:00 | YYRYYRYYOOO
00:45:00 | YYRYYRYYROO
00:50:00 | YYRYYRYYRYO
00:55:00 | YYRYYRYYRYY

## User Story 2 🚧

AS A CLI user
I WANT TO get specified berlin clock time
SO THAT I can see it printed on screen

### UAT 2.1 🚧

Given the time 00:00:01
When I get the time from the CLI
Then all of the lights are off

### UAT 2.2 ⚠

Given the time 00:00:00
When I get the time from the CLI
Then the second light is yellow

### UAT 2.3 ⚠

Given the time <time>
When I get the time from the CLI
Then the first row lights show as <firstRow>

Examples
| time | firstRow |
| 00:00:00 | ⚫️⚫️⚫️⚫️ |
| 05:00:00 | 🔴⚫️⚫️⚫️ |
| 10:00:00 | 🔴🔴⚫️⚫️ |
| 15:00:00 | 🔴🔴🔴⚫️ |
| 20:00:00 | 🔴🔴🔴🔴 |
| 04:00:00 | ⚫️⚫️⚫️⚫️ |
| 06:00:00 | 🔴⚫️⚫️⚫️ |

### UAT 2.4 ⚠

Given the time <time>
When I get the time from the CLI
Then the second row lights show as <secondRow>

Examples
| time | secondRow |
| 00:00:00 | ⚫️⚫️⚫️⚫️ |
| 01:00:00 | 🔴⚫️⚫️⚫️ |
| 02:00:00 | 🔴🔴⚫️⚫️ |
| 08:00:00 | 🔴🔴🔴⚫️ |
| 14:00:00 | 🔴🔴🔴🔴 |
| 19:00:00 | 🔴🔴🔴🔴 |
| 21:00:00 | 🔴⚫️⚫️⚫️ |

### UAT 2.5 ⚠

Given the time <time>
When I get the time from the CLI
Then the fourth row lights show as <fourthRow>

Examples
| time | fourthRow |
| 00:00:00 | ⚫️⚫️⚫️⚫️ |
| 00:01:00 | 🟡⚫️⚫️⚫️ |
| 00:02:00 | 🟡🟡⚫️⚫️ |
| 00:08:00 | 🟡🟡🟡⚫️ |
| 00:14:00 | 🟡🟡🟡🟡 |
| 00:19:00 | 🟡🟡🟡🟡 |
| 00:21:00 | 🟡⚫️⚫️⚫️ |

### UAT 2.6 ⚠

Given the time <time>
When I get the time from the CLI
Then the third row lights show as <thirdRow>

Examples
| time | thirdR⚫️w |
| 00:00:00 | ⚫️⚫️⚫️⚫️⚫️⚫️⚫️⚫️⚫️⚫️⚫️ |
| 00:05:00 | 🟡⚫️⚫️⚫️⚫️⚫️⚫️⚫️⚫️⚫️⚫️ |
| 00:10:00 | 🟡🟡⚫️⚫️⚫️⚫️⚫️⚫️⚫️⚫️⚫️ |
| 00:15:00 | 🟡🟡🔴⚫️⚫️⚫️⚫️⚫️⚫️⚫️⚫️ |
| 00:20:00 | 🟡🟡🔴🟡⚫️⚫️⚫️⚫️⚫️⚫️⚫️ |
| 00:25:00 | 🟡🟡🔴🟡🟡⚫️⚫️⚫️⚫️⚫️⚫️ |
| 00:30:00 | 🟡🟡🔴🟡🟡🔴⚫️⚫️⚫️⚫️⚫️ |
| 00:35:00 | 🟡🟡🔴🟡🟡🔴🟡⚫️⚫️⚫️⚫️ |
| 00:40:00 | 🟡🟡🔴🟡🟡🔴🟡🟡⚫️⚫️⚫️ |
| 00:45:00 | 🟡🟡🔴🟡🟡🔴🟡🟡🔴⚫️⚫️ |
| 00:50:00 | 🟡🟡🔴🟡🟡🔴🟡🟡🔴🟡⚫️ |
| 00:55:00 | 🟡🟡🔴🟡🟡🔴🟡🟡🔴🟡🟡 |
