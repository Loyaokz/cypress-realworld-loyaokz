import userData from '../fixtures/user-data.json'


describe('RealWorldApp Tests', () => {

  const selectorsList = {
    // PageObjects para Login
    usernameField: "[name='username']",
    passwordField:"[name='password']",
    loginButtom: "[type='submit']",
    checkBox: "[type='checkbox']",
    wrongCredentialAlert:"[role='alert']",
  }

  it('Login - Success', () => {
    cy.visit('http://localhost:3000/')
    cy.get(selectorsList.usernameField).type(userData.userSuccess.username)
    cy.get(selectorsList.passwordField).type(userData.userSuccess.password)
    cy.get(selectorsList.checkBox).click()
    cy.get(selectorsList.loginButtom).click()
  });

  it('Login - Failed', () => {
  cy.visit('http://localhost:3000/')
    cy.get(selectorsList.usernameField).type(userData.userFail.username)
    cy.get(selectorsList.passwordField).type(userData.userFail.password)
    cy.get(selectorsList.checkBox).click()
    cy.get(selectorsList.loginButtom).click()
    cy.get(selectorsList.wrongCredentialAlert).should('contain.text', 'Username or password is invalid')  
  });

  it('Deve registrar um novo usuário com informações válidas', () => {
    cy.visit('')
    cy.get("[href='/signup']").click()
    cy.get("[name='firstName']").type('primeiroNome')
    cy.get("[name='lastName']").type('ultimoNome')
    cy.get("[name='username']").type('nometest')
    cy.get("[name='password']").type('123456789')
    cy.get("[name='confirmPassword']").type('123456789')
    cy.get("[type='submit']").click()
  });

    it('Deve exibir mensagens de erro ao tentar registrar um novo usuário sem preencher todas as informações obrigatórias', () => {
     cy.visit('http://localhost:3000/')
    cy.get("[href='/signup']").click()
    cy.get("[name='firstName']").type('primeiroNome')
    cy.get("[name='lastName']").type('ultimoNome')
    cy.get("[name='username']")
    cy.get("[name='password']").type('1232456789')
    cy.get("[name='confirmPassword']").type('123456789')
    cy.get("[type='submit']").should('be.disabled')
  });

});