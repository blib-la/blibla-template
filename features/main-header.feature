Feature: Main Header
  As a user
  I want to see the main header of the application
  So that I can easily identify the application

  Background:
    Given the "cookie-banner" is "hidden"

  Scenario: Display main header
    When I visit "/"
    Then I should see the "main-header"

  Scenario: App logo navigates to home
    When I visit "/legal/imprint"
    Then the "main-header" should display the "app-logo"
    When I click on the "app-logo"
    Then I should be on the "/" page
