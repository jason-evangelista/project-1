Cypress.Commands.add("dataCy", (value) => {
  return cy.log(value);
});

Cypress.Commands.add("loginWithEmail", (user) => {
  cy.task("getUserSession", {
    user,
  }).then((sessionData) => {
    localStorage.setItem(
      "sb-localhost-auth-token",
      JSON.stringify(sessionData)
    );
  });
});

afterEach(() => {
  // eslint-disable-next-line prefer-const
  let str = [];
  cy.getCookies().then((cook) => {
    for (let l = 0; l < cook.length; l++) {
      if (cook.length > 0 && l == 0) {
        str[l] = cook[l].name;
        Cypress.Cookies.preserveOnce(str[l]);
      } else if (cook.length > 1 && l > 1) {
        str[l] = cook[l].name;
        Cypress.Cookies.preserveOnce(str[l]);
      }
    }
  });
});
