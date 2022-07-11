// MORE ASSERT DONE

// 1 CASES 
describe("homepage test", () => {
    beforeEach(() => {
  
    
    }); //value to search
  
    it("salesperson can cancel booking", () => {
      cy.visit("http://localhost:3000/login");
      cy.wait(500)
      cy.get("[id='username']").type(Cypress.env("user_name"));
      cy.get("[id='password']").type(Cypress.env("user_password"));
      cy.get("[id = 'loginbutton']").click({force:true});

      cy.get('.container:nth-child(2)').should('contain','admin')


      cy.wait(500)

      cy.visit('http://localhost:3000/')
      cy.get('.container:nth-child(2)').should('contain','admin')
       
      cy.get('[id = "selectstart"]').type('หมอชิต 2, กรุงเทพ{enter}'); //input : srcStation
      cy.get('[id = "selectstop"]').type('หนองรี, ชลบุรี{enter}'); //input : dstnStation
      cy.get('[id = "datesearch"]') //input : Date 
      .type('2022-07-11')
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

      cy.visit('http://localhost:3000/agent')

      cy.get('input').click();
      cy.get('input').type('2022-07-11');
      cy.get('.button').click();
      cy.get('.sc-bczRLJ:nth-child(3) td:nth-child(1)').should('have.length',2)
      cy.get('tr:nth-child(2) > td:nth-child(5)').should('contain','awaiting payment')
      cy.get('#delbutton1').click();
      cy.on('window:confirm', () => true)
      
      cy.get('.sc-bczRLJ:nth-child(3) td:nth-child(1)').should('have.length',1)


      

    });


    it("salesperson can cancel booking 2 passengers", () => {
      cy.visit("http://localhost:3000/login");
      cy.wait(500)
      cy.get("[id='username']").type(Cypress.env("user_name"));
      cy.get("[id='password']").type(Cypress.env("user_password"));
      cy.get("[id = 'loginbutton']").click({force:true});

      cy.get('.container:nth-child(2)').should('contain','admin')


      cy.wait(500)
      cy.visit('http://localhost:3000/mybookings');
      cy.get('.myBooking .card').should('have.length',2);
      cy.wait(500)

      
      cy.visit('http://localhost:3000')
      cy.get('.container:nth-child(2)').should('contain','admin')
       
      cy.get('[id = "selectstart"]').type('หมอชิต 2, กรุงเทพ{enter}'); //input : srcStation
      cy.get('[id = "selectstop"]').type('หนองรี, ชลบุรี{enter}'); //input : dstnStation
      cy.get('[id = "datesearch"]') //input : Date 
      .type('2022-07-11')
      cy.get('[id = dropdown_pass').click();
      cy.get('[id = inc_pass').click();
     
      cy.get('#react-app').click({force:true});

      cy.get('[id = searchbutton').click(); //Click Search

      cy.get('[id = bookbutton]').click({force:true});
      cy.url().should('eq','http://localhost:3000/bus_schedule/confirm');
      cy.get('[id = next]').click();
      cy.url().should('eq','http://localhost:3000/bus_schedule/book');

      cy.get('#addpass').click({force:true});
      

      
     cy.get('[id = titleName]').type('{enter}');

      cy.get('.card > #firstName').type('ศักดิ์สิทธิ์');
      cy.get('.card > #lastName').type('วิไลนุช');
      cy.get('.card > #phoneNo').type('0842019185');
      cy.get('.card > #email').type('saksit@gmail.com');

      
      cy.get('.passhead > input').click();
      cy.get('div:nth-child(2) > .step4 #birthDate').type('1998-11-10');




      cy.get('div:nth-child(3) .ofCard > #ptitleName').type('{enter}');
      cy.get('div:nth-child(3) .ofCard > #firstName').type('สมชาย');
      cy.get('div:nth-child(3) .ofCard > #lastName').type('วิไลนุช');
      cy.get('div:nth-child(3) #birthDate').type('1998-11-10');



     
      cy.get('[id = nextpay').click({force:true}); //Click Search
     
      cy.get('.card:nth-child(5)').should('contain','หมายเลขการจอง');

      cy.visit('http://localhost:3000/agent')

      cy.get('input').click();
      cy.get('input').type('2022-07-11');
      cy.get('.button').click();
      cy.get('.sc-bczRLJ:nth-child(3) td:nth-child(1)').should('have.length',3)
      cy.get('tr:nth-child(2) > td:nth-child(5)').should('contain','awaiting payment')
      cy.get('#delbutton1').click();
      cy.on('window:confirm', () => true)
      
      cy.get('.sc-bczRLJ:nth-child(3) td:nth-child(1)').should('have.length',1)


      

    });


    
  });