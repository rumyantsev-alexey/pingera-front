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
 }

  ngOnInit() {
    this.UserName = this.US.getUser().name
  }
}
