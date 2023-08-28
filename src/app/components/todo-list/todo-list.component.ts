import { Component } from '@angular/core';
import { ITodo, ITodos } from '../../interface/todo/todo-item.interface';
import { TODOS } from './todo.data';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  title: string = 'Todo List';

  todos: ITodos = TODOS;
  todoValue: string = '';

  get disabledSubmit(): boolean {
    return !this.todoValue.length
  }

  get nextTodoId(): number {
    const arrayIdx = this.todos.length > 0 ? this.todos.map(n => n.id + 1) : [0];
    
    return Math.max(...arrayIdx);
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