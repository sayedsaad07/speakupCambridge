/////<reference path="" />

import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import 'rxjs/add/operator/take'

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
    public showme: boolean = true;
    private age: number = 30;
    public title: String | Number;
    constructor(private db: AngularFireDatabase) {
        const observable = this.db.object('name');
        observable
            .take(2)
            .subscribe(
            next => {
                console.log('next', next);
                //this.title = next;
            },
            error => console.log('error', error),
            () => console.log('done')
        );
    }
    startGame() {
        console.log("click start game");
        this.age = 300;
        if (this.age === null || this.age === undefined)
        {
            console.log("age is undefined");
        }
        let calcage = (a: number, b: number) => { return (a + b) };
        let myage: number = calcage(30, 4);
        let message: string = "start your game. your age is " + myage;
        let buttonelm: HTMLElement = document.getElementById("showtitle");
        buttonelm.innerText = message ;


    }
    ngOnInit() {
        this.title = "Barber Now";
        
        document.getElementById("showtitle").addEventListener('click', this.startGame);
    }



}
