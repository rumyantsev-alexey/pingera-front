import { Component, OnInit } from '@angular/core';
import {User} from "../classez/classez.module";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

  user: User = new User()

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  validSave() {
    let headers: HttpHeaders = new HttpHeaders({'Authorization': 'Basic ' + sessionStorage.getItem('token')})
    this.http.post<Observable<void>>('http://localhost:8080/adduser', this.user, {headers}
    ).subscribe()
      return true;
  }

  cancelNewUser() {
    this.router.navigate(['login'])
  }
}
