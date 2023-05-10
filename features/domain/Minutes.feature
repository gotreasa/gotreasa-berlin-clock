Feature: Count the minutes on the berlin clock

    Scenario Outline: Showing the single minutes on the fourth row of the clock (<time>)

        Given the API endpoint /time
        When I request the time for <time>
        Then the fourth row is <fourthRow>

        Examples:
            | time     | fourthRow |
            | 00:00:00 | OOOO      |
            | 00:01:00 | YOOO      |
            | 00:02:00 | YYOO      |
            | 00:08:00 | YYYO      |
            | 00:14:00 | YYYY      |
            | 00:19:00 | YYYY      |
            | 00:21:00 | YOOO      |