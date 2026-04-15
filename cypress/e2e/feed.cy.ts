describe("Nexus Feed Functionality", () => {
  beforeEach(() => {
    // Login before each test
    cy.clearLocalStorage();
    cy.visit("/login");
    cy.get("#email").type("dev@nexus.io");
    cy.get("#password").type("password123");
    cy.get('button[type="submit"]').click();
  });

  it("should load posts successfully", () => {
    cy.get("main").should("exist");
    // Ensure there are post cards
    cy.get('a[href*="/posts/"]').should("have.length.at.least", 1);
  });

  it("should filter posts using the search bar", () => {
    // Type something that exists (JSONPlaceholder has 'sunt aut facere...')
    cy.get("#search").type("sunt");

    // Wait for debounce (500ms)
    cy.wait(600);

    // Check that results are filtered
    cy.get("h3").should("contain.text", "sunt");
  });

  it("should navigate to post details and show comments", () => {
    // Click the first post
    cy.get('a[href*="/posts/"]').first().click();

    // Check URL
    cy.url().should("match", /\/posts\/\d+$/);

    // Check for post content
    cy.get("article").should("be.visible");
    cy.get("h1").should("exist");

    // Check for comments section
    cy.contains("Discussion").should("be.visible");
    cy.get(".pl-14").should("have.length.at.least", 1); // Looking for comment cards
  });

  it("should support pagination", () => {
    // Check for current page
    cy.contains("Page 1").should("be.visible");

    // Click Next
    cy.contains("Next").click();

    // URL doesn't have page params usually in our SPA unless we added them,
    // but the text should update
    cy.contains("Page 2").should("be.visible");
    cy.get('a[href*="/posts/"]').should("have.length.at.least", 1);
  });

  it("should clear cache and refetch", () => {
    // This tests the manual invalidation button
    cy.get('button[title*="Refresh"]').click();
    cy.contains("Cache cleared").should("be.visible");
  });
});
