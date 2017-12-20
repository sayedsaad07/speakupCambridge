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
        //this.speakUpEventAudienace$ = this.db.list('speakUpEventAudienace');

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
        this.speakUpEventAudienace$ = this.db.list('/speakUpEventAudienace', {
            query: {
                orderByChild: 'eventkey',
                equalTo: eventKey
            }
        });
        return this.speakUpEventAudienace$;
        //.map(_tasks => _tasks.filter(t => t.eventkey === eventKey))
        //.catch(this.errorHandler);
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
    
    removeAllSpeakers(_eventAudiencekey: string) {

        ////this.speakUpEventAudienace$;
        ////    .map(_tasks => {
        ////});
        ////.catch(this.errorHandler);
        //let ref = this.db.database.ref('/speakUpEventAudienace');
        //var query = ref.orderByChild('eventkey').equalTo(_eventAudiencekey);
        //query.ref.remove().then(() => console.log('removed all speakers of event' + _eventAudiencekey))
        //    .catch((error) => console.log(error));

        //ref.forEach(function (snapshot) {
        //    snapshot.refere
        //});
        //this.speakUpEventAudienace$.remove(ref);

        //// Query the list for the purposes of this example:
        //list.subscribe((items) => {

        //    // Remove the matching item:
        //    if (items.length) {
        //        for (var i = 0; i < items.length; i++) {
        //            console.log("remove item " + items[i].$key + "event " + items[i].eventkey + "topic " + items[i].topic )
        //            if (items[i].eventkey === _eventAudiencekey) {
        //                list.remove(items[i].$key)
        //                    .then(() => console.log('removed ' + items[0].$key))
        //                    .catch((error) => console.log(error));
        //            }
        //        }

        //    }
        //});
    }
    private errorHandler(error) {
        console.log(error);
        return Observable.throw(error.message);
    }


}

