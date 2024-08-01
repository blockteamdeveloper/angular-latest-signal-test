import { Component, effect, inject, viewChild } from '@angular/core';
import { MatLabel, MatSuffix, MatFormField, } from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import { MatInput}  from '@angular/material/input';
import { TodoStore, TodosFilter } from '../store/todo.store';
import {MatList, MatListModule} from '@angular/material/list';
import {MatButtonToggleChange, MatButtonToggleModule} from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [MatFormField, MatLabel, MatSuffix, MatIcon, MatInput, MatList, MatListModule, MatButtonToggleModule, CommonModule ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {
  store = inject(TodoStore);
  filter = viewChild.required(MatButtonToggleChange)
  
  constructor(){
    effect(() => {
        const filter = this.filter();
        filter.value = this.store.filter();
    });
  }
  async onAddTodo(value: string){
    await this.store.addTodo(value);
  }
  async onDeleteTodo(id: string, event: MouseEvent){
    event.stopPropagation();
    await this.store.removeTodo(id);
  }
  async onTodoToggled(id: string, completed: boolean){
    await this.store.updateTodo(id, completed);
  }
  onFitlerTodods(event: MatButtonToggleChange){
    const fitler = event.value as TodosFilter
    this.store.updateFilter(fitler);
  }
 
}
