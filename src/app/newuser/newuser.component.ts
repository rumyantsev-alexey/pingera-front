import { Component, OnInit } from '@angular/core';
import {User} from "../classez/classez.module";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

  // todo избавиться от User
  user: User
  newUserForm: FormGroup

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.user = new User()
    this.newUserForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      pass: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ])

    })
  }

  validSave() {
    let headers: HttpHeaders = new HttpHeaders({'Authorization': 'Basic ' + sessionStorage.getItem('token')})

//todo password dont send in newUserForm

    this.user.name = this.newUserForm.value.name
    this.user.password = this.newUserForm.value.pass

    this.user.email = this.newUserForm.value.email

    this.http.post<Observable<void>>('http://localhost:8080/adduser', this.user, {headers}
    ).subscribe()
  }

  cancelNewUser() {
    this.router.navigate(['login'])
  }
}
