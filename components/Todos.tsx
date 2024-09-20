import { ITodo } from "../store/types.ts";
import { Todo } from "./Todo.tsx";

interface TasksProps {
  todos: ITodo[];
  removeTodo: (s: string) => void;
}

export function Todos({ todos, removeTodo }: TasksProps) {
  return (
    <div class="flex flex-col gap-2 pt-2 w-full">
      {todos?.map((todo) => <Todo todo={todo} removeTodo={removeTodo} />)}
    </div>
  );
}
