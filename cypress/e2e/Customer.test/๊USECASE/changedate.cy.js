// MORE ASSERT DONE

// 1 CASES 
describe("booking", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/login");
      cy.wait(500)
      cy.get("[id='username']").type(Cypress.env("user_name"));
      cy.get("[id='password']").type(Cypress.env("user_password"));
      cy.get("[id = 'loginbutton']").click({force:true});

      cy.get('.container:nth-child(2)').should('contain','admin')

    }); //value to search
  
    it("Should date change", () => {
 
      cy.visit('http://localhost:3000/mybookings');
      cy.get('.container:nth-child(2)').should('contain','admin')

      cy.get('#more0').click();
      cy.get('#postpone0').click({force:true});
      cy.contains('เปลี่ยนวันเดินทาง')
      cy.get('input').click();
      cy.get('input').type('2022-07-12');
      // cy.get('input').type('2022-07-11');
      cy.contains('ยืนยันเปลี่ยนรอบรถ').click();
      cy.contains('2022-07-12')
      // cy.contains('2022-07-11')
      cy.contains('เลือก').click({force:true});
      cy.get('.changeb3:nth-child(2) p:nth-child(2)').should('contain','2022-07-11')
      cy.get('.changeb3:nth-child(4) p:nth-child(2)').should('contain','2022-07-12')
      // cy.get('.changeb3:nth-child(2) p:nth-child(2)').should('contain','2022-07-12')
      // cy.get('.changeb3:nth-child(4) p:nth-child(2)').should('contain','2022-07-11')

      cy.contains('ยืนยันเปลี่ยนรอบรถ').click();

      cy.get('.card > p').should('contain','วันที่เดินทาง : 2022-07-12')
      
      // cy.contains('วันที่จะเดินทาง : 2022-07-11')
      
     



     
     
    });
    
  });