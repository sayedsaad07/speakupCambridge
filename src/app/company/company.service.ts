import { Injectable } from '@angular/core';
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class CompanyService {
    company$: FirebaseObjectObservable<any>;


    constructor(private db: AngularFireDatabase) {
        this.company$ = this.db.object('company');
    }

    AddCompany(company) {
        this.company$.set(company);
    }
    editCompany(company) {
        this.company$.update({phone: 7812280005});
    }
    removeCompany(company) {
        this.company$.remove();
    }
}
