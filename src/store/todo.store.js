import { Todo } from "../todos/models/todo.model";

const Filters = {
  All: 'all',
  Completed: 'completed',
  Pending: 'pending',
}

const state = {
  todos: [
    new Todo('Piedra del alma'),
    new Todo('Piedra del infinito')
  ],
  filter: Filters.All
}

const initStore = () => {
  console.log('initStore', {state});
}

const loadStore = () => {
  throw new Error('Not implemented');
}

/**
 * 
 * @param {Filters<String>} filter : ;
 * @returns 
 */
const getTodos = ( filter = Filters.All ) => {

  const isValidFilter = Object.values( Filters ).includes( filter );
  if ( !isValidFilter ) throw new Error(`Option ${filter} is not valid.`)

  if ( filter === Filters.Completed ) 
    return [...state.todos.filter( todo => todo.done )];

  if ( filter === Filters.Pendings )
    return [...state.todos.filter( todo => !todo.done )];

  return [...state.todos];
}

/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
  if ( !description ) throw new Error('Description is required');
  state.todos.push( new Todo( description ) );
}

/**
 * 
 * @param {String<UUID>} todoId 
 */
const deleteTodo = ( todoId ) => {
  state.todos = state.todos.filter( todo => todo.id !== todoId );
}

const deleteCompleted = () => {
  state.todos = state.todos.filter( todo => !todo.done );
}

/**
 * 
 * @param {String<UUID>} todoId 
 */
const toggleTodo = ( todoId ) => {
  state.todos = state.todos.map( todo => {
    if ( todo.id === todoId ) 
      todo.done = !todo.done;

    return todo;
  });
}

/**
 * 
 * @param {String<Filters>} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
  state.filter = newFilter;
}

const getCurrentFilter = () => {
  return state.filter;
}

export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
}