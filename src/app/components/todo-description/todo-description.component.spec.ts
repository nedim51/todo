import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDescriptionComponent } from './todo-description.component';

describe('TodoDescriptionComponent', () => {
  let component: TodoDescriptionComponent;
  let fixture: ComponentFixture<TodoDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoDescriptionComponent]
    });
    fixture = TestBed.createComponent(TodoDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
