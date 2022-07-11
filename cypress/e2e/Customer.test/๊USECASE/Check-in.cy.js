// ASSERT DONE 
import { BrowserMultiFormatReader } from '@zxing/browser';
        

const reader = new BrowserMultiFormatReader();

Cypress.Commands.add('readCode', { prevSubject: true }, (subject) => {
  const img = subject[0];
  const image = new Image();
  image.width = img.width;
  image.height = img.height;
  image.src = img.src;
  image.crossOrigin = 'Anonymous';
  return reader.decodeFromImageElement(image);
});
// 1 CASES 
describe("QR SHOW FOR CUSTOMER", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/login");
      cy.wait(500)
      cy.get("[id='username']").type(Cypress.env("user_name"));
      cy.get("[id='password']").type(Cypress.env("user_password"));
      cy.get("[id = 'loginbutton']").click({force:true});

      cy.get('.container:nth-child(2)').should('contain','admin')
    }); //value to search
  
    it("should generate qr code", () => {
 
      cy.visit('http://localhost:3000/mybookings');
      cy.get('.container:nth-child(2)').should('contain','admin')

      cy.get('#more0').click();
      cy.get('#checkin0').click();
      cy.get('input').click();
      cy.get('.button').click();
      cy.contains('แสดง QR Code')
      cy.get('.button').click();
      cy.get('#checkin').click();
      cy.get('#checkin').should('have.class','qrsvg');

      
    });

    it("should generate qr code for 3 passengers", () => {
 
      cy.visit('http://localhost:3000/mybookings');
      cy.get('.container:nth-child(2)').should('contain','admin')

      cy.get('#more1').click();
      cy.get('#checkin1').click();
      cy.get('p:nth-child(1) > input').click();
cy.get('p:nth-child(2) > input').click();
cy.get('p:nth-child(3) > input').click();

      cy.get('.button').click();
      cy.contains('แสดง QR Code')
      cy.get('.button').click();
      cy.get('#checkin').click();
      cy.get('#checkin').should('have.class','qrsvg');
      
   
    });
    
  });