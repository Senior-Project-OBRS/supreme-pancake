//  MORE ASSERT DONE 
// DEFAULT VALUE : 1

// 2 CASES
describe("BUS SCHEDULE MANAGEMENT", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/login");
      cy.wait(500)
      cy.get("[id='username']").type(Cypress.env("user_name"));
      cy.get("[id='password']").type(Cypress.env("user_password"));
      cy.get("[id = 'loginbutton']").click();
      cy.wait(500)
    });
  
    it("can add bus_schedule", () => {
     
      cy.visit("http://localhost:3000/agent/bus_schedule");
      cy.wait(500)
      cy.get('td:nth-child(2)').should('have.length',2)
    
      cy.wait(500)
      cy.get("[id='selectroute']").type("{enter}");
      cy.get('[id = "date"]') .type('2022-11-10')
      cy.get('[id = "time"]') .type('10:00')
      cy.get("[id='selectbus']").type("{enter}");
      cy.get("[id='selectdriver']").type("{enter}");

      cy.get("[id = addbusschedule").click();
      cy.wait(500)

      cy.get('td:nth-child(2)').should('have.length',3)
      cy.get('td:nth-child(2)').should('contain','2022-11-10')
      cy.url().should('eq','http://localhost:3000/agent/bus_schedule');
        
      
    });

    it("cant add bus_schedule duplicate route date time and bus ", () => {
     
      cy.visit("http://localhost:3000/agent/bus_schedule");
      cy.wait(500)
      cy.get('td:nth-child(2)').should('have.length',3)
    
      cy.wait(500)
      cy.get("[id='selectroute']").type("{enter}");
      cy.get('[id = "date"]') .type('2022-11-10')
      cy.get('[id = "time"]') .type('10:00')
      cy.get("[id='selectbus']").type("{enter}");
      cy.get("[id='selectdriver']").type("{enter}");

      cy.get("[id = addbusschedule").click();
      cy.wait(500)
     

      cy.on('window:alert', (str) => {
        expect(str).to.equal('มีรอบรถอยู่ในระบบอยู่แล้ว กรุณาลองใหม่อีกครั้ง')
      })
      cy.get('td:nth-child(2)').should('have.length',3)
      
    });

    it("can delete bus_schedule", () => {
     
      cy.visit("http://localhost:3000/agent/bus_schedule");
      cy.wait(500)
      cy.get('td:nth-child(2)').should('have.length',3)
    
      cy.wait(500)
      cy.get("[id='selectroute']").type("{enter}");
      cy.get('[id = "date"]') .type('2022-12-12')
      cy.get('[id = "time"]') .type('12:00')
      cy.get("[id='selectbus']").type("{enter}");
      cy.get("[id='selectdriver']").type("{enter}");

      cy.get("[id = addbusschedule").click();
      cy.wait(500)

      cy.get('td:nth-child(2)').should('have.length',4)
      cy.get('td:nth-child(2)').should('contain','2022-12-12')
      cy.url().should('eq','http://localhost:3000/agent/bus_schedule');
    
      cy.wait(500)

      cy.get('[id = delbusschedule3').click();
      cy.wait(500)
      cy.on('window:alert', (str) => {
                expect(str).to.equal(`ลบรอบรถ 2022-12-12 12:00 สำเร็จ`)
              })
      cy.get('td:nth-child(2)').should('have.length',3)
      cy.get('td:nth-child(2)').should('not.contain','2022-12-12')

      });

  
  });