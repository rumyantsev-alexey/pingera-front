import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserDto} from "../classez/classez.module";

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    model: UserDto = new UserDto();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient
    )
    { }

    ngOnInit() {
        sessionStorage.setItem('token', '');
    }

    login() {
        let url = 'http://localhost:8080/login';
        this.http.post<Observable<boolean>>(url, {
            name: this.model.name,
            password: this.model.password
        }).subscribe(isValid => {
            if (isValid) {
                sessionStorage.setItem('token', btoa(this.model.name + ':' + this.model.password));
              localStorage.setItem("userName",this.model.name)
                this.router.navigate(['']);
            } else {
                alert("Authentication failed.")
            }
        });
    }
}
