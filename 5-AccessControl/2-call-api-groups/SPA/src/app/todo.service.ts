import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { protectedResources } from './auth-config';

export type Todo = {
    id: string;
    description: string;
    owner?: string;
    status: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    url = protectedResources.apiTodoList.endpoint;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Todo[]>(this.url + '/');
    }

    getTodos() {
        return this.http.get<Todo[]>(this.url);
    }

    getTodo(id: string) {
        return this.http.get<Todo>(this.url + '/' + id);
    }

    postTodo(todo: Todo) {
        return this.http.post<Todo>(this.url, todo);
    }

    deleteTodo(id: string) {
        return this.http.delete(this.url + '/' + id);
    }

    editTodo(todo: Todo) {
        return this.http.put<Todo>(this.url + '/' + todo.id, todo);
    }
}
