import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { NewtaskComponent } from './newtask/newtask.component';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PingComponent } from './online/ping/ping.component';
import { TracerouteComponent } from './online/traceroute/traceroute.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'online', component: PingComponent},
  { path: 'online/ping', component: PingComponent},
  { path: 'online/traceroute', component: TracerouteComponent},
  { path: 'list', component: ListComponent},
  { path: 'newtask', component: NewtaskComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    NewtaskComponent,
    HomeComponent,
    NotFoundComponent,
    PingComponent,
    TracerouteComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
