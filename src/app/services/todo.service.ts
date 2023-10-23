import { Injectable, OnDestroy } from "@angular/core";
import { ITodo, ITodos } from "../interfaces/todo/todo-item.interface";
import { BehaviorSubject, Observable, Subject, iif, map, of, switchMap, takeUntil } from "rxjs";
import { TodoStatusEnum } from "../enums/todo-status.enum";
import { TodoApiService } from "./todo-api.service";
import { NotificationService } from "../components/shared/notification/notification-message.service";

@Injectable({
  providedIn: 'root'
})
export class TodoService extends BehaviorSubject<ITodos> implements OnDestroy {

  unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(private todoApi: TodoApiService, private notification: NotificationService) {
    super([]);
  }

  // Загрузить из БД записи
  public loadTodos(): void {
    const todos$: Observable<ITodos> = this.todoApi.getTodos();

    todos$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (todos) => super.next(todos),
      error: (error) => {},
      complete: () => {},
    })
  }

  public loadTodosAsync(): Observable<ITodos> {
    return super.asObservable().pipe(switchMap((todos) =>
      iif(
        () => Array.isArray(todos) && todos.length > 0,
        of(todos),
        this.todoApi.getTodos()
      )
    ))
  }

  // Удалить запись из БД
  public deleteTodoById(id: number): void {
    const delete$: Observable<any> = this.todoApi.deleteTodoById(id);

    delete$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (result) => {
        this.deleteTodo(id);
        this.showInfoMessage('Запись удалена!');
      },
      error: (error) => this.showErrorMessage(`${error}`),
      complete: () => {},
    })
  }

  // Удалить запись по ID
  deleteTodo(todoId: number): void {
    const newTodoList: ITodos = this.todos.filter(t => t.id != todoId);
    super.next([
      ...newTodoList
    ]);
  }

  // Добавить запись в БД
  public appendTodoDB(todo: ITodo): void {
    const newTodo$: Observable<any> = this.todoApi.appendTodo(todo);

    newTodo$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (result) => {
        this.appendTodo(result);
        this.showInfoMessage('Запись добавлена!');
      },
      error: (error) => this.showErrorMessage(`${error}`),
      complete: () => {},
    })
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
    this.appendTodoDB(todoItem)
  }
  
  // Создать запись
  public createTodoItem(text: string, description: string): ITodo {
    const nextId: number = this.nextTodoId;

    return  {
      id: nextId,
      text: text,
      description: description,
      status: TodoStatusEnum.InProgress,
    }
  }

  // Обновить запись в БД
  public updateTodoDB(todo: ITodo): void {
    const update$ = this.todoApi.updateTodo(todo.id, todo);

    update$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (result) => {
        this.updateTodo(result);
        this.showInfoMessage('Запись Обновлена!');
      },
      error: (error) => this.showErrorMessage(`${error}`),
      complete: () => {},
    })
  }

  // Обновить запись
  public updateTodo(todo: ITodo): void {
    const todoIdx: number = this.todos.findIndex(t => t.id === todo.id);
    
    if(todoIdx === -1) return

    const newTodoList: ITodos = this.todos.concat()
    newTodoList.splice(todoIdx, 1, todo)
    
    super.next(newTodoList);
  }

  /**
   * Selectors
  */
 
  // Подписаться на список записей
  public selectTodos(): Observable<ITodos> {
   return super.asObservable();
  }

  // Подписаться на список записей
  public selectTodoById(id: number): Observable<ITodo | undefined> {
   return super.asObservable().pipe(
    map(i => i.find(j => j.id === id))
   );
  }
  
  /**
   * Getters
  */
 
  // Получить текущий список
  public get todos(): ITodos {
    return super.getValue();
  }

  // Получить следующий ID
  public get nextTodoId(): number {
    const arrayIdx = this.todos.length > 0 ? this.todos.map(n => n.id + 1) : [0];
    
    return Math.max(...arrayIdx);
  }

  /**
   * Setters
   */

  // Установить список
  public set todos(list: ITodos) {
    super.next(list);
  }

  /**
   * Helpers
   */

  public clear(): void {
    super.next([]);
  }

  private showInfoMessage(message: string): void {
    this.notification.info('Операция прошла успешно', message);
  }

  private showErrorMessage(message: string): void {
    this.notification.info('Операция не удалась', message);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}