import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UsersessionService} from "../usersession/usersession.service";

@Component({
  selector: 'logout',
  template: ''
})

export class LogoutComponent implements OnInit {

  constructor(
    private router:Router,
    private US: UsersessionService
  ) { }

  ngOnInit(): void {
    this.US.delLoginUser()
    this.router.navigate(['']);
  }

}
