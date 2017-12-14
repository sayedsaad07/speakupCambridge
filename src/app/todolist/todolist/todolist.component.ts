import { Component, OnInit } from '@angular/core';
import { TodoTask } from '../todotask';
import { TodolistService } from '../todolist.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-todolist',
    templateUrl: './todolist.component.html',
    styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

    tasklist: FirebaseListObservable<TodoTask[]> | Observable<string>;

    totaltime: any = "00:00";

    constructor(private todolistsvc: TodolistService) {

        //var task = new TodoTask("running", "plan for a long run", "12/12/2012", "12/12/2012", false);
        //todolistsvc.saveTodoTask(task);
        //var task = new TodoTask("attending meetups", "plan for attending entrepreneur meetups once a month", "12/05/2017", "12/05/2017", false);
        //todolistsvc.saveTodoTask(task);

        //this.getTaskList();
    }

    ngOnInit() {
        this.getTaskList();
    }

    getTaskList() {
        this.tasklist = this.todolistsvc.gettodolist();
    }

    saveTask(task: TodoTask) {
        console.log(task.$key + "  " + task.name + "   " + task.isDone);
        //this.todolistsvc.editTodoTask(task);
    }

    showDoneOnly() {
        this.tasklist = this.todolistsvc.gettodolist()
            .map(_tasks => _tasks.filter(t => t.isDone === true));
    }
    showAll() {
        this.getTaskList();
    }


}



