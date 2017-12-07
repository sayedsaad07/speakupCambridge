import { Component, OnInit } from '@angular/core';
import { TodoTask } from '../todotask';
import { TodolistService } from '../todolist.service';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-task-edit',
    templateUrl: './task-edit.component.html',
    styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

    userid: string;

    currentTask: FirebaseObjectObservable<TodoTask> | Observable<string>;
    isNewTask: boolean;
    taskKey: string;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private todolistsvc: TodolistService,
        private authService: AuthService) {

    }

    ngOnInit() {
        this.taskKey = this.activatedRoute.snapshot.params['id'];
        this.isNewTask = this.taskKey === 'new' || this.taskKey === "";
        !this.isNewTask ? this.getCompany() : this.currentTask = Observable.of({}) as FirebaseObjectObservable<TodoTask>;
        this.authService.currentUser().subscribe(u => this.userid = u.uid);;;
        console.log("user id " + this.userid);
    }




    getCompany() {
        this.currentTask = this.todolistsvc.gettask(this.taskKey);
        console.log("key" + this.taskKey);
    }

    saveTask(task: TodoTask) {
        task.userid = this.userid;
        console.log("user id " + this.userid);
        console.log("is new task " + this.isNewTask);
        console.log("task name " + task.name);
        const save = this.isNewTask
            ? this.todolistsvc.saveTodoTask(task)
            : this.todolistsvc.editTodoTask(task);
        save.then(_ => this.router.navigate([`app-todolist`]));
    }

    removeTask(task: TodoTask) {
        const save = this.todolistsvc.removeTodoTask(task);
        save.then(_ => this.router.navigate([`app-todolist`]));
    }
}
