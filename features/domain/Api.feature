Feature: API endpoints

    Scenario: Health endpoint
        Given the API endpoint /health
        And the goss command exists

        When I call the endpoint
        Then the response is 200

    Scenario: Goss is missing for the API /health
        Given the API endpoint /health
        And the goss command is missing

        When I call the endpoint
        Then the response is 200

    Scenario: Documentation endpoint
        Given the API endpoint /api-docs/

        When I call the endpoint
        Then the response is 200
