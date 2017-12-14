import { Injectable } from '@angular/core';
import { FirebaseObjectObservable, FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { speakUpEvent } from "./speakUpEvent";
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class EventListService {

    eventList$: FirebaseListObservable<speakUpEvent[]>;
    speakUpEvent$: FirebaseObjectObservable<speakUpEvent>;
    userid: string;

    constructor(private db: AngularFireDatabase,
        private authService: AuthService) {

        this.authService.currentUser().subscribe(u => {
            this.eventList$ = this.db.list('eventList');
            //, query =>
            //    query.orderByChild("userid").equalTo(u.uid));
            //.map(_tasks => _tasks.filter(t => t.userid === u.uid));
            this.userid = u.uid;
        });
        console.log("user id " + this.userid);
        this.speakUpEvent$ = this.db.object('speakUpEvent');
    }

    getSpeakupEvent(enetkey: string) {
        return this.db.object(`eventList/${enetkey}`)
            .catch(this.errorHandler);
    }

    getSpeakupEventList() {
        return this.eventList$
            //.map(_tasks => _tasks.filter(t => t.userid === this.userid))
            .catch(this.errorHandler);
    }

    saveSpeakupEvent(speakUpEvent: speakUpEvent) {
        return this.eventList$.push(speakUpEvent)
            .then(_ => console.log('success'))
            .catch(error => console.log(error));
    }

    editSpeakupEvent(speakUpEvent: speakUpEvent) {
        return this.eventList$.update(speakUpEvent.$key, speakUpEvent)
            .then(_ => console.log('success'))
            .catch(error => console.log(error));
    }

    removeSpeakupEvent(speakupEvent: speakUpEvent) {
        if (speakupEvent === null || speakupEvent === undefined || speakupEvent.$key === null || speakupEvent.$key === undefined) return null;
        return this.eventList$.remove(speakupEvent.$key)
            .then(_ => console.log('success'))
            .catch(error => console.log(error));
    }

    private errorHandler(error) {
        console.log(error);
        return Observable.throw(error.message);
    }

}
