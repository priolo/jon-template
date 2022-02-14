// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



Cypress.Commands.add("loginDefault", (needChangePassword=false) => {
	cy.login(
		"((admin))",
		{
			"id": "111",
			"username": "admin",
			"has_to_change_password": needChangePassword,
			"role": 100
		}
	)
})

Cypress.Commands.add("login", (token, user) => {
	cy.window().then(win => {
		const { setUser, setToken } = win.getStoreAuth()
		setToken(token)
		setUser(user)
	})
})

Cypress.Commands.add("visitSite", (token, user) => {
	cy.visit('http://localhost:3000/')
})