import {Component, effect, inject, viewChild} from '@angular/core';
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {TodosFilter, TodosStore} from "../../store/todo.store";
import {JsonPipe} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    MatInput,
    MatIcon,
    MatSuffix,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatSelectionList,
    MatListOption,
    JsonPipe,
    MatProgressSpinner
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {
  store = inject(TodosStore);
  filter = viewChild.required("filter", {read: MatButtonToggleGroup});

  constructor() {
    effect(() => {
      this.filter().value = this.store.filter();
    });
  }

  async onAddTodo(target: HTMLInputElement) {
    await this.store.addTodo(target.value);
    target.value = "";
  }

  async onDeleteTodo(event: MouseEvent, id: number) {
    event.stopPropagation();
    await this.store.deleteTodo(id);
  }

  async onToggleTodoCompletion(id: number, completed: boolean) {
    await this.store.updateTodo(id, completed)
  }

  onFilterTodo(event: MatButtonToggleChange) {
    const filter: TodosFilter = event.value;
    this.store.updateFilter(filter);
  }
}
