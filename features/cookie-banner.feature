Feature: Cookie Banner (GDPR)
  As a user,
  I want to be informed about cookies being used by the website,
  So that I can provide my consent according to GDPR regulations.

  Scenario: Displaying the cookie banner
    When I visit "/"
    Then I should see the "cookie-banner"

  Scenario: Accepting all cookies from the banner
    Given I am on the "/" page
    And the "cookie-banner" is "visible"
    When I click on "Accept all" in "cookie-banner"
    Then the "cookie-banner" should be "hidden"
    And "all" cookies should be "enabled"

  Scenario: Accepting necessary cookies from the banner
    Given I am on the "/" page
    And the "cookie-banner" is "visible"
    When I click on "Decline All" in "cookie-banner"
    Then the "cookie-banner" should be "hidden"
    And "necessary" cookies should be "enabled"

  Scenario: Cookie banner with more information link
    Given I am on the "/" page
    And the "cookie-banner" is "visible"
    When I click on "Privacy Policy" in "cookie-banner"
    Then I should be on the "/legal/privacy" page
