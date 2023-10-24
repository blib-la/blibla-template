Feature: Legal Pages
  As a user,
  I want to access the legal pages,
  So that I can make informed decisions and understand my rights and obligations.

  Background:
    Given the "cookie-banner" is "hidden"

  Scenario: Displaying the legal page links
    When I am on the "/" page
    Then I should see the "legal-links"

  Scenario: Navigating to the Terms and Conditions page
    When I am on the "/" page
    When I click on the "terms-link" in "legal-links"
    Then I should be on the "/legal/terms" page

  Scenario: Navigating to the Privacy Policy page
    When I am on the "/" page
    When I click on the "privacy-link" in "legal-links"
    Then I should be on the "/legal/privacy" page


  Scenario: Navigating to the Imprint page
    When I am on the "/" page
    When I click on the "imprint-link" in "legal-links"
    Then I should be on the "/legal/imprint" page

