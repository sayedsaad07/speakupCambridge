//import 'hummerjs';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { firebaseConfig } from "environments/firebaseConfig";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from "app/shared/auth.service";
import { LoginUserComponent } from "app/login-user/login-user.component";
import { DisplayUserComponent } from "app/display-user/display-user.component";
import { RegisterUserComponent } from "app/register-user/register-user.component";
import { AlertModule } from "ngx-bootstrap";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./pages/home-page.component";
import { RegisterPageComponent } from "./pages/register-page.component";
import { AllInOnePageComponent } from "./pages/all-in-one-page.component";
import { LoginPageComponent } from "./pages/login-page.component";
import { LoggedInGuard } from "app/shared/logged-in-guard";
import { DashboardPageComponent } from './pages/dashboard-page.component';
import { AppTimerService } from './_shared/app-timer.service';
import { AddonTimerComponent } from './_shared/addon-timer/addon-timer.component'

//material design 2
//import { MaterialModule } from 'MaterialModule';//'@angular/material'
//import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
//import { FlexLayoutModule } from '@angular/flex-layout';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { TaskEditComponent , TodolistComponent, TodolistService } from './todolist/todolist.index';
//add SpeakUpCambridgeModule
//import { SpeakUpCambridgeModule } from './SpeakUpCambridge/speak-up-cambridge/speak-up-cambridge.module';
import { SpeakUpCambridgeHostComponent } from './SpeakUpCambridge/speak-up-cambridge/speak-up-cambridge-host/speak-up-cambridge-host.component';
import { EventListComponent, EventEditComponent, EventAttendeeComponent, EventListService } from  './SpeakUpCambridge/event-list.index';
import { EventAttendeeEditComponent } from './SpeakUpCambridge/event-attendee-edit/event-attendee-edit.component';

const routes: Routes = [
    { path: 'register', component: RegisterPageComponent },
    { path: 'all-in-one', component: AllInOnePageComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'dashboard', component: DashboardPageComponent, canActivate: [LoggedInGuard] },
    { path: 'app-todolist', component: TodolistComponent, canActivate: [LoggedInGuard] },
    {
        path: 'app-task-edit/:id', component: TaskEditComponent, canActivate: [LoggedInGuard]
    },
    {
        path: 'app-speak-up-cambridge-host', component: SpeakUpCambridgeHostComponent, canActivate: [LoggedInGuard]
    },
    { path: 'app-event-list', component: EventListComponent, canActivate: [LoggedInGuard] },
    { path: 'app-event-edit/:id', component: EventEditComponent, canActivate: [LoggedInGuard] },
    { path: '', component: HomePageComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        DisplayUserComponent,
        LoginUserComponent,
        RegisterUserComponent,
        ResetPasswordComponent,
        HomePageComponent,
        RegisterPageComponent,
        AllInOnePageComponent,
        LoginPageComponent,
        DashboardPageComponent,
        CompanyEditComponent,
        CompanyAddComponent,
        CompanyDetailComponent,
        TodolistComponent,
        TaskEditComponent,
        //speak-up feature
        SpeakUpCambridgeHostComponent,
        EventEditComponent,
        EventListComponent,
        EventAttendeeComponent,
        AddonTimerComponent,
        EventAttendeeEditComponent
        //EventListComponent,
        //EventEditComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AlertModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig, "barbernow"),
        AngularFireDatabaseModule,
        //MaterialModule,
        //BrowserAnimationsModule,
        //FlexLayoutModule,
        AngularFireAuthModule,
        RouterModule.forRoot(routes)
        //load speak up cambridge module
        //, SpeakUpCambridgeModule.forRoot()
    ],
    providers: [AuthService, LoggedInGuard, TodolistService
        , EventListService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
