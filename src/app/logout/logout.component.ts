import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: []
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    sessionStorage.setItem('token', '');
    localStorage.setItem("cuName", null)
    localStorage.setItem("cuPassword", null)
    this.router.navigate(['']);
  }

}
