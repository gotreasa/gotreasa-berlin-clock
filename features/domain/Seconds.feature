Feature: Count the seconds on the berlin clock

    Scenario Outline: Turn off the Yellow light for even seconds <time>
        Given the API endpoint /time

        When I request the time for <time>
        Then the seconds lightbulb is OFF
        And the seconds is O
        And the status is OK

        Examples:
            | time     |
            | 00:00:00 |
            | 00:00:02 |
            | 00:00:10 |
            | 00:00:58 |

    Scenario Outline: Turn on the Yellow light for odd seconds <time>
        Given the API endpoint /time

        When I request the time for <time>
        Then the seconds lightbulb is ON
        And the seconds is Y
        And the status is OK

        Examples:
            | time     |
            | 00:00:01 |
            | 00:00:03 |
            | 00:00:11 |
            | 00:00:59 |

    Scenario: Invalid time input
        Given the API endpoint /time

        When I request the time for 1a:23:23
        Then the status is BAD_REQUEST
        And the message is Your input should be in the format of HH:MM:ss
