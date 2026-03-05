import { TIngredient } from '../../src/utils/types';

describe('проверка работы конструктора', () => {
  let bun: TIngredient;
  let main: TIngredient;
  let orderNumber: string;

  const addIngredients = (bun: TIngredient, main: TIngredient) => {
    cy.get(`[data-cy=${bun._id}]`).find('button').click();
    cy.get(`[data-cy=${main._id}]`).find('button').click();
  };

  const clickIngredient = (ingredient: TIngredient) =>
    cy.get(`[data-cy=${bun._id}]`).find(`[data-cy='ingredient']`).click();

  before(() => {
    cy.fixture('ingredients.json').then((ingredients) => {
      bun = ingredients.data.find((i: TIngredient) => i.type === 'bun');
      main = ingredients.data.find((i: TIngredient) => i.type === 'main');

      expect(bun, 'должен присутсвовать хотя бы один ингредиент с типом bun').to
        .exist;
      expect(main, 'должен присутсвовать хотя бы один ингредиент с типом main')
        .to.exist;
    });

    cy.fixture('orderSuccess.json').then(
      (result) => (orderNumber = result.order.number.toString())
    );
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

  it('заказ успешно отправляется', () => {
    cy.setCookie('accessToken', 'mockedAccessToken');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'mockedRefreshToken');
    });

    cy.intercept('GET', `${Cypress.env('apiUrl')}/auth/user`, {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', `${Cypress.env('apiUrl')}/orders`, {
      fixture: 'orderSuccess.json'
    }).as('placeOrder');

    cy.reload();
    cy.wait('@getUser');

    addIngredients(bun, main);

    cy.get(`[data-cy='constructor']`).find(`[data-cy='send']`).click();
    cy.wait('@placeOrder');

    cy.get(`[data-cy='modal']`).should('exist').and('contain', orderNumber);

    cy.get(`[data-cy='modal']`).find(`[data-cy='close']`).click();

    cy.get(`[data-cy='modal']`).should('not.exist');

    cy.get(`[data-cy='constructor']`).within(() => {
      cy.contains(bun.name).should('not.exist');
      cy.contains(main.name).should('not.exist');
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });

    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('открывается модальное окно с деталями ингредиента', () => {
    clickIngredient(bun);

    cy.get(`[data-cy='modal']`).should('exist').and('contain', bun.name);

    cy.get(`[data-cy='modal']`).find(`[data-cy='close']`).click();

    cy.get(`[data-cy='modal']`).should('not.exist');
  });

  it('модальное окно закрывается по нажатию на оверлей', () => {
    clickIngredient(bun);

    cy.get(`[data-cy='modal']`).should('exist');

    cy.get(`[data-cy='overlay']`).click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
