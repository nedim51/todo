import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoViewComponent } from './components/todo-view/todo-view.component';
import { canActivateDetailsRoute } from './guards/can-activate-details.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full',
  },
  {
    path: 'todos',
    component: TodoListComponent,
    children: [
      {
        path: ':id',
        component: TodoViewComponent,
        canActivate: [canActivateDetailsRoute]
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
