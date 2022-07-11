//ASSERT MORE DONE
// 4 CASES



describe("booking", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/"); // Product
    });
  
    it("Should search booking", () => {
 
      cy.get('[id = "selectstart"]').type('หมอชิต 2, กรุงเทพ{enter}'); //input : srcStation
      cy.get('[id = "selectstop"]').type('หนองรี, ชลบุรี{enter}'); //input : dstnStation
      cy.get('[id = "datesearch"]') //input : Date 
      .type('2022-07-11')
      cy.get('[id = searchbutton').click(); //Click Search
      
      cy.url().should('eq', 'http://localhost:3000/bus_schedule/search?deptStation=%E0%B8%AB%E0%B8%A1%E0%B8%AD%E0%B8%8A%E0%B8%B4%E0%B8%95+2&arrStation=%E0%B8%AB%E0%B8%99%E0%B8%AD%E0%B8%87%E0%B8%A3%E0%B8%B5&deptDate=2022-07-11&NoPassengers=1')
  
      cy.get('.display').should('contain','หมอชิต 2 -> หนองรี')
      .and('contain','2022-07-11 | 1 passengers')
      cy.get('td:nth-child(1)').should('contain','10:00');
      cy.get('td:nth-child(2)').should('contain','02:00');
      cy.get('td:nth-child(3)').should('contain','12:00');
      cy.get('td:nth-child(4)').should('contain','20');
      cy.get('td:nth-child(5)').should('contain','จอง');


    
      
    });

    it("can't search booking if no bus_schedule", () => {
 
      cy.get('[id = "selectstart"]').type('หมอชิต 2, กรุงเทพ{enter}'); //input : srcStation
      cy.get('[id = "selectstop"]').type('หนองรี, ชลบุรี{enter}'); //input : dstnStation
      cy.get('[id = "datesearch"]') //input : Date 
      .type('2022-08-17')
      cy.get('[id = searchbutton').click(); //Click Search
      
      cy.on('window:alert', (str) => {
        expect(str).to.equal(`ไม่มีรอบรถที่ต้องการ`)
      })
      cy.url().should('eq', "http://localhost:3000/")
      
      
    });

    it("can't search  if no srcStation", () => {
 
      
      cy.get('[id = "selectstop"]').type('หนองรี, ชลบุรี{enter}'); //input : dstnStation
      cy.get('[id = "datesearch"]') //input : Date 
      .type('2022-07-11')
      cy.get('[id = searchbutton').click(); //Click Search
      
      cy.on('window:alert', (str) => {
        expect(str).to.equal(`กรุณาระบุสถานีต้นทาง`)
      })
      cy.url().should('eq', "http://localhost:3000/")
      
      
    });

    it("search with more than 1 passenger ex. 2 passenger", () => {
 
   


      cy.get('[id = "selectstart"]').type('หมอชิต 2, กรุงเทพ{enter}'); //input : srcStation

      cy.get('[id = "selectstop"]').type('หนองรี, ชลบุรี{enter}'); //input : dstnStation
      cy.get('[id = "datesearch"]') //input : Date 
      .type('2022-07-11')
      
      cy.get('[id = dropdown_pass').click();
      cy.get('[id = inc_pass').click();
      cy.get('[id = searchbutton').click({force:true}); //Click Search
      
     
      cy.url().should('eq', 'http://localhost:3000/bus_schedule/search?deptStation=%E0%B8%AB%E0%B8%A1%E0%B8%AD%E0%B8%8A%E0%B8%B4%E0%B8%95+2&arrStation=%E0%B8%AB%E0%B8%99%E0%B8%AD%E0%B8%87%E0%B8%A3%E0%B8%B5&deptDate=2022-07-11&NoPassengers=2')
      cy.get('.display').should('contain','หมอชิต 2 -> หนองรี')
      .and('contain','2022-07-11 | 2 passengers')
      
    });
  });