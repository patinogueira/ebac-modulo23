/// <reference types="cypress"/>

Cypress.Commands.add('AddProduto', (tamanho, cor, quantidade,id,varid) => {
const fd = new FormData()
    fd.append('attribute_size', tamanho)
    fd.append('attribute_color', cor)
    fd.append('quantity', quantidade)
    fd.append('add-to-cart', id)
    fd.append('product_id', id)
    fd.append('variation_id', varid)
    
    cy.request({
        url: `/product/abominable-hoodie/`,
        method: "POST",
        body: fd
    }).then((resp) => {
        resp.headers['set-cookie'].forEach(cookie => {
            const firstPart = cookie.split(';')[0]
            const separator = firstPart.indexOf('=')
            const name = firstPart.substring(0, separator)
            const value = firstPart.substring(separator + 1)
            cy.setCookie(name, value)
        })
    })
    cy.visit('/carrinho/') 
});

Cypress.Commands.add('cadastroFaturamentoCheckout', (cep, telefone) => {
    var faker = require('faker')
    cy.visit('/checkout/')
    cy.get('#billing_first_name').clear().type(faker.name.firstName())
    cy.get('#billing_last_name').clear().type(faker.name.lastName())
    cy.get('#billing_company').clear().type(faker.company.companyName())
    cy.get('#select2-billing_country-container').click().type('Brasil{enter}')
    cy.get('#billing_address_1').clear().type(faker.address.streetName())
    cy.get('#billing_city').clear().type(faker.address.cityName())
    cy.get('#select2-billing_state-container').click().type('São Paulo{enter}')
    cy.get('#billing_postcode').clear().type(cep)
    cy.get('#billing_phone').clear().type(telefone)
    cy.get('#terms').click()
    cy.get('#place_order').click()
})

Cypress.Commands.add('loginAula', (user, pass) => {
    const fd = new FormData()

    fd.append('log', user)
    fd.append('pwd', pass)
    fd.append('wp-submit', 'Acessar')
    fd.append('redirect_to', `/wp-admin`)
    fd.append('testcookie', 1)

    cy.request({
        url: `/wp-login.php`,
        method: "POST",
        body: fd
    }).then((resp) => {
        resp.headers['set-cookie'].forEach(cookie => {
            const firstPart = cookie.split(';')[0]
            const separator = firstPart.indexOf('=')
            const name = firstPart.substring(0, separator)
            const value = firstPart.substring(separator + 1)
            cy.setCookie(name, value)
        })
    }) 
    cy.visit('produtos/')
})
