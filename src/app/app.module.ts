import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TodoService} from "./services/todo.service";
import {HttpClientModule} from "@angular/common/http";
import { TodoListComponent } from './components/todo-list/todo-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDialogModule} from "@angular/material/dialog";
import { TodoItemEditorComponent } from './components/todo-item-editor/todo-item-editor.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {RegistrationPageComponent} from "./components/registration-page/registration-page.component";

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemEditorComponent,
    ConfirmDialogComponent,
    RegistrationPageComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatTableModule,
        MatButtonModule,
        MatDialogModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSlideToggleModule
    ],
  providers: [
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
