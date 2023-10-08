import { Component, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
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

  @HostListener('click') onClick() {
    const el = this.elementRef.nativeElement.querySelector('.item--active');
    if(el) this.renderer2.setStyle(this.elementRef, 'opacity', 1)
  }

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  deleteTodo(id: number): void {
    this.todoOnDelete.emit(id)
  }
}
