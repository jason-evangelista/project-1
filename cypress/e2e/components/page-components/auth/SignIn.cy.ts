describe("User can login in different method", () => {
  it("should login user using email and password", () => {
    cy.clearCookies();
    cy.visit("/auth/sign-in");
    cy.loginWithEmail("client");
    cy.get(`input[placeholder="Email"]`).type("papi8261@gmail.com");
    cy.get(`input[placeholder="Password"]`).type("password");
    cy.get("form").submit();
    cy.intercept("http://localhost:3000/auth/sign-in", (req) => {
      req.redirect("http://locahost:3000/dashboard");
    });
  });
  it("should redirect to dashboard", () => {
    cy.url().should("contain", "/dashboard");
    cy.contains("Food Blog");
    cy.contains("Home");
    cy.contains("Create Food");
    cy.contains("papi8261@gmail.com");
  });
});
