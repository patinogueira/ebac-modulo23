/// <reference types="cypress"/>
const faker = require('faker');
const dados = require('../fixtures/dados.json')
const produtos = require('../fixtures/produtos.json')

describe('fluxo de checkout', () => {
    beforeEach(() => {
        cy.loginAula(dados[1].user, dados[1].password)
        cy.emptyCart()
    });
   
    it('deve adicionar produtos no carrinho e finalizar uma compra', () => {
        cy.AddProduto(produtos.tamanho, produtos.cor, produtos.quantidade,produtos.id,produtos.varid)
        cy.get('.dropdown-toggle > .mini-cart-items', { timeout: 1000000}).should('contain', 2)
        cy.cadastroFaturamentoCheckout(dados[1].cep, dados[1].telefone)
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });

});