export interface IUserAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}

export interface ISignUpRequest {
    name: string;
    username: string;
    email: string;
    phone: string;
    address: IUserAddress,
}

export interface ITodo {
    id?: number;
    title: string;
    completed: boolean;
}

export interface ITodoItemEditorParams {
    todoItem?: ITodo;
    mode: TodoItemEditorMode;
    onSubmitted: (newTodo?: ITodo) => void;
}


export enum TodoItemEditorMode {
    create,
    update
}

export interface IConfirmDialogParams {
    caption?: string;
    onConfirm: () => void;
}
