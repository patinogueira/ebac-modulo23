/// <reference types="cypress"/>

class CartPage{

    verCarrinho(){
        return cy.get('.woocommerce-message > .button')
    }
    addMaisUm(){
        cy.get('.plus').click()
    }

    get Total(){
        return cy.get('.product-subtotal > .woocommerce-Price-amount > bdi')
    }

    get carrinhoVazio(){
        return cy.get('.cart-empty')
    }
}

module.exports = new CartPage