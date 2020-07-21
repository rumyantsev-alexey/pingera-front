import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
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
  currentUser: User

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
    this.currentUser = new User()
  }

  login() {
      this.http.post<User>('http://localhost:8080/getuser', {
          name: this.loginForm.value.name,
          password: this.loginForm.value.pass
      }).subscribe(x => {
         if (x != null) {
           this.currentUser = x
           sessionStorage.setItem('token', btoa(this.loginForm.value.name + ':' + this.loginForm.value.pass))
           sessionStorage.setItem('uuser', JSON.stringify(this.currentUser))
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

  viewUser(modal) {
    if (sessionStorage.getItem('token') != null) {
      this.currentUser = this.US.getUser()
      this.modalService.open(modal, { centered: true})
    }
  }

  editUser() {
    this.router.navigate(['edituser'])
  }
}
