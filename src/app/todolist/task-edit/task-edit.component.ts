import { Component, OnInit } from '@angular/core';
import { TodoTask } from '../todotask';
import { TodolistService } from '../todolist.service';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-task-edit',
    templateUrl: './task-edit.component.html',
    styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {


    currentTask: FirebaseObjectObservable<TodoTask> | Observable<string>;
    isNewTask: boolean;
    taskKey: string;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private todolistsvc: TodolistService) {

    }

    ngOnInit() {
        this.taskKey = this.activatedRoute.snapshot.params['id'];
        this.isNewTask = this.taskKey === 'new' || this.taskKey === "";
        !this.isNewTask ? this.getCompany() : this.currentTask = Observable.of({}) as FirebaseObjectObservable<TodoTask>;
    }

    getCompany() {
        this.currentTask = this.todolistsvc.gettask(this.taskKey);
        console.log("key" + this.taskKey);
    }

    saveTask(task: TodoTask) {
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
