// ASSERT DONE
// รอแก้


// 1 CASES 
describe("cancel booking", () => {
    beforeEach(() => {
      
    
    }); //value to search
  
    it("Should cancel new booking", () => {
      cy.visit("http://localhost:3000/login");
      cy.wait(500)
      cy.get("[id='username']").type(Cypress.env("user_name"));
      cy.get("[id='password']").type(Cypress.env("user_password"));
      cy.get("[id = 'loginbutton']").click({force:true});

      cy.get('.container:nth-child(2)').should('contain','admin')


      cy.wait(500)

      cy.visit('http://localhost:3000')
      cy.get('.container:nth-child(2)').should('contain','admin')
       
      cy.get('[id = "selectstart"]').type('หมอชิต 2, กรุงเทพ{enter}'); //input : srcStation
      cy.get('[id = "selectstop"]').type('บ้านบึง, ชลบุรี{enter}'); //input : dstnStation
      cy.get('[id = "datesearch"]') //input : Date 
      .type('2022-06-30')
      cy.get('[id = searchbutton').click(); //Click Search

      cy.get('[id = bookbutton]').click({force:true});
      cy.url().should('eq','http://localhost:3000/bus_schedule/confirm');
      cy.get('[id = next]').click();
      cy.url().should('eq','http://localhost:3000/bus_schedule/book');
      
      cy.get('[id = titleName]').type('{enter}');
      
      cy.get('.card > #firstName').type('ศักดิ์สิทธิ์');
      cy.get('.card > #lastName').type('วิไลนุช');
      cy.get('.card > #phoneNo').type('0842019185');
      cy.get('.card > #email').type('saksit@gmail.com');
      cy.get('[id = ptitleName]').type('{enter}');

      cy.get('.ofCard > #firstName').type('ศักดิ์สิทธิ์');
      cy.get('.ofCard > #lastName').type('วิไลนุช');
      cy.get('[id = "birthDate"]') //input : Date 
      .type('1998-11-10')
      cy.get('[id = ptitleName]')
      cy.get('[id = nextpay').click({force:true}); //Click Search
     
      cy.get('.card:nth-child(5)').should('contain','หมายเลขการจอง');
       

      cy.visit('http://localhost:3000/mybookings')
      cy.get('.myBooking .card').should('have.length',2)

      cy.get('.container:nth-child(2)').should('contain','admin')
      cy.get('#more1').click();
      cy.get('#cancel1').click();
      cy.on('window:confirm', () => true)

      cy.get('#react-app').should('not.contain','บ้านบึง')
      cy.get('#react-app').should('contain','หนองรี')
      cy.get('#react-app').should('not.contain','pending payment')

      cy.get('.myBooking .card').should('have.length',1)



      

    });
  });