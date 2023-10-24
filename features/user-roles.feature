Feature: User Roles
  As a user,
  I want to access features according to my assigned role,
  So that I can perform actions within my permissions.

  Background:
    Given the "cookie-banner" is "hidden"
    And I am on the "/" page

  Scenario Outline: Access based on user roles
    When I log in as "<Role>"
    Then I should see the "<Area>"

    Examples:
      | Role  | Area    |
      | USER  | user-section  |
      | ADMIN | admin-section |
