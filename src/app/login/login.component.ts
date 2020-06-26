import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserDto} from "../classez/classez.module";
import {UsersessionService} from "../usersession/usersession.service";

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
    )
    { }

    ngOnInit() {
    }

    login() {
        console.log(this.model)
        let url = 'http://localhost:8080/login';
        this.http.post<Observable<boolean>>(url, {
            name: this.model.name,
            password: this.model.password
        }).subscribe(isValid => {
            console.log('LOGIN:', isValid)
            if (isValid) {
                sessionStorage.setItem('token', btoa(this.model.name + ':' + this.model.password));
                this.router.navigate(['']);
            } else {
                alert("Authentication failed.")
            }
        });
    }
}
