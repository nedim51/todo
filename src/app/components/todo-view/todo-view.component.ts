import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ITodo } from 'src/app/interfaces/todo/todo-item.interface';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.scss']
})
export class TodoViewComponent {

  todo$: Observable<ITodo | undefined>

  constructor(
    private todoService: TodoService, 
    private activatedRoute: ActivatedRoute) {
    this.todo$ = this.activatedRoute.params.pipe(
      switchMap(params => this.todoService.selectTodoById(Number(params['id'])))
    )
  }
}
