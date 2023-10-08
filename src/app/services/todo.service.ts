import { Injectable } from "@angular/core";
import { ITodo, ITodos } from "../interface/todo/todo-item.interface";
import { TODOS } from "../components/todo-list/todo.data";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class TodoService extends BehaviorSubject<ITodos> {

  constructor() {
    super(TODOS);
  }

  // Подписаться на список записей
  public selectTodos(): Observable<ITodos> {
    return super.asObservable();
  }

  // Получить текущий список
  public get todos(): ITodos {
    return super.getValue();
  }

  // Установить список
  public set todos(list: ITodos) {
    super.next(list);
  }

  // Добавить запись
  public appendTodo(todo: ITodo): void {
    super.next([
      ...this.todos,
      todo
    ]);
  }

  // Добавить запись по параметрам
  public appendTodoByParams(title: string, description: string): void {
    const todoItem: ITodo = this.createTodoItem(title, description);
    this.appendTodo(todoItem);
  }

  // Обновить запись
  public updateTodo(todo: ITodo): void {
    const todoIdx: number = this.todos.findIndex(t => t.id === todo.id);
    
    if(todoIdx === -1) return

    const newTodoList: ITodos = this.todos.concat()
    newTodoList.splice(todoIdx, 1, todo)
    
    super.next(newTodoList);
  }

  // Удалить запись по ID
  deleteTodo(todoId: number): void {
    const newTodoList: ITodos = this.todos.filter(t => t.id != todoId);
    super.next([
      ...newTodoList
    ]);
  }

  // Очистить список
  public clear(): void {
    super.next([]);
  }

  // Получить следующий ID
  public get nextTodoId(): number {
    const arrayIdx = this.todos.length > 0 ? this.todos.map(n => n.id + 1) : [0];
    
    return Math.max(...arrayIdx);
  }

  // Создать запись
  public createTodoItem(text: string, description: string): ITodo {
    const nextId: number = this.nextTodoId;

    return  {
      id: nextId,
      text: text,
      description: description
    }
  }
}