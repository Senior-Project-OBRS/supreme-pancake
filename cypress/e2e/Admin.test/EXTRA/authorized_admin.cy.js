// MORE ASSERT DONE
// 3 CASES

describe("authorized page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/login");
      cy.wait(500)
      cy.get("[id='username']").type(Cypress.env("user_name"));
      cy.get("[id='password']").type(Cypress.env("user_password"));
      cy.get("[id = 'loginbutton']").click();

      cy.wait(500)
     
     
    });
  
    it("admin can access admin page", () => {
        cy.wait(500)
        cy.visit("http://localhost:3000/admin")
         cy.wait(500)
        cy.url().should('eq','http://localhost:3000/admin')
        cy.contains('จัดการผู้ใช้')
      
            
    });
    
    it("admin can access salesperson page", () => {
        cy.wait(500)
        cy.visit("http://localhost:3000/agent")
        cy.wait(500)
        cy.url().should('eq','http://localhost:3000/agent')
        cy.contains('ตรวจสอบรอบรถ')
  
    });

    it("admin can access driver page", () => {
        cy.wait(500)
        cy.visit("http://localhost:3000/agent/driver")
        cy.wait(500)
        cy.url().should('eq','http://localhost:3000/agent/driver')
        cy.contains('ตรวจสอบรอบรถ')
  
    });
  
  });