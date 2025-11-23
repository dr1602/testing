const baseUrl: string = 'http://localhost:3004/todos';

const mockTodos = [
  { id: 1, text: 'first todo', isCompleted: true },
  { id: 2, text: 'second todo', isCompleted: false },
  { id: 3, text: 'third todo', isCompleted: false },
];

const mockNewTodo = {
  id: 4,
  text: 'alpha',
  isCompleted: false,
};

const mockPutTodo = {
  id: 1,
  text: 'first todo',
  isCompleted: false,
};

const mockCheckedTodo = {
  id: 1,
  text: 'first todo',
  isCompleted: true,
};

const mockAltCheckedTodo = {
  id: 1,
  text: 'alphaBeta',
  isCompleted: true,
};

describe('Todos', () => {
  beforeEach(() => {
    cy.intercept(
      { method: 'GET', url: baseUrl },
      {
        body: mockTodos,
      }
    )
      .intercept(
        { method: 'POST', url: baseUrl },
        {
          body: mockNewTodo,
        }
      )
      .intercept(
        { method: 'DELETE', url: `${baseUrl}/1` },
        {
          body: {},
        }
      )
      .intercept(
        { method: 'PUT', url: baseUrl },
        {
          body: {},
        }
      )
      .as('getTodos')
      .visit('/');
  });

  it('visits the initial project page', () => {
    cy.on('uncaught:exception', (err, runable) => {
      if (err.message.includes('Network Error')) {
        return false;
      }

      return true;
    });

    cy.contains('todos');
  });

  it('renders 3 todos', () => {
    cy.on('uncaught:exception', (err, runable) => {
      if (err.message.includes('Network Error')) {
        return false;
      }

      return true;
    });
    cy.get('[role-cy="list"').should('have.length', 3);
    cy.get('[data-cy="todo"').eq(0).should('contain.text', 'first todo');
    cy.get('[data-cy="todo"').eq(1).should('contain.text', 'second todo');
    cy.get('[data-cy="todo"').eq(2).should('contain.text', 'third todo');

    cy.get('[data-cy="todoCheckbox"]').eq(0).should('be.checked');
  });

  it('renders footer', () => {
    cy.on('uncaught:exception', (err, runable) => {
      if (err.message.includes('Network Error')) {
        return false;
      }

      return true;
    });
    cy.get('[data-cy="todoCount"').eq(0).should('contain.text', '2 items left');
    cy.get('[data-cy="filterLink"')
      .eq(0)
      .should('contain.text', 'All')
      .should('have.class', 'selected');
    cy.get('[data-cy="filterLink"')
      .eq(1)
      .should('contain.text', 'All')
      .should('have.class', 'selected');
    cy.get('[data-cy="filterLink"')
      .eq(2)
      .should('contain.text', 'All')
      .should('have.class', 'selected');
  });

  it('can change filter', () => {
    cy.on('uncaught:exception', (err, runable) => {
      if (err.message.includes('Network Error')) {
        return false;
      }

      return true;
    });
    cy.get('[data-cy="filterLink"').eq(1).click();
    cy.get('[data-cy="filterLink"').eq(1).should('have.class', 'selected');
  });

  it('can add todo', () => {
    cy.on('uncaught:exception', (err, runable) => {
      if (err.message.includes('Network Error')) {
        return false;
      }

      return true;
    });
    cy.get('[data-cy="newTodoInput"').type('alpha{enter}');
    cy.get('[data-cy="todoCount"').eq(0).should('contain.text', '3 items left');
    cy.get('[data-cy="todoCount"').eq(3).should('contain.text', 'alpha');
  });

  it('can remove a todo', () => {
    cy.on('uncaught:exception', (err, runable) => {
      if (err.message.includes('Network Error')) {
        return false;
      }

      return true;
    });
    cy.get('[data-cy="destroy"').eq(0).click({ force: true });
    cy.get('[data-cy="todoCount"').eq(0).should('contain.text', '2 items left');
  });

  it('can toggle a todo', () => {
    cy.get('[data-cy="todoCheckbox"').eq(0).click();
    cy.get('[data-cy="todoCheckbox"').eq(0).should('not.be.checked');
  });

  it('can toggle all todos', () => {
    cy.intercept(
      { method: 'PUT', url: `${baseUrl}/*` },
      { body: mockCheckedTodo }
    );

    cy.get('[data-cy="toggleAll"').click();
    cy.get('[data-cy="todoCheckbox"').eq(0).should('be.checked');
    cy.get('[data-cy="todoCheckbox"').eq(1).should('be.checked');
    cy.get('[data-cy="todoCheckbox"').eq(2).should('be.checked');
  });

  it('should update a todo', () => {
    cy.intercept(
      { method: 'PUT', url: `${baseUrl}/*` },
      { body: mockAltCheckedTodo }
    );

    cy.get('[data-cy="todoLabel"').eq(0).dblclick();
    cy.get('[data-cy="todoEdit"').type('alphaBeta{enter}');
    cy.get('[data-cy="todoLabel"').eq(0).should('contain.text', 'alphaBeta');
  });
});
