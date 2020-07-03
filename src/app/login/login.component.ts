import {Component, NgZone, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../classez/classez.module";

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    model: User = new User();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient
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
