
// MORE ASSERT DONE
// DEFAULT VALUE : 1
// 4 CASES
describe("BUS MANAGEMENT", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/login");
      cy.wait(500)
      cy.get("[id='username']").type(Cypress.env("user_name"));
      cy.get("[id='password']").type(Cypress.env("user_password"));
      cy.get("[id = 'loginbutton']").click();
      cy.wait(500)
     
    });
  
    it("can add bus", () => {
     
      cy.wait(500)
      cy.visit("http://localhost:3000/agent/bus");
      cy.wait(500)
      cy.get("[id='Plate No']").type("กข 1259");///delete when use
      cy.get("[id='Bus Type']").type("{enter}");
      cy.get("[id='Total Seating']").type("{enter}");
  
      cy.get("[id = 'addbus']").click();
      cy.wait(500)

      cy.url().should('eq','http://localhost:3000/agent/bus');
      cy.get('td:nth-child(1)').should('contain', 'กข 1259')
      
     

    });

    
    it("cant add bus with wrong plate No", () => {
       
      cy.wait(500)
        cy.visit("http://localhost:3000/agent/bus");
        cy.wait(500)
        cy.get("[id='Plate No']").type("กข1259");
        cy.get("[id='Bus Type']").type("{enter}");
        cy.get("[id='Total Seating']").type("{enter}");
    
        cy.get("[id = 'addbus']").click();
        cy.wait(500)
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`ป้ายทะเบียนไม่ถูกต้อง`)
          })
      
          cy.get('td:nth-child(1)').should('not.contain', 'กข1259')
          cy.get('td:nth-child(1)').should('have.length', 2)

        
      });

      
    it("cant add bus with duplicate plate No", () => {
        cy.wait(500)
        cy.visit("http://localhost:3000/agent/bus");
        cy.get("[id='Plate No']").type("ทส 1111"); // TEST PLATE DONT DELETE
        cy.get("[id='Bus Type']").type("{enter}");
        cy.get("[id='Total Seating']").type("{enter}");
        cy.get("[id = 'addbus']").click();
        cy.get('td:nth-child(1)').should('contain', 'ทส 1111')

        cy.wait(500)
        cy.visit("http://localhost:3000/agent/bus");
        cy.get("[id='Plate No']").type("ทส 1111"); // TEST PLATE DONT DELETE
        cy.get("[id='Bus Type']").type("{enter}");
        cy.get("[id='Total Seating']").type("{enter}");

        cy.get("[id = 'addbus']").click();
        cy.wait(500)
        cy.on('window:alert', (str) => {
            expect(str).to.equal('มีทะเบียนรถ ทส 1111 อยู่ในระบบอยู่แล้ว')
          })
          cy.get('td:nth-child(1)').should('have.length', 3)
        
        
      });

      it("can delete bus", () => {
        
        cy.wait(500)
        cy.visit("http://localhost:3000/agent/bus");
        cy.get("[id='Plate No']").type("ลบ 1234"); // TEST PLATE DONT DELETE
        cy.get("[id='Bus Type']").type("{enter}");
        cy.get("[id='Total Seating']").type("{enter}");
        cy.get("[id = 'addbus']").click();
        cy.get('td:nth-child(1)').should('contain', 'ลบ 1234')
        cy.get('td:nth-child(1)').should('have.length', 4)
  
        
        cy.get('[id = delbutton3').click();
        cy.wait(500)
        cy.on('window:alert', (str) => {
                    expect(str).to.equal(`ลบข้อมูลรถโดยสาร ลบ 1234 สำเร็จ`)
                  })
        cy.get('td:nth-child(1)').should('have.length', 3)
        cy.get('td:nth-child(1)').should('not.contain', 'ลบ 1234')

      });

    
  
  });