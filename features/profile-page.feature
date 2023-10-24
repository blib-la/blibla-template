Feature: User Profile Page
  As a user,
  I want to view and interact with my profile page,
  So that I can manage my name, bio, and language.

  Background:
    Given the "cookie-banner" is "hidden"
    And I am on the "/" page
    And I log in

  Scenario: Navigating to the profile page
    When I click on the "profile-link"
    Then I should be on the "/profile" page
    And I should see the "profile-view"

  Scenario: Editing the profile
    Given I am on the "/profile" page
    When I click on the "bio-card-edit-button"
    Then I should see the "profile-form"

  Scenario Outline: Filling in the profile form
    Given I am on the "/profile" page
    When I click on the "bio-card-edit-button"
    Then I should see the "profile-form"
    When I fill in "<form-field>" with "<value>"
    And I click on the "bio-card-save-button"
    Then the "<field>" should display "<value>"

    Examples:
      | form-field                | field             | value    |
      | profile-form-name-input   | profile-view-name | New Name |
      | profile-form-bio-textarea | profile-view-bio  | New Bio  |

  Scenario: Canceling profile edit
    Given I am on the "/profile" page
    When I click on the "bio-card-edit-button"
    Then I should see the "profile-form"
    When I click on the "bio-card-cancel-button"
    Then I should see the "profile-view"
