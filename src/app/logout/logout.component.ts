import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UsersessionService} from "../usersession/usersession.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: []
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
