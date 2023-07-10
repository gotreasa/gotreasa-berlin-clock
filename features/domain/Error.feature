Feature: The API errors

    Scenario Outline: Errors for the API (<time>)
        Given the API endpoint /time

        When I request the time for <time>
        Then the response is 400
        And the response contains an error message

        Examples:
            | time     |
            | 00:00:60 |
