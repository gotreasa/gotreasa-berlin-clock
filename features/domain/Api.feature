Feature: API endpoints

  Scenario: Health endpoint
    Given the API endpoint /health
    And the goss command exists

    When the endpoint is called
    Then the response is 200
    And the health check is run

  Scenario: Goss is missing for the API /health
    Given the API endpoint /health
    And the goss command is missing

    When the endpoint is called
    Then the response is 200
    And the health check is run

  Scenario: Documentation endpoint
    Given the API endpoint /api-docs/

    When the endpoint is called
    Then the response is 200
