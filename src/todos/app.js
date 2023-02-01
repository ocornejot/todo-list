import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';

const ElementIDs = {
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

  newDescriptionInput.addEventListener('keyup', evt => {
    if ( evt.keyCode !== 13 ) return;
    if ( evt.target.value.trim().length === 0 ) return;
    
    todoStore.addTodo( evt.target.value );
    displayTodos();
    evt.target.value = '';
  });

  todoListUL.addEventListener('click', (evt) => {
    const id = evt.target.closest('[data-id]').getAttribute('data-id');
    todoStore.toggleTodo( id );
    displayTodos();
  });

}