describe('Navigation', () => {
  it('should navigate to the about page', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-testid="drawer-button"]').click()
    cy.get('[data-testid="app-drawer"]').should('be.visible')
  })
})
