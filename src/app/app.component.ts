import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoStore } from './todo/store/todo.store';
import { JsonPipe } from '@angular/common';
import { TodosListComponent } from './todo/todos-list/todos-list.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, TodosListComponent, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  store = inject(TodoStore);

  ngOnInit() {
    this.loadTodos().then(() => {
      console.log('Todos loaded');
    })
  }

  async loadTodos(){
    await this.store.loadAl();
  }
}
