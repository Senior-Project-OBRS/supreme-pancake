// MORE ASSERT DONE
// DEFAULT VALUE : 2
// 2 CASES
describe("ROUTE MANAGEMENT", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/login");
      cy.get("[id='username']").type(Cypress.env("user_name"));
      cy.get("[id='password']").type(Cypress.env("user_password"));
      cy.get("[id = 'loginbutton']").click();
      cy.wait(500)
    
      
    });
  
    it("can add route", () => {

      

      cy.wait(500)
      cy.visit("http://localhost:3000/agent/route");
      cy.wait(500)
      cy.get('td:nth-child(1)').should('have.length', 2)
      cy.wait(500)
      cy.get("[id='routename']").type("ROUTE A");
      cy.get("[id='sourcestation']").type("{enter}");
      cy.get("[id='selectpickup']").type("{enter}");
      cy.get("[id='selectdstn']").type("{enter}");
      cy.get("[id='selectdropoff']").type("{enter}");
      cy.get("[id = 'addroute']").click();
      cy.wait(500)


      cy.get('td:nth-child(1)').should('contain','ROUTE A')
      cy.get('td:nth-child(1)').should('have.length', 3)
      


      
    });

    it("cant add duplicate route name", () => {

      

      cy.wait(500)
      cy.visit("http://localhost:3000/agent/route");
      cy.wait(500)
      cy.get('td:nth-child(1)').should('have.length', 3)
      cy.wait(500)
      cy.get("[id='routename']").type("ROUTE A");
      cy.get("[id='sourcestation']").type("{enter}");
      cy.get("[id='selectpickup']").type("{enter}");
      cy.get("[id='selectdstn']").type("{enter}");
      cy.get("[id='selectdropoff']").type("{enter}");
      cy.get("[id = 'addroute']").click();
      cy.wait(500)
     

      cy.on('window:alert', (str) => {
        expect(str).to.equal('มีเส้นทางเดินรถ ROUTE A อยู่ในระบบอยู่แล้ว')
      })
      cy.get('td:nth-child(1)').should('have.length', 3)
      


      
    });
    
    it("can delete route", () => {
      cy.wait(500)
      cy.visit("http://localhost:3000/agent/route");
      cy.wait(500)
      cy.get('td:nth-child(1)').should('have.length', 3)


      cy.get("[id='routename']").type("ROUTE TEST DELETE");
      cy.get("[id='sourcestation']").type("{enter}");
      cy.get("[id='selectpickup']").type("{enter}");
      cy.get("[id='selectdstn']").type("{enter}");
      cy.get("[id='selectdropoff']").type("{enter}");
      cy.get("[id = 'addroute']").click();
      cy.wait(500)
      cy.get('td:nth-child(1)').should('have.length', 4)

      cy.get(`[id = opendrop3]`).click();
      cy.get('[id = delroute3]').click();
      cy.on('window:alert', (str) => {
                expect(str).to.equal(`ลบข้อมูลเส้นทาง ROUTE TEST DELETE สำเร็จ`)
              })
      cy.get('td:nth-child(1)').should('have.length', 3)
      cy.get('td:nth-child(1)').should('not.contain','ROUTE TEST DELETE')

  });
   
  
  });