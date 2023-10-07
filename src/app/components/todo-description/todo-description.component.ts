import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-todo-description',
  templateUrl: './todo-description.component.html',
  styleUrls: ['./todo-description.component.scss']
})
export class TodoDescriptionComponent {

  @Input('description')
  description: string = '';

}
