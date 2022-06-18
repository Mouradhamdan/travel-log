/// <reference types="Cypress" />

describe("As a user visiting the sign in page", () => {
  const visitSignInPage = () => {
    cy.visit("/login");
  };

  before(() => {
    cy.task("db:truncate", "User");
    cy.task("db:insert", {
      modelName: "User",
      json: { email: "user@example.com", password: "password" },
    });
  });

  it("If I provide a valid email and password, I will be signed in", () => {
    visitSignInPage();
    cy.findByLabelText("Email").type("user@example.com");

    cy.findByLabelText("Password").type("password");

    cy.findByRole("button").click();

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    cy.contains("Sign Out");
  });

  it("If I provide an invalid email and password, I will remain on the same page", () => {
    visitSignInPage();
    cy.findByLabelText("Email").type("just@a.joke");
    cy.findByLabelText("Password").type("password");
    cy.findByRole("button").click();

    cy.url().should("eq", `${Cypress.config().baseUrl}/login`);
  });

  it("I will see an error message when no email is provided", () => {
    visitSignInPage();
    cy.findByLabelText("Password").type("password");
    cy.findByRole("button").click();

    cy.url().should("eq", `${Cypress.config().baseUrl}/login`);
  });
});
