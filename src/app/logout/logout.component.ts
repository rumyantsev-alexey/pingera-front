import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: []
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    sessionStorage.setItem('token', '');
    sessionStorage.clear()
    delay(2000)
    this.router.navigate(['']);
  }

}
