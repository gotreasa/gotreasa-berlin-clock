Feature: Count the minutes on the berlin clock

    Scenario Outline: Showing the five miutes on the third row of the clock (<time>)

        Given the API endpoint /time
        When I request the time for <time>
        Then the third row is <thirdRow>

        Examples:
            | time     | thirdRow    |
            | 00:00:00 | OOOOOOOOOOO |
            | 00:05:00 | YOOOOOOOOOO |
            | 00:10:00 | YYOOOOOOOOO |
            | 00:15:00 | YYROOOOOOOO |
            | 00:20:00 | YYRYOOOOOOO |
            | 00:25:00 | YYRYYOOOOOO |
            | 00:30:00 | YYRYYROOOOO |
            | 00:35:00 | YYRYYRYOOOO |
            | 00:40:00 | YYRYYRYYOOO |
            | 00:45:00 | YYRYYRYYROO |
            | 00:50:00 | YYRYYRYYRYO |
            | 00:55:00 | YYRYYRYYRYY |

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