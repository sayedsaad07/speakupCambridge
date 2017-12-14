import { Injectable } from '@angular/core';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Timerinfo } from './Timerinfo';

@Injectable()
export class AppTimerService {
    public _Timerinfo: Timerinfo = { ticks: "00:00"};
    public ticks: string = "00:00";
    private subscription: Subscription;

    StartTimer() {
        //this.todolistsvc.start();
        let timer = TimerObservable.create(0, 1000);
        this.subscription = timer.subscribe(t => {
            this._Timerinfo.ticks = this.getMinutesSeconds(t);
        });
    }

    getMinutesSeconds(_ticks: number): string {
        
        let sec = _ticks % 60;
        let mins = Math.floor(_ticks / 60);
        var format_sec = ("0" + sec).slice(-2);
        var format_mints = ("0" + mins).slice(-2);
        return format_mints + ":" + format_sec;
    }
    StopTimer() {
        //this.totaltime = this.todolistsvc.getMinutes() + ":" + this.todolistsvc.getSeconds();
        this.subscription.unsubscribe();
    }
}

