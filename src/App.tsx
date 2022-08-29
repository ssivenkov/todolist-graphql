import React from 'react';

import { AddTodo } from './components/addTodo/AddTodo';
import { TodoList } from './components/todoList/TodoList';

export const App = () => {
  return (
    <div>
      <AddTodo />
      <TodoList />
    </div>
  );
};
