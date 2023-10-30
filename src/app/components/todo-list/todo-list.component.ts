import { Component, OnInit } from '@angular/core';
import { ITodo, ITodos } from '../../interfaces/todo/todo-item.interface';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { TodoService } from 'src/app/services/todo.service';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, PRIMARY_OUTLET, Router, RunGuardsAndResolvers } from '@angular/router';

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
  
  selectedTodoId$: Observable<number> | undefined

  constructor(private todoService: TodoService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.isLoading = true;
    this.todos$ = this.todoService.selectTodos();
    this.selectedTodoId$ = this.activatedRoute.firstChild?.params.pipe(map(params => params['id']))
  }

  ngOnInit(): void {
    this.todoService.loadTodos()

    setTimeout(() => this.isLoading = false, 1000);
  }

  public filterChange(filterBy: string | number | null): void {
    this.todos$ = this.todoService.selectTodos().pipe(map(i => i.filter(j => filterBy === 'all' || !(j.status == filterBy))))
  }

  public getTooltipTitle(itemId: number): string {
    const status = this.selectedItemId === itemId ? '!active' : 'active';
    const messages: string[] = this.tooltipText.filter((f) => f.status === status).map(m => m.message)
    return Array.isArray(messages) && messages.length > 0 ? messages[0] : '';
  }

  public onSelectItem(todoId: number): void {
    this.selectedItemId = this.selectedItemId != todoId ? todoId : undefined;
    this.router.navigate(['todos', todoId])
  }

  public deleteTodo(todoId: number): void {
    this.todoService.deleteTodoById(todoId)
    
    this.clearValues();   
  }

  public appendTodo(text: string, description: string): void {
    this.todoService.appendTodoByParams(text, description);

    this.clearValues();
  }

  public onEditItem(todo: ITodo): void {
    this.selectedItemId = undefined;

    this.todoService.updateTodoDB(todo);
  }
  
  public clearValues(): void {
    this.todoTextValue = '';
    this.todoDescValue = '';
  }

  public trackByFn(index: number, item: ITodo): unknown {
    return `${index}__${item.id}`
  }

}