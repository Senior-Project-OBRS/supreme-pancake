// MORE ASSERT DONE
// DEFAULT VALUE : 20,02:00
// 1 CASES
describe("ROUTE DETAIL EDIT", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/login");
      cy.get("[id='username']").type(Cypress.env("user_name"));
      cy.get("[id='password']").type(Cypress.env("user_password"));
      cy.get("[id = 'loginbutton']").click();
      cy.wait(500)
    
      
    });
  
    it("can edit fare and time", () => {

      cy.wait(500)
      cy.visit("http://localhost:3000/agent/route_details");
      cy.wait(500)
      cy.get('.css-6j8wv5-Input').type("{enter}");

      cy.get('tr:nth-child(2)').should('have.text','หมอชิต 2 - บ้านบึง')
      .and('have.value','')

     
      cy.get('tr:nth-child(2)').should('have.text','หมอชิต 2 - บ้านบึง')
      cy.get('tr:nth-child(2) > td:nth-child(2) > input').should('have.value','20')
      cy.get('tr:nth-child(2) > td:nth-child(3) > input').should('have.value','02:00')
  
      cy.get('tr:nth-child(2) > td:nth-child(2) > input').clear()
      cy.get('tr:nth-child(2) > td:nth-child(2) > input').type('500');
      cy.get('tbody > tr:nth-child(1)').click();
      cy.get('tr:nth-child(2) > td:nth-child(3) > input').clear();
      cy.get('tr:nth-child(2) > td:nth-child(3) > input').type('04:00');
      cy.get('.button').click();
      
      cy.visit("http://localhost:3000/agent/route_details");
      cy.wait(500)
      cy.get('.css-6j8wv5-Input').type("{enter}");

      cy.get('tr:nth-child(2)').should('have.text','หมอชิต 2 - บ้านบึง')

      cy.get('tr:nth-child(2) > td:nth-child(2) > input').should('have.value','500')
      cy.get('tr:nth-child(2) > td:nth-child(3) > input').should('have.value','04:00')
      
      
    });
   

   
  
  });