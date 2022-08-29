import { DeleteTodoMutationFn, Todo, UpdateTodoMutationFn } from 'generated/schema';

export type TodoItemPropsType = {
  onToggle: UpdateTodoMutationFn;
  onDelete: DeleteTodoMutationFn;

  id?: Todo['id'];
  title?: Todo['title'];
  completed?: Todo['completed'];
};
