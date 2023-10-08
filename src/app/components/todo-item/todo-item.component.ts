import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from 'src/app/interface/todo/todo-item.interface';
import { INITIAL_TODO } from '../todo-list/todo.data';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  @Input({ required: true })
  todo: ITodo = INITIAL_TODO;

  @Output()
  todoOnDelete: EventEmitter<number> = new EventEmitter<number>();

  deleteTodo(id: number): void {
    this.todoOnDelete.emit(id)
  }
}
