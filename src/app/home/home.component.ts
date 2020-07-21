import { Component, OnInit } from '@angular/core';
import {UsersessionService} from "../usersession/usersession.service";

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  public UserName: string

  constructor(private US:UsersessionService) {
  }

    ngOnInit() {
      this.UserName = this.US.getUser().name
    }
}
