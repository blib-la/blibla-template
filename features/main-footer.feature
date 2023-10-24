Feature: Main Footer
  As a user,
  I want to access important information and links in the footer,
  So that I can find additional resources or navigate to specific pages.

  Background:
    Given the "cookie-banner" is "hidden"

  Scenario: Displaying the main footer
    When I am on the "/" page
    Then I should see the "main-footer"

  Scenario: Navigating to a different page
    When I am on the "/" page
    And I click on "imprint" in "main-footer"
    Then I should be on the "/legal/imprint" page

  Scenario: Accessing additional resources
    When I am on the "/" page
    Then the "main-footer" should display the "contact-section"
    And the "main-footer" should display the "company-section"

