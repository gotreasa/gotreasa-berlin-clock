Feature: Count the hours on the berlin clock

    Scenario Outline: Showing the multiple of 5 hours on the first row of the clock (<time>)
        Given the API endpoint /time
        When I request the time for <time>
        Then the firstRow is <firstRow>

        Examples:
            | time     | firstRow |
            | 00:00:00 | OOOO     |
            | 05:00:00 | ROOO     |
            | 10:00:00 | RROO     |
            | 15:00:00 | RRRO     |
            | 20:00:00 | RRRR     |
            | 04:00:00 | OOOO     |
            | 06:00:00 | ROOO     |

    Scenario Outline: Showing the single hours on the second row of the clock (<time>)

        Given the API endpoint /time
        When I request the time for <time>
        Then the secondRow is <secondRow>

        Examples:
            | time     | secondRow |
            | 00:00:00 | OOOO      |
            | 01:00:00 | ROOO      |
            | 02:00:00 | RROO      |
            | 08:00:00 | RRRO      |
            | 14:00:00 | RRRR      |
            | 19:00:00 | RRRR      |
            | 21:00:00 | ROOO      |