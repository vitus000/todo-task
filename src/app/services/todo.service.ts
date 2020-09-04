import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ISignUpRequest, ITodo} from "../models/models";

@Injectable({
    providedIn: 'root',
})
export class TodoService {
    readonly baseUrl = 'https://jsonplaceholder.typicode.com';

    constructor(private _http: HttpClient) {
    }

    signUp(model: ISignUpRequest): Observable<any> {
        return this._http.post(`${this.baseUrl}/users`, model);
    }

    public getTodos(): Observable<ITodo[]> {
        return this._http.get<ITodo[]>(`${this.baseUrl}/todos?userId=1`);
    }

    public createTodo(todo: ITodo): Observable<any> {
        return this._http.post(`${this.baseUrl}/todos`, todo);
    }

    public editTodo(todo: ITodo): Observable<any> {
        return this._http.patch(`${this.baseUrl}/todos/${todo.id}`, todo);
    }

    public deleteTodo(id: number): Observable<any> {
        return this._http.delete(`${this.baseUrl}/todos/${id}`);
    }
}
