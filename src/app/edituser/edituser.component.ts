import { Component, OnInit } from '@angular/core';
import {User} from "../classez/classez.module";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UsersessionService} from "../usersession/usersession.service";

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
})
export class EdituserComponent implements OnInit {

  // todo избавиться от User
  user: User
  newUserForm: FormGroup


  constructor(
    private router: Router,
    private http: HttpClient,
    private US:UsersessionService

  ) { }

  ngOnInit(): void {
    this.user = this.US.getUser()
    this.newUserForm = new FormGroup({
      name: new FormControl({value: this.user.name, disabled: true}, Validators.required),
      pass: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email
      ]),
      chatid: new FormControl(this.user.chatid)
    })

  }


  validSave() {
    let headers: HttpHeaders = new HttpHeaders({'Authorization': 'Basic ' + sessionStorage.getItem('token')})

//todo password dont send in newUserForm

    this.user.name = this.US.getUser().name
    this.user.password = this.newUserForm.value.pass

    this.user.email = this.newUserForm.value.email
    this.user.chatid = this.newUserForm.value.chatid

    this.http.post<Observable<void>>('http://localhost:8080/modifyuser', this.user, {headers}
    )
      .pipe(
        catchError(this.handleError)
      )
      .subscribe()
    sessionStorage.setItem('uuser', JSON.stringify(this.user))
    this.router.navigate(['login'])
  }

  cancelNewUser() {
    this.router.navigate(['login'])
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('(handleError) An error occurred:', error.error.message);
    } else {
      console.error(
        `(handleError) Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      '(handleError) Something bad happened; please try again later.');
  };

}

