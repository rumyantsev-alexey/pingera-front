import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UsersessionService} from "../usersession/usersession.service";
import {User} from "../classez/classez.module";

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup
  loginUser: boolean

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private http: HttpClient,
      private modalService: NgbModal,
      private US:UsersessionService
  )
  { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      pass: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    })
    this.loginUser = sessionStorage.getItem('token') != null
  }

  login() {
      this.http.post<User>('http://localhost:8080/login', {
        name: this.loginForm.value.name,
        password: this.loginForm.value.pass
      }).subscribe(x => {
         if (x != null ) {
           this.US.setToken(this.loginForm.value.name, this.loginForm.value.pass)
           this.US.setProp(x.lastemail, x.lastchatid)
           this.router.navigate(['']);
         } else {
            alert("(login) Authentication failed.")
          }
      });
  }
}
