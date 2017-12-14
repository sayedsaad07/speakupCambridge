import { Component, OnInit } from '@angular/core';
import {
    CompanyLinkedinService
} from '../company-linkedin.service';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
    isUserAuthenticated: boolean;
    APIKey: string;
    constructor(private _CompanyLinkedinService: CompanyLinkedinService) { };

    ngAfterViewInit() {
        
    }
    ngOnInit() {
        //this._CompanyLinkedinService.ngOnInit();
        //this.isUserAuthenticated = this._CompanyLinkedinService.isUserAuthenticated;
        //this.APIKey = this._CompanyLinkedinService.getApiKeyFromSdkIN();

    }

    loginUser() {
        //this._CompanyLinkedinService.subscribeToLogin();
    }
}
