import { Injectable } from '@angular/core';
import { FirebaseObjectObservable, FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { TodoTask } from "./todotask";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';

@Injectable()
export class TodolistService {

    todolist$: FirebaseListObservable<TodoTask[]>;
    todoTask$: FirebaseObjectObservable<TodoTask>;


    constructor(private db: AngularFireDatabase) {
        this.todoTask$ = this.db.object('todotask');
        this.todolist$ = this.db.list('todolist');
    }

    gettask(TodoTaskKey: string) {
        return this.db.object(`todolist/${TodoTaskKey}`)
            .catch(this.errorHandler);
    }

    gettodolist() {
        return this.todolist$
            .catch(this.errorHandler);
    }

    saveTodoTask(TodoTask: TodoTask) {
        return this.todolist$.push(TodoTask)
            .then(_ => console.log('success'))
            .catch(error => console.log(error));
    }

    editTodoTask(TodoTask: TodoTask) {
        return this.todolist$.update(TodoTask.$key, TodoTask)
            .then(_ => console.log('success'))
            .catch(error => console.log(error));
    }

    removeTodoTask(task: TodoTask) {
        if (task === null || task === undefined || task.$key === null || task.$key === undefined) return null;
        return this.todolist$.remove(task.$key)
            .then(_ => console.log('success'))
            .catch(error => console.log(error));
    }

    private errorHandler(error) {
        console.log(error);
        return Observable.throw(error.message);
    }

}
