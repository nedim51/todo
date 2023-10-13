import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { TODO_STATUS_FILTER_NAMES } from 'src/app/helpers/guides';
import { IGuidesSimple } from 'src/app/interfaces/guide.interface';

type TodoStatusType = string | number | null;

const DEBOUNCE_TIME_DELAY: number = 500;

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss']
})
export class TodoFilterComponent implements OnInit, OnDestroy {

  filterState$: Subject<TodoStatusType> = new Subject<TodoStatusType>()
  subscription?: Subscription
  readonly todoStatusNames: IGuidesSimple = TODO_STATUS_FILTER_NAMES;
  
  @Output('changeFilter') 
  changeFilter: EventEmitter<TodoStatusType> = new EventEmitter<TodoStatusType>();
  
  ngOnInit(): void {
    this.subscription = this.filterState$.pipe(debounceTime(DEBOUNCE_TIME_DELAY)).subscribe((filter) => {
      this.changeFilter.emit(filter);
    })
  }

  onChangeFilter(value: TodoStatusType): void {
    this.filterState$.next(value)
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
