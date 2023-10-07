import { Component, OnInit } from '@angular/core';
import { ITodo, ITodos } from '../../interface/todo/todo-item.interface';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { TODOS } from './todo.data';

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

  todos: ITodos;
  todoTextValue: string = '';
  todoDescValue: string = '';
  selectedItemId: number | undefined;
  isLoading: boolean = false;

  todoItemTooltip: string = 'Показать описание'
  
  tooltipText: { status: string, message: string }[] = [
    { status: 'active', message: 'Показать описание'}, 
    { status: '!active', message: 'Скрыть описание'}
  ]

  getTooltipTitle(itemId: number): string {
    const status = this.selectedItemId === itemId ? '!active' : 'active';
    const messages: string[] = this.tooltipText.filter((f) => f.status === status).map(m => m.message)
    return Array.isArray(messages) && messages.length > 0 ? messages[0] : '';
  }

  get canSubmit(): boolean {
    return !this.todoTextValue.length
  }

  get nextTodoId(): number {
    const arrayIdx = this.todos.length > 0 ? this.todos.map(n => n.id + 1) : [0];
    
    return Math.max(...arrayIdx);
  }
  
  constructor() {
    this.todos = TODOS;
    this.isLoading = true;
  }

  ngOnInit(): void {
    setTimeout(() => this.isLoading = false, 1000);
  }

  onSelectItem(todoId: number): void {
    this.selectedItemId = this.selectedItemId != todoId ? todoId : undefined;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id != id);

    this.clearValues()
  }

  appendTodo(text: string, description: string): void {
    const todoItem: ITodo = this.createTodoItem(text, description);
    this.todos.push(todoItem);

    this.clearValues();
  }

  onEditItem(todo: ITodo): void {
    this.todoTextValue = todo.text
    this.todoDescValue = todo.description
  }
  
  clearValues(): void {
    this.todoTextValue = '';
    this.todoDescValue = '';
  }

  createTodoItem(text: string, description: string): ITodo {
    const nextId: number = this.nextTodoId;

    return  {
      id: nextId,
      text: text,
      description: description
    }
  }

  public trackByFn(index: number, item: ITodo): unknown {
    return `${index}__${item.id}`
  }
}