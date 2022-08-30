import { DeleteTodoMutationFn, Todo, UpdateTodoStatusMutationFn } from 'generated/schema';

export type TodoItemPropsType = {
  onToggle: UpdateTodoStatusMutationFn;
  onDelete: DeleteTodoMutationFn;

  id?: Todo['id'];
  title?: Todo['title'];
  completed?: Todo['completed'];
};
