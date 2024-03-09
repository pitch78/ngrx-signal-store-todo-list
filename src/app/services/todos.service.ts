import {Injectable} from "@angular/core";
import {TODOS} from "../model/mock-data";
import {Todo} from "../model/todo.model";

@Injectable({providedIn: 'root'})
export class TodosService {
  async getTodos(): Promise<Todo[]> {
    return await getTodosFromBackend();
  }
}

const getTodosFromBackend = async (): Promise<Todo[]> => {
  return new Promise(resolve => setTimeout(() => resolve(TODOS), 1000));
}
