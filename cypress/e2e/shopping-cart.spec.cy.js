/// <reference types="cypress"/>
const carrinho = require('../fixtures/carrinho.json');
const cartPage = require('../support/pages/cart.page');
const dados = require('../fixtures/dados.json');
const produtos = require('../fixtures/produtos.json');
let htmlEdit, htmlRemove, htmlAddP, htmlAddG

describe('interceptando as respostas do carrinho de compras', () => {
    before(() => {
        cy.loginAula(dados[1].user, dados[1].password)
    })
    beforeEach(() => {
        cy.readFile("cypress/response/editar.html").then(editar => {
            htmlEdit = editar
        })
    })
    beforeEach(() => {
        cy.readFile("cypress/response/adicionarGet.html").then(adicionarG => {
            htmlAddG = adicionarG
        })
    })
    beforeEach(() => {
        cy.readFile("cypress/response/adicionarPost.html").then(adicionarP => {
            htmlAddP = adicionarP
        })
    })

    beforeEach(() => {
        cy.readFile("cypress/response/remover.html").then(remover => {
            htmlRemove = remover
        })
    })
    it('deve adicionar item no carrinho', () => {
        
        cy.intercept({
            url: '/product*',
            method: 'POST',
        }, req => {
            req.reply(
                {
                    statusCode: 200,
                    body: htmlAddP
                })
        }).as('carrinhoPost')

        cy.intercept({
            method: 'GET',
            url: '/carrinho*',
        }, req => {
            if (req.headers.cookie.includes("woocommerce_items_in_cart=1")) {
                req.reply({
                    statusCode: 200,
                    body: htmlAddP
                })
            }
        }).as('fragmentsEdit')

        cy.AddProduto(produtos.tamanho, produtos.cor, produtos.quantidade, produtos.id, produtos.varid)
        cartPage.verCarrinho()
        cy.get('.woocommerce-message').should('contain', 'Beaumont Summit Kit')
        
    })
    it('deve atualizar o item no carrinho', () => {
        cy.AddProduto(produtos.tamanho, produtos.cor, produtos.quantidade, produtos.id, produtos.varid)

        cy.intercept({
            url: '/carrinho*',
            method: 'GET',
        }, req => {
            req.reply(
                {
                    statusCode: 200,
                    body: htmlEdit
                })
        }).as('carrinhoGET')

        cy.intercept({
            method: 'POST',
            url: '/?wc-ajax=get_refreshed_fragments*',
        }, req => {
            if (req.headers.cookie.includes("woocommerce_items_in_cart=1")) {
                req.reply({
                    statusCode: 200,
                    body: carrinho.edit
                })
            }
        }).as('fragmentsEdit')


        cartPage.addMaisUm()
        cartPage.Total.should('contain', '84,00')
    })
    it('deve deletar item do carrinho', () => {
        cy.AddProduto(produtos.tamanho, produtos.cor, produtos.quantidade, produtos.id, produtos.varid)

        cy.intercept({
            url: '/carrinho*',
            method: 'GET',
        }, req => {
            req.reply(
                {
                    statusCode: 200,
                    body: htmlRemove
                })
        }).as('carrinhoGET')

        cy.intercept({
            method: 'POST',
            url: '/?wc-ajax=get_refreshed_fragments*',
        }, req => {
            if (req.headers.cookie.includes("woocommerce_items_in_cart=1")) {
                req.reply({
                    statusCode: 200,
                    body: carrinho.remover
                })
            }
        }).as('fragmentsEdit')

        cartPage.addMaisUm()
        cartPage.carrinhoVazio.should('contain', 'Seu carrinho está vazio')
    })

})
