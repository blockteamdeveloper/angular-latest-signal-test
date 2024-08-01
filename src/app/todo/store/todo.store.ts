import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../../model/todo.model';

export type TodosFilter = 'all' | 'pending' | 'completed';

type TodoState = {
    todos: Todo[];
    loading: boolean;
    filter: string;
}

const instialState: TodoState = {
    todos: [],
    loading: false,
    filter: 'all'
}

export const TodoStore = signalStore(
    {providedIn: 'root'},
    withState(instialState),
    withMethods(
        (store, todoService = inject(TodoService)) => ({
            async loadAl(){
                patchState(store, {loading: true});
                const todos = await todoService.getTodos();
                patchState(store, {todos, loading: false});
                return todos;
            },
            async addTodo(title: string){
                patchState(store, {loading: true});
                const todo = await todoService.addTodo({title, completed: false});

                patchState(store, (state: TodoState) => ({
                    todos: [...state.todos, todo]
                }))
                patchState(store, {loading: false});
            },
            async removeTodo(id: string){
                await todoService.removeTodo(id);
                patchState(store, (state: TodoState) => ({
                    todos: state.todos.filter(todo => todo.id !== id)
                }))
            }, 
            async updateTodo(id: string, completed: boolean){
                await todoService.updateTodo(id, completed);
                patchState(store, (state: TodoState) => ({
                    todos: state.todos.map(todo => todo.id === id ? {...todo, completed} : todo)
                }))
            },
            updateFilter(filter: TodosFilter){
                patchState(store, {filter});
            } 
        })
    )

);