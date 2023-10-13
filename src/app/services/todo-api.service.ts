import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ITodo, ITodos } from "../interfaces/todo/todo-item.interface";
import { DBBaseService } from "./db-base.service";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TodoApiService {

    constructor(private db: DBBaseService) {}

    // Получить все записи
    getTodos(): Observable<ITodos> {
        return this.db.get('todos');
    }

    // Получить одну запись
    getTodoById(id: number): Observable<ITodos> {
        return this.db.get(`todos/${id}`);
    }

    // Удалить запись по id
    deleteTodoById(id: number): Observable<any> {
        return this.db.delete(`todos/${id}`);
    }

    // Добавить запись
    appendTodo(item: ITodo): Observable<any> {
        const json = JSON.stringify(item);
        const headers = new HttpHeaders({ 
            'Content-Type': 'application/json; charset=utf-8'
        })

        return this.db.post('todos', json, headers);
    }

    // Обновить запись
    updateTodo(id: number, item: ITodo): Observable<any> {
        const json = JSON.stringify(item);
        const headers = new HttpHeaders({ 
            'Content-Type': 'application/json; charset=utf-8'
        })

        return this.db.patch(`todos/${id}`, json, headers);
    }

}