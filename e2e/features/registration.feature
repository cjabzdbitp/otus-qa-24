Feature: User Registration

  Scenario: Successful registration with valid data
    Given I am on the login page
    When I fill the username "standard_user"
    And I fill the password "secret_sauce"
    And I submit the login form
    Then I see "Products" on the page

  Scenario: Should show error for locked user
    Given I am on the login page
    When I fill the username "locked_out_user"
    And I fill the password "secret_sauce"
    And I submit the login form
    Then I see "Epic sadface: Sorry, this user has been locked out." on the error message

  Scenario: Should show error for invalid username
    Given I am on the login page
    When I fill the username "locked_out_user1"
    And I fill the password "secret_sauce"
    And I submit the login form
    Then I see "Epic sadface: Username and password do not match any user in this service" on the error message

  Scenario: Should show error for invalid password
    Given I am on the login page
    When I fill the username "locked_out_user"
    And I fill the password "secret_sauce1"
    And I submit the login form
    Then I see "Epic sadface: Username and password do not match any user in this service" on the error message

  Scenario: Should show error for missing required fields
    Given I am on the login page
    When I submit the login form
    Then I see "Epic sadface: Username is required" on the error message