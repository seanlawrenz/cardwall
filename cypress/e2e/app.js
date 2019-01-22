describe('everything is running correctly', () => {
  it('should load without errors', () => {
    cy.visit('/').getByText(/welcome to app!/i);
  });
});
