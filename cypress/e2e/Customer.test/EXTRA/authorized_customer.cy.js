// Done

// 3 CASES
describe("authorized page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/login");
      cy.wait(500)
      cy.get("[id='username']").type(Cypress.env("customer_name"));
      cy.get("[id='password']").type(Cypress.env("customer_pass"));
      cy.get("[id = 'loginbutton']").click();

      cy.wait(500)
     
     
    });
  
    it("user can't access admin page", () => {
        cy.wait(500)
        cy.visit("http://localhost:3000/admin")
         cy.wait(500)
        cy.url().should('eq','http://localhost:3000/unauthorized')
        cy.get('p:nth-child(3)').should('contain','You do not have access to the requested page.')
       
    });
    
    it("user can't access salesperson page", () => {
        cy.wait(500)
        cy.visit("http://localhost:3000/agent")
        cy.wait(500)
        cy.url().should('eq','http://localhost:3000/unauthorized')
        cy.get('p:nth-child(3)').should('contain','You do not have access to the requested page.')
  
    });

    it("user can't access driver page", () => {
      cy.wait(500)
      cy.visit("http://localhost:3000/agent/driver")
      cy.wait(500)
      cy.url().should('eq','http://localhost:3000/unauthorized')
      cy.get('p:nth-child(3)').should('contain','You do not have access to the requested page.')

  });
  
  });