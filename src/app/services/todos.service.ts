import {Injectable} from "@angular/core";
import {TODOS} from "../model/mock-data";
import {Todo} from "../model/todo.model";

@Injectable({providedIn: 'root'})
export class TodosService {
  async getTodos(): Promise<Todo[]> {
    return await mockBackendCall(TODOS);
  }

  async addTodo(todo: Partial<Todo>): Promise<Todo> {
    return await mockBackendCall({...todo, id: parseInt(Math.random().toString().substring(2, 8))} as Todo);
  }

  async deleteTodo(id: number) {
    return await mockBackendCall(id);
  }

  async updateTodo(id: number, completed: boolean) {
    return await mockBackendCall(id);
  }
}

const mockBackendCall = async (response: any): Promise<any> => {
  return new Promise(resolve => setTimeout(() => resolve(response), 1000));
}
