import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodoListComponent} from "./components/todo-list/todo-list.component";
import {RegistrationPageComponent} from "./components/registration-page/registration-page.component";

const routes: Routes = [
  {
    path: 'todo-list',
    component: TodoListComponent,
  },
  {
    path: '',
    component: RegistrationPageComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
