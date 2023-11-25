Feature: User Login
  As a user,
  I want to be able to login to my account,
  So that I can access personalized content and perform specific actions.

  Background:
    Given the "cookie-banner" is "hidden"

  Scenario: Displaying the login form
    When I am on the "/auth/sign-in" page
    Then I should see the "auth-sign-in"

  Scenario: Login
    Given I log in
    When I visit "/profile"
    Then I should be on the "/profile" page
