import { Component, OnInit } from '@angular/core';
import {UsersessionService} from "../usersession/usersession.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public  US:UsersessionService,
  ) {
  }

  ngOnInit(): void {
  }
}
