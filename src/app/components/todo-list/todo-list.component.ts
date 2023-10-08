import { Component, OnInit } from '@angular/core';
import { ITodo, ITodos } from '../../interface/todo/todo-item.interface';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { TodoService } from 'src/app/services/todo.service';
import { Observable } from 'rxjs';
import { NotificationService } from '../shared/notification/notification-message.service';

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
    },
    {
      provide: TodoService,
      useClass: TodoService,
    }
  ]
})
export class TodoListComponent implements OnInit {

  title: string = 'Todo List';

  todos$: Observable<ITodos>;
  todoTextValue: string = '';
  todoDescValue: string = '';
  selectedItemId: number | undefined;
  isLoading: boolean = false;

  todoItemTooltip: string = 'Показать описание'
  
  tooltipText: { status: string, message: string }[] = [
    { status: 'active', message: 'Показать описание'}, 
    { status: '!active', message: 'Скрыть описание'}
  ]

  get canSubmit(): boolean {
    return !this.todoTextValue.length
  }
  
  constructor(private todoService: TodoService, private notification: NotificationService) {
    this.isLoading = true;
    this.todos$ = this.todoService;
  }

  ngOnInit(): void {
    setTimeout(() => this.isLoading = false, 1000);
  }

  public getTooltipTitle(itemId: number): string {
    const status = this.selectedItemId === itemId ? '!active' : 'active';
    const messages: string[] = this.tooltipText.filter((f) => f.status === status).map(m => m.message)
    return Array.isArray(messages) && messages.length > 0 ? messages[0] : '';
  }

  public onSelectItem(todoId: number): void {
    this.selectedItemId = this.selectedItemId != todoId ? todoId : undefined;
  }

  public deleteTodo(todoId: number): void {
    this.todoService.deleteTodo(todoId)

    this.clearValues()

    this.showMessage('Запись удалена!');
  }

  public appendTodo(text: string, description: string): void {
    this.todoService.appendTodoByParams(text, description);

    this.clearValues();

    this.showMessage('Запись добавлена!');
  }

  public onEditItem(todo: ITodo): void {
    this.selectedItemId = undefined;

    this.todoService.updateTodo(todo);

    this.showMessage('Запись изменена!');
  }
  
  public clearValues(): void {
    this.todoTextValue = '';
    this.todoDescValue = '';
  }

  public trackByFn(index: number, item: ITodo): unknown {
    return `${index}__${item.id}`
  }

  private showMessage(message: string): void {
    this.notification.info('Операция прошла успешно', message);
  }
}