describe("User can create food article", () => {
  it("should visit the create food page", () => {
    cy.visit("/dashboard/create-food");
  });
  it("should fill up the form and submit", () => {
    cy.get(`input[name="title"]`).type("Tinola");
    cy.get(`textarea[name="description"]`).type("Filipino Food");
    cy.get(`label[for="mantine-R3lam"]`).then(() => {
      cy.fixture("tinola.jpg").then((image) => {
        cy.get(`label[for="mantine-R3lam"]`).selectFile({
          contents: Cypress.Buffer.from(image),
          fileName: "tinola.jpg",
          mimeType: "image/jpeg",
        });
      });
    });
    cy.get(`input[name="rate"]`).type("3");
    cy.get("form").submit();
  });
});
