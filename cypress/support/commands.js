/// <reference types="cypress"/>

Cypress.Commands.add('login', (user, password) => { 
    const fd = new FormData()
    fd.append('username', user)
    fd.append('password', password)
    fd.append('woocommerce-login-nonce', '48f290c7ac')
    fd.append('_wp_http_referer', '/minha-conta/')
    fd.append('login', 'Login')

    cy.request({
        url: '/minha-conta/',
        method: 'POST',
        body: fd
    }).then((resp) => {

        resp.headers['set-cookie'].forEach(cookie => {
            const firstPart = cookie.split(';')[0]
            const separator = firstPart.indexOf('=')
            const key = firstPart.substring(0,separator)
            const value = firstPart.substring(separator + 1)
                cy.setCookie(key,value)
        })
    })
    cy.visit('/minha-conta')
});

Cypress.Commands.add('AddProduto', (tamanho, cor, quantidade,id,varid) => {
const fd = new FormData()
    fd.append('attribute_size', tamanho)
    fd.append('attribute_color', cor)
    fd.append('quantity', quantidade)
    fd.append('add-to-cart', id)
    fd.append('product_id', id)
    fd.append('variation_id', varid)

    cy.request({
        url: '/product/abominable-hoodie/',
        method: 'POST',
        body: fd
    }).then(response => {
        response.headers['set-cookie'].forEach(cookie =>{
            const firstPart = cookie.split(';')[0]
            const divisor = firstPart.indexOf('=')
            const chave = firstPart.substring(0, divisor)
            const valor = firstPart.substring(divisor+1)
            cy.setCookie(chave, valor)
        })
   })
    cy.visit('/carrinho/') 
});

Cypress.Commands.add('cadastroFaturamentoCheckout', (cep, telefone) => {
    var faker = require('faker')
    cy.visit('/checkout/')
    cy.get('#billing_first_name').type(faker.name.firstName())
    cy.get('#billing_last_name').type(faker.name.lastName())
    cy.get('#billing_company').type(faker.company.companyName())
    cy.get('#select2-billing_country-container').click().type('Brasil{enter}')
    cy.get('#billing_address_1').type(faker.address.streetName())
    cy.get('#billing_city').type(faker.address.cityName())
    cy.get('#select2-billing_state-container').click().type('São Paulo{enter}')
    cy.get('#billing_postcode').type(cep)
    cy.get('#billing_phone').type(telefone)
    cy.get('#billing_email').type(faker.internet.email())
    cy.get('#terms').click()
    cy.get('#place_order').click()

})