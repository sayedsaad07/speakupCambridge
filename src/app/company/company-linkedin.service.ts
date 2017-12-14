import { Injectable } from '@angular/core';
//import {
//    LinkedInService
//} from 'angular-linkedin-sdk';

@Injectable()
export class CompanyLinkedinService {
//    public isUserAuthenticated: boolean;
//    constructor(private _linkedInService: LinkedInService) { };

//    public subscribeToisInitialized() {
//        this._linkedInService.isInitialized$.subscribe({
//            next: (state) => {
//                // state will always return true when API finishes loading
//            },
//            complete: () => {
//                // Completed
//            }
//        });
//    }

//    ngOnInit() {
//        // Subscribe to any values the observable will emit about logged in state
//        this._linkedInService.isUserAuthenticated$.subscribe({
//            next: (state) => {
//                this.isUserAuthenticated = state;
//            }
//        });
//    }

//    public getApiKeyFromSdkIN(): string {
//        // Retrieve the API key used in the library through the SDK IN variable
//        return this._linkedInService.getSdkIN().ENV.auth.api_key;
        
//    }

//    public subscribeToLogin() {
//        this._linkedInService.login().subscribe({
//            next: (state) => {
//                // state will always return true when login completed 
//            },
//            complete: () => {
//                // Completed
//            }
//        });
//    }

//    public subscribeToLogout() {
//        this._linkedInService.logout().subscribe({
//            next: () => {
//                // does not emit a value 
//            },
//            complete: () => {
//                // Completed
//            }
//        });
//    }

//    public rawApiCall() {
//        const url = '/people/~?format=json';
//        this._linkedInService.raw(url)
//            .asObservable()
//            .subscribe({
//                next: (data) => {
//                    console.log(data);
//                },
//                error: (err) => {
//                    console.log(err);
//                },
//                complete: () => {
//                    console.log('RAW API call completed');
//                }
//            });
//    }

//    public refresh() {
//        this._linkedInService.refresh().subscribe({
//            next: (value) => {
//                console.log(`Refresh result: ${value}`);
//            },
//            complete: () => {
//                console.log('Refresh call completed');
//            }
//        });
//    }
}
