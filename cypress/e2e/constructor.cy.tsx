import { TIngredient } from '../../src/utils/types';

describe('проверка работы конструктора', () => {
  let bun: TIngredient;
  let main: TIngredient;

  function addIngredients(bun: TIngredient, main: TIngredient) {
     cy.get(`[data-cy=${bun._id}]`).find('button').click();
     cy.get(`[data-cy=${main._id}]`).find('button').click();
  }
  
  before(() => {
    cy.fixture('ingredients.json').then((ingredients) => {
      bun = ingredients.data.find((i: TIngredient) => i.type === 'bun');
      main = ingredients.data.find((i: TIngredient) => i.type === 'main');
    });
  });
  
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('apiUrl')}/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('булки и начинки успешно добавляются в конструктор', () => {
    addIngredients(bun, main);

    cy.get(`[data-cy='constructor']`).within(() => {
      cy.contains('(верх)').should('exist').and('contain', bun.name);
      cy.contains('(низ)').should('exist').and('contain', bun.name);
      cy.contains(main.name).should('exist');
    });
  });
});
