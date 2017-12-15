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
        private authService: AuthService) {

    }

    ngOnInit() {
        this.speakupeventKey = this.activatedRoute.snapshot.params['id'];
        this.isNewEvent = this.speakupeventKey === 'new' || this.speakupeventKey === "";
        !this.isNewEvent ? this.getSpeekupEventDetails() : this.currentEvent = Observable.of({}) as FirebaseObjectObservable<speakUpEvent>;
        this.authService.currentUser().subscribe(u => this.userid = u.uid);;;
        console.log("user id " + this.userid);
    }




    getSpeekupEventDetails() {
        this.currentEvent = this._EventListService.getSpeakupEvent(this.speakupeventKey);
        console.log("key" + this.speakupeventKey);
    }

    saveSpeakupEvent(speakupevent: speakUpEvent) {
        speakupevent.userid = this.userid;
        speakupevent.isDone === true ? speakupevent.isDone = true : speakupevent.isDone = false;
        console.log("user id " + this.userid);
        console.log("is new speakupevent " + this.isNewEvent);
        console.log("speakupevent name " + speakupevent.name);
        const save = this.isNewEvent
            ? this._EventListService.saveSpeakupEvent(speakupevent)
            : this._EventListService.editSpeakupEvent(speakupevent);
        save.then(_ => this.router.navigate([`app-event-list`]));
    }

    removeSpeakupEvent(speakupevent: speakUpEvent) {
        const save = this._EventListService.removeSpeakupEvent(speakupevent);
        save.then(_ => this.router.navigate([`app-event-list`]));
    }

}
