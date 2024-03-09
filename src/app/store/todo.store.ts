import {Todo} from "../model/todo.model";
import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {computed, inject} from "@angular/core";
import {TodosService} from "../services/todos.service";

export type TodosFilter = "all" | "pending" | "completed";

type TodosState = {
  todos: Todo[];
  loading: boolean;
  filter: TodosFilter;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  filter: "all"
}

export const TodosStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods(
    (store, todoService = inject(TodosService)) => ({
      async loadAll() {
        patchState(store, {loading: true});
        const todos = await todoService.getTodos();
        patchState(store, {todos, loading: false});
      },

      async addTodo(title: string) {
        const todo = await todoService.addTodo({title, completed: false});
        patchState(store, (state) => ({...state, todos: [...state.todos, todo]}))
      },

      async deleteTodo(id: number) {
        const idOfRemovedTodo = await todoService.deleteTodo(id);
        patchState(store, (state) => ({...state, todos: state.todos.filter(todo => todo.id !== idOfRemovedTodo)}))
      },

      async updateTodo(id: number, completed: boolean) {
        await todoService.updateTodo(id, completed);
        patchState(store, (state) => ({todos: state.todos.map(todo => todo.id === id ? {...todo, completed} : todo)}));
      },

      updateFilter(filter: TodosFilter) {
        patchState(store, {filter})
      }
    })
  ),
  withComputed((state) => ({
    filteredTodos: computed(() => {
      const todos = state.todos();
      switch (state.filter()) {
        case "all":
          return todos;
        case "pending":
          return todos.filter(todo => !todo.completed);
        case "completed":
          return todos.filter(todo => todo.completed);
      }
    })
  }))
);
