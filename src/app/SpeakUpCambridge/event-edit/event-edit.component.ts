import { Component, OnInit } from '@angular/core';
import { speakUpEvent } from '../speakUpEvent';
import { EventListService } from '../event-list.service';
import { EventAudianceService } from '../event-audiance.service';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css'],
  providers: [EventAudianceService]
})
export class EventEditComponent implements OnInit {

    userid: string;
    currentEvent: FirebaseObjectObservable<speakUpEvent> | Observable<string>;
    isNewEvent: boolean;
    speakupeventKey: string;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private _EventListService: EventListService,
        private authService: AuthService,
        private _EventAudianceService: EventAudianceService) {
    }

    ngOnInit() {
        this.speakupeventKey = this.activatedRoute.snapshot.params['id'];
        this.isNewEvent = this.speakupeventKey === 'new' || this.speakupeventKey === "";
        !this.isNewEvent ? this.getSpeekupEventDetails() : this.currentEvent = Observable.of({}) as FirebaseObjectObservable<speakUpEvent>;
        this.authService.currentUser().subscribe(u => this.userid = u.uid);;;
        //console.log("user id " + this.userid);
        //this._EventAudianceService.removeAllSpeakers(this.speakupeventKey);
    }




    getSpeekupEventDetails() {
        this.currentEvent = this._EventListService.getSpeakupEvent(this.speakupeventKey);
        console.log("key" + this.speakupeventKey);
    }

    saveSpeakupEvent(speakupevent: speakUpEvent) {
        speakupevent.userid = this.userid;
        speakupevent.isDone === true ? speakupevent.isDone = true : speakupevent.isDone = false;
        const save = this.isNewEvent
            ? this._EventListService.saveSpeakupEvent(speakupevent)
            : this._EventListService.editSpeakupEvent(speakupevent);
        save.then(_ => this.router.navigate([`/events/list`]));
    }

    removeSpeakupEvent(speakupevent: speakUpEvent) {
        //this._EventAudianceService.removeAllSpeakers(speakupevent.$key);
        const removeevent = this._EventListService.removeSpeakupEvent(speakupevent);
        removeevent.then(_ => this.router.navigate([`/events/list`]));
    }

}
