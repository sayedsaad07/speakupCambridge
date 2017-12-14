import { Component, OnInit } from '@angular/core';
import { speakUpEvent } from '../speakUpEvent';
import { EventListService } from '../event-list.service';

import { FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

    eventList: FirebaseListObservable<speakUpEvent[]> | Observable<string>;


    constructor(private _EventListService: EventListService) {

        //var task = new speakUpEvent("running", "plan for a long run", "12/12/2012", "12/12/2012", false);
        //_EventListService.savespeakUpEvent(task);
        //var task = new speakUpEvent("attending meetups", "plan for attending entrepreneur meetups once a month", "12/05/2017", "12/05/2017", false);
        //_EventListService.savespeakUpEvent(task);

        //this.getTaskList();
    }

    ngOnInit() {
        this.getSpeakupEventList();
    }

    getSpeakupEventList() {
        this.eventList = this._EventListService.getSpeakupEventList();
    }

    saveTask(_speakUpEvent: speakUpEvent) {
        console.log(_speakUpEvent.$key + "  " + _speakUpEvent.name + "   " + _speakUpEvent.isDone);
        this._EventListService.editSpeakupEvent(_speakUpEvent);
    }

    showDoneOnly() {
        this.eventList = this._EventListService.getSpeakupEventList()
            .map(_tasks => _tasks.filter(t => t.isDone === false));
    }
    showAll() {
        this.getSpeakupEventList();
    }

}
