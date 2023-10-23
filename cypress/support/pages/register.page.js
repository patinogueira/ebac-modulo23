/// <reference types="cypress"/>

class RegisterPage{
    
    get #user() {return cy.get("#reg_email")}
    get #password() {return cy.get("#reg_password")}
    get #register() {return cy.get('[value="Register"]')}

    register(user,password){
        this.#user.wait(400).type(user, {force:true})
        this.#password.type(password, {log: false})
        this.#register.click()
    }
}

module.exports = new RegisterPage