import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TodosStore} from "./store/todo.store";
import {JsonPipe} from "@angular/common";
import {TodosListComponent} from "./components/todos-list/todos-list.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, TodosListComponent, MatProgressSpinner],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ngrx-signal-store-todo-list';
  store = inject(TodosStore);

  ngOnInit(): void {
    this.loadTodos().then(() => console.log("Todos loaded \\o/"))
  }

  async loadTodos() {
    await this.store.loadAll();
  }
}
