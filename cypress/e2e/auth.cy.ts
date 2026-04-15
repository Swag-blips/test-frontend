describe("Authentication Flow", () => {
  beforeEach(() => {
    // Clear localStorage to ensure we start unauthenticated
    cy.clearLocalStorage();
    cy.visit("/");
  });

  it("should redirect unauthenticated users to login", () => {
    cy.url().should("include", "/login");

    cy.get("h1").should("contain", "Welcome Back");
  });

  it("should allow users to login", () => {
    cy.get("#email").type("dev@nexus.io");
    cy.get("#password").type("password123");
    cy.get('button[type="submit"]').click();

    // After login, should be on the home page (Nexus feed)
    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.get("h1").should("contain", "Nexus");

    // Check for success toast
    cy.contains("Welcome back!").should("be.visible");
  });

  it("should allow users to toggle themes", () => {
    // Need to login first
    cy.get("#email").type("dev@nexus.io");
    cy.get("#password").type("password123");
    cy.get('button[type="submit"]').click();

    // Check for initial dark theme (default)
    cy.get("html", { timeout: 10000 }).should("have.class", "dark");

    // Click theme toggle
    cy.get('button[title*="Light Mode"]').click();
    cy.get("html").should("have.class", "light").and("not.have.class", "dark");

    // Click again to return to dark
    cy.get('button[title*="Dark Mode"]').click();
    cy.get("html").should("have.class", "dark").and("not.have.class", "light");
  });

  it("should allow users to logout", () => {
    // Login
    cy.get("#email").type("dev@nexus.io");
    cy.get("#password").type("password123");
    cy.get('button[type="submit"]').click();

    // Click logout
    cy.get('button[title="Logout"]').click();

    // Should be redirected back to login
    cy.url().should("include", "/login");
    cy.contains("Logged out successfully").should("be.visible");
  });
});
