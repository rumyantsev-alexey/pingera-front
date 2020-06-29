﻿import {Component, NgZone, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserDto} from "../classez/classez.module";
import {UsersessionService} from "../usersession/usersession.service";
import {delay} from "rxjs/operators";

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    model: UserDto = new UserDto();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private zone: NgZone
    )
    { }

    ngOnInit() {
    }

    login() {
        this.http.post<Observable<boolean>>('http://localhost:8080/login', {
            name: this.model.name,
            password: this.model.password
        }).subscribe(isValid => {
           if (isValid) {
             sessionStorage.setItem('token', btoa(this.model.name + ':' + this.model.password))
             this.router.navigate([''])
            } else {
              alert("(login) Authentication failed.")
            }
        });
    }

  createNewUser() {
    this.router.navigate(['newuser'])
    }

}
