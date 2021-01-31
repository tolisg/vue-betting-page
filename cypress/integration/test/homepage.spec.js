context('Test homepage', () => {
  it('successfully loads login page', () => {
    cy.visit('http://localhost:8080/'); // change URL to match your dev URL
    cy.get('.container-fluid').should('be.visible');
    cy.get('h4.card-title.text-white').should('contain', 'Please login');
    cy.get('.container-fluid')
      .find('input').eq(0).type('test@mail.com');
    cy.get('.container-fluid')
      .find('input')
      .eq(1)
      .type('Aa1@');
    cy.get('.container-fluid')
      .find('button').eq(0).click();
  });
  it('successfully loads home page', () => {
    cy.get('.container-fluid').should('be.visible');
    cy.get('h1.text-primary.text-center').should('contain', 'Please select 5 numbers for your bet');
  });
});
