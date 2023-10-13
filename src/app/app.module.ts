import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './components/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { TodoDescriptionComponent } from './components/todo-description/todo-description.component';
import { NotificationService } from './components/shared/notification/notification-message.service';
import { TodoCreateComponent } from './components/todo-create/todo-create.component';
import { TodoFilterComponent } from './components/todo-filter/todo-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoViewComponent } from './components/todo-view/todo-view.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoDescriptionComponent,
    TodoCreateComponent,
    TodoFilterComponent,
    TodoViewComponent,
  ],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    // Angular Material
    MatInputModule,

    // Custom
    SharedModule,
  ],
  providers: [
    { provide: NotificationService, useClass: NotificationService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
