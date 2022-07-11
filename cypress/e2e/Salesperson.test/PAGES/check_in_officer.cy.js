
//ASSERT DONE
describe("CHECK IN - OFFICER", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/login");
      cy.get("[id='username']").type(Cypress.env("sales_name"));
      cy.get("[id='password']").type(Cypress.env("sales_pass"));
      cy.get("[id = 'loginbutton']").click();
      cy.wait(500)
    
      cy.get('.container:nth-child(2)').should('contain','salesperson')

    });
  
    it("can open camera to check-in", () => {

    cy.get('.container:nth-child(2)').should('contain','salesperson')
    cy.visit('http://localhost:3000/agent/check-in')
    cy.contains('หน้าเช็คอินสำหรับพนักงานจำหน่ายตั๋ว')
    cy.contains('สแกน QR code').click();
    cy.get('#video').should('be.visible');


    
    });
  
  
  });