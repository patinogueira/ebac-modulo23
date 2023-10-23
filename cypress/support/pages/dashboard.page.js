export const dashboardPage = {
    get message() { return cy.get('a > .hidden-xs')},
    get logout() {return cy.get('.topbar-inner > :nth-child(1) > .list-inline > :nth-child(2)')},
    get errormessage() { return cy.get('.woocommerce-error > li')}
}