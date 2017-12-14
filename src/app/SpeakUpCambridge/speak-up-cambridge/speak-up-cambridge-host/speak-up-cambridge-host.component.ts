import { Component, OnInit } from '@angular/core';
import { TodolistService } from '../../../todolist/todolist.index';
import { AppTimerService } from '../../../_shared/app-timer.service';
import { Timerinfo } from '../../../_shared/Timerinfo';

@Component({
    selector: 'app-speak-up-cambridge-host',
    templateUrl: './speak-up-cambridge-host.component.html',
    styleUrls: ['./speak-up-cambridge-host.component.css'],
})
export class SpeakUpCambridgeHostComponent implements OnInit {

    _Timerinfo: Timerinfo;
    ticks: string;
    constructor() {
    }

    ngOnInit() {

        //let timer = TimerObservable.create(2000, 1000);
        //this.subscription = timer.subscribe(t => {
        //    this.ticks = t;
        //});
        
    }
    public doSomething(data: Timerinfo): void {
        this._Timerinfo = data;
        console.log('Picked date: ', this._Timerinfo.ticks);
    }

    UpdateUI() {
        this.ticks = this._Timerinfo.ticks;
    }
}
