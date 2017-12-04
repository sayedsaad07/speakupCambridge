import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
    @Input() name: string="SECOSOFT";
    company: FirebaseObjectObservable<any>;


    constructor(private db: AngularFireDatabase) {
        this.company = this.db.object('company');
    }

  ngOnInit() {
  }

}
