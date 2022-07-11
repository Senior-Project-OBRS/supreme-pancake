// MORE ASSERT DONE
// DEFAULT VALUE bookingNo 36802686 status: payment success
// 2 CASES 
describe("cancel booking", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/mybookings/");
      cy.wait(500)
      
    
    }); //value to search
  
    it("Should find booking by BookingNo and PhoneNo", () => {
        cy.get('[id = bookingNo]').type('68384393')
        cy.get('[id = phoneNo]').type('0842019185')
        cy.get('[id = findbooking]').click({force:true})
        cy.wait(500)
      
        cy.get('.card').should('contain','วันที่เดินทาง')
        .and('contain','68384393')
        .and('contain','จำนวนผู้โดยสาร')
        .and('not.contain','จองเมื่อ');

       
        cy.url().should('include', '/mybooking')
       
    });

    it("Shouldnt find booking by BookingNo and invalid phoneNo", () => {
      cy.get('[id = bookingNo]').type('68384393')
      cy.get('[id = phoneNo]').type('0842019155')
      cy.get('[id = findbooking]').click({force:true})
      cy.wait(500)
      cy.on('window:alert', (str) => {
        expect(str).to.equal(`รหัสการจองหรือเบอร์โทรศัพท์ไม่ถูกต้อง`)
      })
      cy.url().should('eq','http://localhost:3000/mybookings/')
  });
  
    
  });