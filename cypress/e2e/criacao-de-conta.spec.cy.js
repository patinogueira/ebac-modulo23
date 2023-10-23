const registerPage = require("../support/pages/register.page");
const { dashboardPage } = require('../support/pages/dashboard.page');
const dados = require('../fixtures/dados.json');
var faker = require('faker')

describe('fluxo de criacao de conta', () => {
  beforeEach(() => {
    cy.visit('/minha-conta')
  });
  
  it('deve registrar uma conta com sucesso', () => {
    registerPage.register(faker.internet.email(), faker.internet.password())
    dashboardPage.message.should('contain', 'Welcome')
  });

  it('deve validar mensagem de email invalido', () => {
    registerPage.register(dados[0].user, faker.internet.password())
   dashboardPage.errormessage.should('contain', 'Erro: Informe um endereço de e-mail válido.')
    
});

it('deve validar mensagem de email ja em uso', () => {
  let user = faker.internet.email()
  let password = faker.internet.password()
  registerPage.register(user, password)
  dashboardPage.logout.click()
  cy.visit('/minha-conta')
  registerPage.register(user, password)
 dashboardPage.errormessage.should('contain', 'Erro: Uma conta já está registrada com seu endereço de e-mail.')
 
});


})