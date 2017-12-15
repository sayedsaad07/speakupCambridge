import { Injectable } from '@angular/core';
import { FirebaseObjectObservable, FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
//import { speakUpEvent } from "./speakUpEvent";
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { eventAudience } from "app/SpeakUpCambridge/eventAudience";
import { speakUpEvent } from "app/SpeakUpCambridge/speakUpEvent";

@Injectable()
export class EventAudianceService {
    speakUpEventAudienace$: FirebaseListObservable<eventAudience[]>;;
    speakUpEvent$: FirebaseObjectObservable<speakUpEvent>;
    userid: string;

    constructor(private db: AngularFireDatabase,
        private authService: AuthService) {

        this.authService.currentUser().subscribe(u => {
            //this.speakUpEventAudienace$ = this.db.list('speakUpEventAudienace');
            //, query =>
            //    query.orderByChild("userid").equalTo(u.uid));
            //.map(_tasks => _tasks.filter(t => t.userid === u.uid));
            this.userid = u.uid;
        });
        console.log("user id " + this.userid);
        this.speakUpEventAudienace$ = this.db.list('speakUpEventAudienace');
            //, query =>
            //    query.orderByChild("userid").equalTo(u.uid));
            //.map(_tasks => _tasks.filter(t => t.userid === u.uid));
        //this.speakUpEvent$ = this.db.object('speakUpEvent');
    }

    getCurrentAttendee(attendeeKey: string) {
        return this.db.object(`speakUpEventAudienace/${attendeeKey}`)
            .catch(this.errorHandler);
    }

    geteventAudienceList(eventKey: string) {
        return this.speakUpEventAudienace$
            .map(_tasks => _tasks.filter(t => t.eventkey === eventKey))
            .catch(this.errorHandler);
    }

    saveSpeakupEvent(_eventAudience: eventAudience) {
        console.log("load with Event Key" + _eventAudience.eventkey + " Ateendee key " + _eventAudience.$key);
        return this.speakUpEventAudienace$.push(_eventAudience)
            .then(_ => console.log('success'))
            .catch(error => console.log(error));
    }

    editSpeakupEvent(_eventAudience: eventAudience) {
        return this.speakUpEventAudienace$.update(_eventAudience.$key, _eventAudience)
            .then(_ => console.log('success'))
            .catch(error => console.log(error));
    }

    removeSpeakupEvent(_eventAudience: eventAudience) {
        if (_eventAudience === null || _eventAudience === undefined || _eventAudience.$key === null || _eventAudience.$key === undefined) return null;
        return this.speakUpEventAudienace$.remove(_eventAudience.$key)
            .then(_ => console.log('success'))
            .catch(error => console.log(error));
    }

    private errorHandler(error) {
        console.log(error);
        return Observable.throw(error.message);
    }


}

