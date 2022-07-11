//MORE ASSERT DONE
//DEFAULT VALUE : DEFAULT ROLES 


// 5 CASES 
describe("sign-in", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("should login with admin user", () => {
    cy.get("[id='username']").type(Cypress.env("user_name"));
    cy.get("[id='password']").type(Cypress.env("user_password"));

    cy.get("[id = 'loginbutton']").click();
    cy.get('.container:nth-child(2)').should('contain','admin')
    cy.visit('http://localhost:3000/admin')

  });

  
  it("can't login with wrong password", () => {
    cy.get("[id='username']").type(Cypress.env("user_name"));
    cy.get("[id='password']").type("456145654");

    cy.get("[id = 'loginbutton']").click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง`)
    })
    cy.url().should('eq', "http://localhost:3000/login")
    cy.get('.container:nth-child(2)').should('not.contain','admin')

  });

  it("should login with driver user", () => {
    cy.get("[id='username']").type(Cypress.env("driver_name"));
    cy.get("[id='password']").type(Cypress.env("driver_pass"));

    cy.get("[id = 'loginbutton']").click();
    cy.visit('http://localhost:3000/agent/driver')
    cy.get('.container:nth-child(2)').should('contain','driver')

  });

  it("should login with salesperson user", () => {
    cy.get("[id='username']").type(Cypress.env("sales_name"));
    cy.get("[id='password']").type(Cypress.env("sales_pass"));

    cy.get("[id = 'loginbutton']").click();
    cy.visit('http://localhost:3000/agent')
    cy.get('.container:nth-child(2)').should('contain','salesperson')

  });

  it("should login with customer user", () => {
    cy.get("[id='username']").type(Cypress.env("customer_name"));
    cy.get("[id='password']").type(Cypress.env("customer_pass"));

    cy.get("[id = 'loginbutton']").click();
    cy.wait(500)
    
    cy.visit("http://localhost:3000");

    cy.get('.container:nth-child(2)').should('contain','customer')

  });
});