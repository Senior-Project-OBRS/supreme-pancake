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
describe("QR SHOW FOR CUSTOMER", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.wait(500)
    cy.get("[id='username']").type(Cypress.env("user_name"));
    cy.get("[id='password']").type(Cypress.env("user_password"));
    cy.get("[id = 'loginbutton']").click({force:true});

    cy.get('.container:nth-child(2)').should('contain','admin')
  }); //value to search

  it('can read qrcode and correct property for 1  ticket', () => {
    cy.visit('http://localhost:3000/qr');
    cy.get('[id="qrcodefortest"]')
      .readCode()
      .should('have.property', 'text','LwjsmYefckCSm4ejs,ศักดิ์สิทธิ์,วิไลนุช,not checked in')

});


it('can read qrcode and correct property for 2  ticket', () => {
  cy.visit('http://localhost:3000/qr');
  cy.get('[id="qrcodefortest2"]')
    .readCode()
    .should('have.property', 'text','2W4Hj6tiKPvQEuCDT,ศักดิ์สิทธิ์,วิไลนุช,not checked in,ac28EEgdoL63tEzsh,สมชาย,วิไลนุช,not checked in')

});
});


