import { Injectable } from "@angular/core";
import { TODOS } from "../../model/mock-data";
import { resolve } from "path";
import { Todo } from "../../model/todo.model";

@Injectable({
    providedIn: 'root'
})

export class TodoService {
        async getTodos(){
             await sleep(1000);
             return TODOS;
        }
        async addTodo(todo: Partial<Todo>): Promise<Todo>{
            await sleep(800);
            return {
                id: Math.random().toString(36).substr(2, 9),
                ...todo
            } as Todo;
        }
        async removeTodo(id: string){
           await sleep(1000);

        }
        async updateTodo(id: string, completed: boolean){
            await sleep(1000);
        }
}

async function sleep(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
}