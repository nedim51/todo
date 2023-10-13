import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { ITodo } from 'src/app/interfaces/todo/todo-item.interface';
import { INITIAL_TODO } from '../todo-list/todo.data';
import { TodoStatusEnum } from 'src/app/enums/todo-status.enum';
import { debounceTime } from 'rxjs/operators'
import { Subject, Subscription } from 'rxjs';

const DEBOUNCE_TIME_DELAY: number = 500;

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit, OnDestroy {

  readonly: boolean = true;

  @Input({ required: true })
  todo: ITodo = INITIAL_TODO;

  @Output()
  todoOnDelete: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  todoOnChange: EventEmitter<ITodo> = new EventEmitter<ITodo>();

  todoItemState$: Subject<ITodo> = new Subject<ITodo>()
  subscription?: Subscription

  @HostListener('click') onClick() {
    const el = this.elementRef.nativeElement.querySelector('.item--active');
    if(el) this.renderer2.setStyle(this.elementRef, 'opacity', 1)
  }

  onChangeTitle() {
    this.readonly = false;
  }

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}
  
  ngOnInit(): void {
    this.subscription = this.todoItemState$.pipe(debounceTime(DEBOUNCE_TIME_DELAY)).subscribe((newState) => {
      this.todoOnChange.emit(newState)
    })
  }

  deleteTodo(id: number): void {
    this.todoOnDelete.emit(id)
  }

  onChangeTitleTodo(title: string): void {
    this.readonly = true;

    let changedTodo: ITodo = { ...this.todo } as ITodo;
    changedTodo.text = title;
    this.todoItemState$.next(changedTodo);
  }

  onTodoStatusChange(status: TodoStatusEnum): void {
    let changedTodo: ITodo = { ...this.todo } as ITodo;
    changedTodo.status = status ? TodoStatusEnum.InProgress : TodoStatusEnum.Completed;
    this.todoItemState$.next(changedTodo);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.todoItemState$.complete();
  }
}
