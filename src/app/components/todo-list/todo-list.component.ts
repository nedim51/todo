import { Component, OnInit } from '@angular/core';
import { ITodo, ITodos } from '../../interface/todo/todo-item.interface';
import { TODOS } from './todo.data';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    }
  ]
})
export class TodoListComponent implements OnInit {

  title: string = 'Todo List';

  todos: ITodos = TODOS;
  todoValue: string = '';

  isLoading: boolean = false;

  get disabledSubmit(): boolean {
    return !this.todoValue.length
  }

  get nextTodoId(): number {
    const arrayIdx = this.todos.length > 0 ? this.todos.map(n => n.id + 1) : [0];
    
    return Math.max(...arrayIdx);
  }
  
  constructor() {
    this.isLoading = true;
  }

  ngOnInit(): void {
    setTimeout(() => this.isLoading = false, 1000);
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id != id);
  }

  appendTodo(text: string): void {
    const todoItem: ITodo = this.createTodoItem(text);
    this.todos.push(todoItem);
    this.todoValue = '';
  }

  createTodoItem(text: string): ITodo {
    const nextId: number = this.nextTodoId;

    return  {
      id: nextId,
      text: text
    }
  }
}