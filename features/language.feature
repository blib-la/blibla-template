Feature: Multi-language support

  As a global user
  I want to view the website in my preferred language
  So that I can understand the content better

  Background:
    Given the "cookie-banner" is "hidden"
    And I am on the "/" page

  Scenario Outline: Changing the website language
    When I switch to language "<Language>"
    Then the website language should be "<Locale>"

    Examples:
      | Language | Locale |
      | English  | en     |
      | Deutsch  | de     |
