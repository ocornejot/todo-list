import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos } from './use-cases';

const ElementIDs = {
  TodoFilters: '.filtro',
  ClearCompleted: '.clear-completed',
  TodoList: '.todo-list',
  NewTodoInput: '#new-todo-input',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

  const displayTodos = () => {
    const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
    renderTodos( ElementIDs.TodoList, todos );
  }

  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector( elementId ).append( app );
    displayTodos();
  })();

  //HTML references
  const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
  const todoListUL = document.querySelector( ElementIDs.TodoList );
  const clearCompletedButton = document.querySelector( ElementIDs.ClearCompleted );
  const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters );

  newDescriptionInput.addEventListener('keyup', evt => {
    if ( evt.keyCode !== 13 ) return;
    if ( evt.target.value.trim().length === 0 ) return;
    
    todoStore.addTodo( evt.target.value );
    displayTodos();
    evt.target.value = '';
  });

  todoListUL.addEventListener('click', (evt) => {
    const id = evt.target.closest('[data-id]').getAttribute('data-id');

    if ( evt.target.classList.contains('destroy') ) {
      todoStore.deleteTodo( id );
      displayTodos();
      return;
    }

    todoStore.toggleTodo( id );
    displayTodos();
  });

  clearCompletedButton.addEventListener('click', () => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  filtersLIs.forEach(element => {
    element.addEventListener('click', element => {
      filtersLIs.forEach(el => el.classList.remove('selected'));
      element.target.classList.add('selected');

      switch (element.target.text) {
        case 'All':
          todoStore.setFilter( Filters.All );
          break;
        case 'Pending':
          todoStore.setFilter( Filters.Pending );
          break;
        case 'Completed':
          todoStore.setFilter( Filters.Completed );
          break;
      }
      displayTodos();
    });
  });

}