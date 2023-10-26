/// <reference types="cypress"/>

class emptyCartPage{
    
    get #itens() {return cy.get('.dropdown-toggle > .mini-cart-items')}
    get #cart() {return cy.get('#cart > .dropdown-toggle')}
    get #delete() {return cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .cart_list > #mcitem-d7598884f944f16d9f7b641f7636d2d5\ mini_cart_item > .product-details > .remove')}

    checkCart(){
        if (this.#itens>0) {
            this.#cart.click()
            this.#delete.click()
        }
    }
}

module.exports = new emptyCartPage