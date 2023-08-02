Feature: The API errors

    Scenario Outline: Errors for the API (<time>)
        Given the API endpoint /api/v1/time

        When I request the time for <time>
        Then the response is 400
        And the response contains an error message

        Examples:
            | time      |
            | 00:00:60  |
            | 05:00:aa  |
            | 110:00:00 |
            | 15:70:00  |
            | blah      |
