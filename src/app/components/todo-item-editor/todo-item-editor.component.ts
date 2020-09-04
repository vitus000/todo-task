import {Component, Inject} from '@angular/core';
import {ITodo, ITodoItemEditorParams, TodoItemEditorMode} from "../../models/models";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TodoService} from "../../services/todo.service";

@Component({
    selector: 'app-todo-item-editor',
    templateUrl: './todo-item-editor.component.html',
    styleUrls: ['./todo-item-editor.component.scss']
})
export class TodoItemEditorComponent {
    formGroup: FormGroup;
    mode: TodoItemEditorMode;
    todoItem: ITodo;

    get todoItemEditorMode() {
        return TodoItemEditorMode;
    };

    formGroupValidators = {
        todoTitleMaxLength: 160,
    };

    constructor(public dialogRef: MatDialogRef<TodoItemEditorComponent>,
                @Inject(MAT_DIALOG_DATA) public data: ITodoItemEditorParams,
                private todoService: TodoService,
                private _dialog: MatDialog) {
    }

    ngOnInit() {
        const data = this.data;
        this.mode = data.mode;
        if (data.todoItem) {
            this.todoItem = data.todoItem;
        }
        this.formGroup = this._getFormGroup();
    }

    close() {
        this.dialogRef.close();
    }

    createTodoItem() {
        const newItem: ITodo = {
            title: this.formGroup.controls['title'].value,
            completed: this.formGroup.controls['completed'].value
        };
        this.todoService.createTodo(newItem)
            .subscribe(res => {
                this.data.onSubmitted(res);
                this.close();
            }, error => {
                console.log(error);
            })
    }

    updateTodoItem() {
        const updatedItem: ITodo = Object.assign(this.data.todoItem, {
            title: this.formGroup.controls['title'].value,
            completed: this.formGroup.controls['completed'].value
        });
        this.todoService.editTodo(updatedItem)
            .subscribe(res => {
                this.data.onSubmitted();
                this.close();
            }, error => {
                console.log(error);
            })
    }

    private _getFormGroup() {
        const isUpdating = this.mode === TodoItemEditorMode.update;
        return new FormGroup({
            title: new FormControl(isUpdating ? this.data.todoItem.title : '',
                [Validators.required, Validators.maxLength(this.formGroupValidators.todoTitleMaxLength)]),
            completed: new FormControl(isUpdating ? this.data.todoItem.completed : false),
        });

    }

}
