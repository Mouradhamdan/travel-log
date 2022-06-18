/// <reference types="Cypress" />

describe("As a user visiting the sign in page", () => {
  const visitRegistrationPage = () => {
    cy.visit("/signup");
  };

  before(() => {
    cy.task("db:truncate", "User");
  });

  it("If I provide a valid email, password, and password confirmation, I will be signed in", () => {
    visitRegistrationPage();

    cy.findByLabelText("Email").type("user@example.com");

    cy.findByLabelText("Password").type("password");
    cy.findByLabelText("Confirm Password").type("password");

    cy.findByRole("button").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);

    cy.contains("Sign Out");
  });

  it("If I provide an invalid email and password, I will remain on the same page", () => {
    visitRegistrationPage();

    cy.findByLabelText("Email").type("just@a.joke");
    cy.findByLabelText("Password").type("password");
    cy.findByRole("button").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/signup`);
  });

  it("If passwords don't match, I will remain on the same page", () => {
    visitRegistrationPage();

    cy.findByLabelText("Email").type("user@example.com");

    cy.findByLabelText("Password").type("password");
    cy.findByLabelText("Confirm Password").type("passwordNotAMatch");

    cy.findByRole("button").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/signup`);
  });

  it("I will see an error message when no email is provided", () => {
    visitRegistrationPage();

    cy.findByLabelText("Password").type("migratedata");
    cy.findByRole("button").click();
    cy.contains("is required");
  });
});
