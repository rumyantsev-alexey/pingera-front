import {Component, OnInit} from '@angular/core';
import {UsersessionService} from "./usersession/usersession.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  public UserName: string

  constructor(public  US:UsersessionService) {
    console.log("Constuct App...")
 }

  ngOnInit() {
    console.log("ngOnInit App...")
    this.UserName = this.US.getUserName()
    console.log("(App) Change cuName value on",this.US.getUserName())
  }
}
