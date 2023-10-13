import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TODO_STATUS_NAMES } from 'src/app/helpers/guides';
import { IGuideSimple, IGuidesSimple } from 'src/app/interfaces/guide.interface';
import { ITodo } from 'src/app/interfaces/todo/todo-item.interface';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent {

  todoForm: FormGroup

  constructor() {
    this.todoForm  = this.creteTodo();
  }

  creteTodo(): FormGroup {
    return new FormGroup({
      text: new FormControl({ value: '', disabled: false }),
      description: new FormControl({ value: '', disabled: false }),
      status: new FormControl({ value: 'InProgress', disabled: true }),
    })
  }

  onCreateTodo(): void {

  }

  setFormValues(todoItem: ITodo): void {
    this.todoForm.patchValue({
      ...todoItem
    })
  }

  readonly todoStatusNames: IGuidesSimple = TODO_STATUS_NAMES;

  getTodoStatusName(code: string): string {
    const item: IGuideSimple | undefined = this.todoStatusNames.find((i: IGuideSimple) => i.code === code);
    return item?.name as string || '';
  }
}
 