import { Injectable } from '@angular/core';
import { FirebaseObjectObservable, FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { TodoTask } from "./todotask";
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TodolistService {

    todolist$: FirebaseListObservable<TodoTask[]>;
    todoTask$: FirebaseObjectObservable<TodoTask>;
    userid: string;

    constructor(private db: AngularFireDatabase,
        private authService: AuthService) {

        this.authService.currentUser().subscribe(u => {
            this.todolist$ = this.db.list('todolist', query =>
                query.orderByChild("userid").equalTo(u.uid));
                //.map(_tasks => _tasks.filter(t => t.userid === u.uid));
            this.userid = u.uid;
        });
        console.log("user id " + this.userid);
        this.todoTask$ = this.db.object('todotask');
    }

    gettask(TodoTaskKey: string) {
        return this.db.object(`todolist/${TodoTaskKey}`)
            .catch(this.errorHandler);
    }

    gettodolist() {
        return this.todolist$
            .map(_tasks => _tasks.filter(t => t.userid === this.userid))
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

    public timeStart: number;
    start() {
        this.timeStart = new Date().getTime();
    }
    getSeconds() {
        const seconds = Math.ceil((new Date().getTime() - this.timeStart) / 1000) + 's';
        return seconds;
    }
    getMinutes() {
        const ms = (new Date().getTime() - this.timeStart) + 'ms';
        return ms;
    }
    getCurrentTime(): any {
        return {
            /** <integer>s e.g 2s etc. */
            get seconds() {
                const seconds = Math.ceil((new Date().getTime() - this.timeStart) / 1000) + 's';
                return seconds;
            },
            /** Milliseconds e.g. 2000ms etc. */
            get ms() {
                const ms = (new Date().getTime() - this.timeStart) + 'ms';
                return ms;
            }
        }
    }
}
