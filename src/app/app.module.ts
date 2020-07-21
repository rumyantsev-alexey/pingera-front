import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './listtask/list.component';
import { NewtaskComponent } from './newtask/newtask.component';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PingComponent } from './online/ping/ping.component';
import { TracerouteComponent } from './online/traceroute/traceroute.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NewuserComponent } from './newuser/newuser.component';
import { ResultsComponent } from './results/results.component';
import { EdituserComponent } from './edituser/edituser.component';

const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'online', component: PingComponent},
  { path: 'online/ping', component: PingComponent},
  { path: 'online/traceroute', component: TracerouteComponent},
  { path: 'list', component: ListComponent},
  { path: 'newtask', component: NewtaskComponent},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent},
  { path: 'newuser', component: NewuserComponent},
  { path: 'edituser', component: EdituserComponent},
  { path: 'results', component: ResultsComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    NewtaskComponent,
    HomeComponent,
    PingComponent,
    TracerouteComponent,
    LoginComponent,
    LogoutComponent,
    NewuserComponent,
    ResultsComponent,
    EdituserComponent
  ],
  entryComponents: [
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule
    ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule {
}
