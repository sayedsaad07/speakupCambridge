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

@Component({
    selector: 'app-event-attendee',
    templateUrl: './event-attendee.component.html',
    styleUrls: ['./event-attendee.component.css']
})
export class EventAttendeeComponent implements OnInit {

    eventAttendeeList: FirebaseListObservable<eventAudience[]> | Observable<string>;
    userid: string;
    currentEvent: FirebaseObjectObservable<speakUpEvent> | Observable<string>;
    isNewEvent: boolean;
    speakupeventKey_Routing: string;
    @Input() speakupeventKey_Input: string;
    eventKey: string;
    private currentAttendeeKey: string = 'new';

    constructor(private _EventAudianceService: EventAudianceService
        , private router: Router
        , private activatedRoute: ActivatedRoute
        , private authService: AuthService) {
        
    }

    ngOnInit() {
        
        this.speakupeventKey_Routing = this.activatedRoute.snapshot.params['id'];
        this.eventKey = this.speakupeventKey_Input;
        if (this.speakupeventKey_Input === null || this.speakupeventKey_Input === undefined) {
            this.eventKey = this.speakupeventKey_Routing;
        }
        
        //this.isNewEvent = this.speakupeventKey === 'new' || this.speakupeventKey === "";
        //!this.isNewEvent ? this.getSpeekupEventDetails() : this.currentEvent = Observable.of({}) as FirebaseObjectObservable<speakUpEvent>;
        
        this.authService.currentUser().subscribe(u => this.userid = u.uid);;;
        //this.Loaddata(this.eventKey);
        this.geteventAudienceList();
    }
    Loaddata(ekey: string) {
        
        var attendee = new eventAudience(ekey, "Sayed",
            "sayed@saad.com",
            "15 Mins speech",
            "Partnership", "15:15",
            true,
            this.userid);
        this._EventAudianceService.saveSpeakupEvent(attendee);
        var attendee = new eventAudience(ekey, "Sayed",
            "sayed@saad.com",
            "RoundRobin",
            "What If?", "00:30",
            true,
            this.userid);
        this._EventAudianceService.saveSpeakupEvent(attendee);
    }
  

    saveSpeakupEvent(_eventAudience: eventAudience) {
        _eventAudience.userid = this.userid;
        _eventAudience.eventkey = this.eventKey;
        this.isNewEvent = _eventAudience.$key === null || _eventAudience.$key === undefined || _eventAudience.$key === "";
        const save = this.isNewEvent
            ? this._EventAudianceService.saveSpeakupEvent(_eventAudience)
            : this._EventAudianceService.editSpeakupEvent(_eventAudience);
        //save.then(_ => this.router.navigate([`app-event-list`]));
    }

    removeSpeakupEvent(_eventAudience: eventAudience) {
        const save = this._EventAudianceService.removeSpeakupEvent(_eventAudience);
        //save.then(_ => this.router.navigate([`app-event-list`]));
    }

    geteventAudienceList() {
        this.eventAttendeeList = this._EventAudianceService.geteventAudienceList(this.eventKey);
    }
    
    showDoneOnly() {
        this.eventAttendeeList = this._EventAudianceService.geteventAudienceList(this.eventKey)
            .map(_tasks => _tasks.filter(t => t.showup === false));
    }
    showAll() {
        this.geteventAudienceList();
    }

    editEventAttendee(attendeekey: string)
    {
        this.currentAttendeeKey = attendeekey;
    }
    AddNewAttendee() {
        this.currentAttendeeKey = 'new';
    }
}
