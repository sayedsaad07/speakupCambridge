import { Component, OnInit, Input } from '@angular/core';
import { eventAudience } from '../eventAudience';
import { EventAudianceService } from '../event-audiance.service';
import { speakUpEvent } from '../speakUpEvent';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Timerinfo } from "app/_shared/Timerinfo";
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-event-attendee-edit',
    templateUrl: './event-attendee-edit.component.html',
    styleUrls: ['./event-attendee-edit.component.css']
})
export class EventAttendeeEditComponent implements OnInit {
    isAvailable: boolean = false;
    sessions: string[] = ["Table Topic", "round robin", "speech", "Evaluation"];
    userid: string;
    currentAttendee: FirebaseObjectObservable<eventAudience> | Observable<string>;
    isNewEvent: boolean;
    ateendeeKey_routing: string;
    _attendeeKey_Input: string;

    attendeeKey: string;
    @Input() eventKey: string;

    @Input() attendeeKey_Input: Subject<string>;

    //set attendeeKey_Input(name: string) {

    //    console.log("input name " + this._attendeeKey_Input);
    //}
    //get attendeeKey_Input(): string {
    //    return this._attendeeKey_Input;
    //}
    constructor(private _EventAudianceService: EventAudianceService
        , private router: Router
        , private activatedRoute: ActivatedRoute
        , private authService: AuthService) {

    }

    ngOnDestroy() {
        this.attendeeKey_Input.unsubscribe;
        console.log('attendee key subscriber is destroyed');
    }
    ngOnInit() {
        this.attendeeKey_Input.subscribe(name => {
            if (name === "new" || name.length > 3) {
                this._attendeeKey_Input = name;
                this.ReloadAttendeeDetails();
                this.isAvailable = true;
            }
        });

        this.ateendeeKey_routing = this.activatedRoute.snapshot.params['id'];
        if (this.ateendeeKey_routing != null && this.ateendeeKey_routing != undefined && this.ateendeeKey_routing != '') {
            this.ReloadAttendeeDetails();
        }
        this.authService.currentUser().subscribe(u => this.userid = u.uid);;;
        this.isAvailable = false;
    }
    ReloadAttendeeDetails() {
        this.attendeeKey = this._attendeeKey_Input;
        if (this._attendeeKey_Input === null || this._attendeeKey_Input === undefined) {
            this.attendeeKey = this.ateendeeKey_routing;
        }
        this.isNewEvent = this.attendeeKey === 'new' || this.attendeeKey === "";
        if (!this.isNewEvent) {
            this.currentAttendee = this._EventAudianceService.getCurrentAttendee(this.attendeeKey);
        } else {
            this.currentAttendee = Observable.of({}) as FirebaseObjectObservable<eventAudience>;
        }

    }

    saveSpeakupEvent(_eventAudience: eventAudience) {
        _eventAudience.userid = this.userid;
        _eventAudience.eventkey = this.eventKey;
        const save = this.isNewEvent
            ? this._EventAudianceService.saveSpeakupEvent(_eventAudience)
            : this._EventAudianceService.editSpeakupEvent(_eventAudience);
        //save.then(_ => this.router.navigate([`events/list`]));
        this.isAvailable = false;
    }

    removeSpeakupEvent(_eventAudience: eventAudience) {
        const save = this._EventAudianceService.removeSpeakupEvent(_eventAudience);
        //save.then(_ => this.router.navigate([`events/list`]));
        this.isAvailable = false;
    }

    public setspeechDuration(data: Timerinfo, attendee: eventAudience): void {
        attendee.speechDuration = data.ticks;
    }


}
