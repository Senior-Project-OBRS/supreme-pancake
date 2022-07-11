//MORE ASSERT DONE
/// DEFAULT 5 USER
// 2  CASES

describe("sign-up", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/register");
    });
  
    it("should create new user", () => {
      cy.get("[id = email]").type("saksit.wn@gmail.com");
      cy.get('[id = username]').type("mindtest");
      cy.get("[id = password]").type("Speed007");
      cy.get("[id = cfpassword]").type("Speed007");
      cy.get("[id = firstname]").type("ศักดิ์สิทธิ์");
      cy.get("[id = lastname]").type("วิไลนุช");
      cy.get("[id = gender]").type('{enter}');

      cy.get("[id = registerbutton").click();
      cy.url().should('eq', "http://localhost:3000/")
      cy.get('.container:nth-child(2)').should('contain','mindtest')

      cy.window().then(win => {
        const user = win.Meteor.user();
        
        expect(user.profile.firstName).to.equal("ศักดิ์สิทธิ์");
        expect(user.emails[0].address).to.equal("saksit.wn@gmail.com"); 
     });


    });

    it("cant create user with duplicate username", () => {
        cy.get("[id = email]").type("saksit.wn@gmail.com");
        cy.get('[id = username]').type("admin");
        cy.get("[id = password]").type("Speed007");
        cy.get("[id = cfpassword]").type("Speed007");
        cy.get("[id = firstname]").type("ศักดิ์สิทธิ์");
        cy.get("[id = lastname]").type("วิไลนุช");
        cy.get("[id = gender]").type('{enter}');
  
        cy.get("[id = registerbutton").click();
        cy.url().should('eq', "http://localhost:3000/register")
        cy.on('window:alert', (str) => {
          expect(str).to.equal(`มีชื่อบัญชีผู้ใช้นี้แล้ว`)
        })
  
      });

      it("cant create user with password and comfirm password not match", () => {
        cy.get("[id = email]").type("saksit.wn@gmail.com");
        cy.get('[id = username]').type("admin");
        cy.get("[id = password]").type("Speed007");
        cy.get("[id = cfpassword]").type("Speed00s7");
        cy.get("[id = firstname]").type("ศักดิ์สิทธิ์");
        cy.get("[id = lastname]").type("วิไลนุช");
        cy.get("[id = gender]").type('{enter}');
  
        cy.get("[id = registerbutton").click();
        cy.url().should('eq', "http://localhost:3000/register")
        cy.on('window:alert', (str) => {
          expect(str).to.equal(`ยืนยันรหัสผ่านไม่ตรงกัน`)
        })
  
      });
  
    
  });

