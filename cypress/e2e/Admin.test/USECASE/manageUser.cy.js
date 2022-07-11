// MORE ASSERT DONE
// DEFAULT : 5 USERS
// 2 CASES

describe("USER MANAGEMENT PAGE", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/login");
      cy.wait(500)
      cy.get("[id='username']").type(Cypress.env("user_name"));
      cy.get("[id='password']").type(Cypress.env("user_password"));
      cy.get("[id = 'loginbutton']").click();

      cy.wait(500)
     
     
    });
  
    it("can change role", () => {
      cy.visit("http://localhost:3000/admin");
        cy.get("[id =  roles3]").click().find('input').focus()
        cy.get('[id^="roles3"]').contains('salesperson')
        .click({force:true})
        cy.wait(500)

        cy.on('window:confirm', () => true)
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`เปลี่ยนบทบาทผู้ใช้งาน customer เสร็จสิ้น`)
          })
       
        cy.get('[id =  roles3]').should('contain','salesperson')

        
    
       
    });
    
    it("can delete user", () => {
      cy.visit("http://localhost:3000/admin");
        cy.get('td:nth-child(2)').should('not.contain','addtoDel')
        cy.get('td:nth-child(2)').should('have.length','5')

        cy.visit("http://localhost:3000/register");
        cy.wait(500)
        cy.get("[id = email]").type("testdelete@gmail.com");
        cy.get('[id = username]').type("addtoDel");
        cy.get("[id = password]").type("Speed007");
        cy.get("[id = cfpassword]").type("Speed007");
        cy.get("[id = firstname]").type("ศักดิ์สิทธิ์");
        cy.get("[id = lastname]").type("วิไลนุช");
        cy.get("[id = gender]").type('{enter}');

        cy.get("[id = registerbutton").click();
        cy.wait(1000)
        cy.get('.usertext > .user').click();
        cy.wait(500);

        cy.visit("http://localhost:3000/login");
        cy.wait(500);
        cy.get("[id='username']").type(Cypress.env("user_name"));
        cy.get("[id='password']").type(Cypress.env("user_password"));
        cy.get("[id = 'loginbutton']").click();
        cy.wait(500);

        cy.visit("http://localhost:3000/admin");
        cy.get('td:nth-child(2)').should('contain','addtoDel')
        cy.get('td:nth-child(2)').should('have.length','6')


        cy.get("[id = deluser5").click();
        cy.on('window:confirm', () => true);
        cy.on('window:alert', (str) => {
          expect(str).to.equal(`ลบผู้ใช้งาน addtoDel สำเร็จ`)
        })
       
        cy.get('td:nth-child(2)').should('not.contain','addtoDel')
        cy.get('td:nth-child(2)').should('have.length','5')

    
      
       
        
       
        
    });
  
  });