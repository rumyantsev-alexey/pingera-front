import { Component, OnInit } from '@angular/core';
import {UsersessionService} from "../usersession/usersession.service";

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  public UserName: string

  constructor(private US:UsersessionService) {
    console.log("Constuct Home...")
  }

    ngOnInit() {
      console.log("ngOnInit Home...")
      this.UserName = this.US.getUserName()
      console.log("(Home) Change cuName value on", this.US.getUserName())
    }
}
