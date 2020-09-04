import {Component, OnInit} from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {IConfirmDialogParams, ITodo, ITodoItemEditorParams, TodoItemEditorMode} from "../../models/models";
import {MatDialog} from "@angular/material/dialog";
import {TodoItemEditorComponent} from "../todo-item-editor/todo-item-editor.component";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
    isLoading = true;
    todos: ITodo[] = [];
    displayedColumns: string[] = ['number', 'title', 'status', 'edit', 'delete'];

    constructor(private todoService: TodoService,
                private _router: Router,
                private _activatedRoute: ActivatedRoute,
                private _dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.getTodos();
    }

    getTodos() {
        this.isLoading = true;
        this.todoService.getTodos()
            .subscribe(res => {
                this.isLoading = false;
                this.todos = res;
            }, e => {
                this.isLoading = false;
                console.log(e);
            });
    }

    deleteTodo(id: number) {
        const params: IConfirmDialogParams = {
            caption: 'Are you sure you want to delete this TODO item?',
            onConfirm: () => {
                this.isLoading = true;
                this.todoService.deleteTodo(id)
                    .subscribe(res => {
                        this.todos = this.todos.filter(t => t.id !== id);
                        this.isLoading = false;
                    }, error => {
                        console.log(error);
                        this.isLoading = false;
                    });
            }
        };
        this._dialog.open(ConfirmDialogComponent, {
            data: params
        });
    }

    updateTodo(todoItem: ITodo) {
        const params: ITodoItemEditorParams = {
            mode: TodoItemEditorMode.update,
            todoItem: todoItem,
            onSubmitted: () => {
                console.log('success');
            }
        };
        this._dialog.open(TodoItemEditorComponent, {
            data: params
        });
    }

    createTodo() {
        const params: ITodoItemEditorParams = {
            mode: TodoItemEditorMode.create,
            onSubmitted: (newTodo: ITodo) => {
                this.todos = [newTodo, ...this.todos];
            }
        };
        this._dialog.open(TodoItemEditorComponent, {
            data: params
        });
    }

}
