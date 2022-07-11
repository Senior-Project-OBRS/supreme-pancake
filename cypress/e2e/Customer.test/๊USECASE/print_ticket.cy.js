// ASSERT MORE DONE

// 1 CASES 
describe("PRINT TICKET", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/login");

      cy.wait(500)
      cy.get("[id='username']").type(Cypress.env("user_name"));
      cy.get("[id='password']").type(Cypress.env("user_password"));
      cy.get("[id = 'loginbutton']").click({force:true});

      cy.get('.container:nth-child(2)').should('contain','admin')
    }); //value to search
  
    it("Should print tickets", () => {
      cy.visit('http://localhost:3000/mybookings')
      cy.get('.container:nth-child(2)').should('contain','admin')

      cy.get('#more0').click();
      cy.get('#detail0').click();
      cy.get('#opendrop').click();
      cy.get('#ticketprint').click();

      cy.get('.route > h2:nth-child(1)').should('have.contain','กรุงเทพ')
      cy.get('h2:nth-child(3)').should('have.contain','ชลบุรี')
      cy.get('.item:nth-child(1) > span').should('have.contain','ผู้โดยสาร')
      cy.get('.item:nth-child(2) > span').should('have.contain','ทะเบียนรถโดยสาร')
      cy.get('.item:nth-child(3) > span').should('have.contain','จุดขึ้น')

      cy.get('.item:nth-child(4) > span').should('have.contain','จุดลง')
      cy.get('.receipts').should('have.length',1)


      
    });

    
    it("Should print tickets 3 passengers", () => {
      cy.visit('http://localhost:3000/mybookings')
      cy.get('.container:nth-child(2)').should('contain','admin')

      cy.get('#more1').click();
      cy.get('#detail1').click();
      cy.get('#opendrop').click();
      cy.get('#ticketprint').click();

      cy.get('.route > h2:nth-child(1)').should('have.contain','กรุงเทพ')
      cy.get('h2:nth-child(3)').should('have.contain','ชลบุรี')
      cy.get('.item:nth-child(1) > span').should('have.contain','ผู้โดยสาร')
      cy.get('.item:nth-child(2) > span').should('have.contain','ทะเบียนรถโดยสาร')
      cy.get('.item:nth-child(3) > span').should('have.contain','จุดขึ้น')

      cy.get('.item:nth-child(4) > span').should('have.contain','จุดลง')
      cy.get('.receipts').should('have.length',3)
            


      
    });
    
  });