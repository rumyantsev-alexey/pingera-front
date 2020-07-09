import {Component, NgZone, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private http: HttpClient
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
  }

  login() {
      this.http.post<Observable<boolean>>('http://localhost:8080/login', {
          name: this.loginForm.value.name,
          password: this.loginForm.value.pass
      }).subscribe(isValid => {
         if (isValid) {
           sessionStorage.setItem('token', btoa(this.loginForm.value.name + ':' + this.loginForm.value.pass))
           window.location.reload()
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
