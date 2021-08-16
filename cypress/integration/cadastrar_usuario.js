/// <reference types="cypress"/>

// Load Chance
let  Chance = require('chance');

// Instantiate Chance so it can be used
let chance = new Chance();


context('Cadastro', () => {
    
    it('Cadastrar um novo usuário', () => {
        // cy.server()
        // cy.route({
        // method: 'POST',
        // url: '**/index.php',
        // status: 200,
        // response: {}
        // }).as('postindex');

        cy.visit("/index.php")
        cy.get('.login').click();

        // Create Account
        cy.get('input#email_create').type(chance.email());
        cy.get('button#SubmitCreate').click();
        
        // cy.wait('@postindex').then((resindex) => {
        //     // com o serve / route
        //     expect(resindex.status).to.eq(200)
        //   })


        // Personal information
        cy.get('input#id_gender2').check();
        cy.get('input#customer_firstname').type(chance.first());
        cy.get('input#customer_lastname').type(chance.last());
        cy.get('input#passwd').type(chance.string({ length: 5 }));
        cy.get('select#days').select('1');
        cy.get('select#months').select('January');
        cy.get('select#years').select('1996');
        cy.get('input#newsletter').check();
        cy.get('input#optin').check();
        
        // Address
        cy.get('input#firstname').type(chance.first());
        cy.get('input#lastname').type(chance.last());
        cy.get('input#address1').type(chance.address());
        cy.get('input#city').type(chance.city());
        cy.get('select#id_state').select('California', {force:true});
        cy.get('input#postcode').type(chance.zip());
        cy.get('input#phone_mobile').type(chance.phone({ formatted: false }));
        cy.get('button#submitAccount').click();

        
        // validate text
        cy.get('.info-account').should('contain.text','Welcome to your account');

        // validate url after register
        cy.url().should('contain','index.php?controller=my-account');
    });
});
