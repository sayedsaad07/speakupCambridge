import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AppTimerService } from '../app-timer.service';
import { Timerinfo } from '../Timerinfo';

@Component({
    selector: 'app-addon-timer',
    templateUrl: './addon-timer.component.html',
    styleUrls: ['./addon-timer.component.css']
    , providers: [AppTimerService]
})
export class AddonTimerComponent implements OnInit {

    @Output() onDatePicked: EventEmitter<Timerinfo> = new EventEmitter<Timerinfo>();
    isstarted: boolean;
    startstopstr: string = "Start";
    _Timerinfo: Timerinfo;//string= "00:00";
    private _startWith: string;

    @Input("latestTimer")
    set startWith(startit: string) {
        this._startWith = startit;
        this._Timerinfo.ticks = this._startWith;
    }
    get startWith(): string { return this._startWith; }


    constructor(private _AppTimerService: AppTimerService) {
        this._Timerinfo = this._AppTimerService._Timerinfo;
        //console.log("Component side ticks " + this._Timerinfo.ticks);
    }

    ngOnInit() {
        //this.startstopstr = "Start";
        //this._Timerinfo = { ticks: "00:00" };
        //let timer = TimerObservable.create(2000, 1000);
        //this.subscription = timer.subscribe(t => {
        //    this.ticks = t;
        //});

    }

    StartTimer() {
        if (!this.isstarted) {
            this._AppTimerService.StartTimer();
            this.startstopstr = "Stop";
        }
        else {
            this._AppTimerService.StopTimer();
            this.startstopstr = "Start";
            this.onDatePicked.emit(this._Timerinfo);
        }
        this.isstarted = !this.isstarted;
    }

}
