import {Injectable} from "@angular/core";
import {TODOS} from "../app/model/mock-data";

@Injectable({providedIn: 'root'})
export class TodosService {
  async getTodos() {
    await sleep(1000);0
    return TODOS;
  }
}

const sleep = async (delay_ms: number) => {
  return new Promise(resolve => setTimeout(resolve, delay_ms));
}
