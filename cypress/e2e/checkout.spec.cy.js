// Implemente 2 suítes de teste para o ecommerce que utilizamos ao longo deste módulo sendo:
// 1 para o fluxo de checkout, utilizando AppActions

// • Lembre-se de planejar quais são os cenários que precisa implementar.
// • Não esqueça de implementar os testes utilizando as 3 abordagens.

/// <reference types="cypress"/>
const dados = require('../fixtures/dados.json')
const produtos = require('../fixtures/produtos.json')

describe('fluxo de checkout', () => {
    beforeEach(() => {
        cy.login(dados[1].user, dados[1].password)

    });
   
    it('deve adicionar produtos no carrinho e finalizar uma compra', () => {
        cy.AddProduto(produtos[1].tamanho, produtos[1].cor, produtos[1].quantidade, produtos[1].id, produtos[1].varid)
        cy.get('.dropdown-toggle > .mini-cart-items', { timeout: 100000}).should('contain', 2)
        cy.cadastroFaturamentoCheckout(dados[1].cep, dados[1].telefone)
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
});