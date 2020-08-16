import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Task} from "../classez/classez.module";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersessionService} from "../usersession/usersession.service";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {

  newTaskForm: FormGroup
  visibleOption: boolean
  tools: string[]
  toolHeadlers: string[]

  constructor(
    private http: HttpClient,
    private  router: Router,
    private US: UsersessionService
  ) { }

  ngOnInit(): void {
    this.goAll()
  }

  goAll() {
    if (this.US.isLogin()) {
      this.visibleOption = false

      let headers: HttpHeaders = this.US.getAuthHeader()
      this.http.get<string[]>('http://localhost:8080/gettools', {headers})
        .pipe(
          catchError(this.handleError)
        )
        .subscribe((s) => this.tools = s)
      this.http.get<string[]>('http://localhost:8080/gettoolhandlers', {headers})
        .pipe(
          catchError(this.handleError)
        )
        .subscribe((s) => this.toolHeadlers = s)

      // todo обработка ошибок га сервере


      this.newTaskForm = new FormGroup({
        cnt: new FormControl(2, [
          Validators.required
        ]),
        date1: new FormControl(new Date(new Date().getTime() + (2 * 60 * 1000)), [
          Validators.required
        ]),
        name1: new FormControl(null, [
          Validators.required
        ]),
        packetsize: new FormControl(32, [
          Validators.required
        ]),
        sellist1: new FormControl("ping", [
          Validators.required
        ]),
        sellist2: new FormControl("hrs", [
          Validators.required
        ]),
        sellist3: new FormControl('result=all', [
          Validators.required
        ]),
        sellist4: new FormControl("email", [
          Validators.required
        ]),
        text2: new FormControl(null, [
          Validators.required
        ]),
        text3: new FormControl(1, [
          Validators.required
        ]),
        text4: new FormControl({value: this.US.getUser().lastemail, disabled: true}),

        account: new FormControl(true, [
          Validators.required
        ]),
        timeout: new FormControl(53, [
          Validators.required
        ]),
        ttl: new FormControl(53, [
          Validators.required
        ]),
        total: new FormControl(2, [
          Validators.required
        ])
      })
    }
  }

  onSubmited() {
    let headers: HttpHeaders = this.US.getAuthHeader()

    this.http.post<Task>('http://localhost:8080/posttask', this.newTaskForm.value, {headers})
      .pipe(
        catchError(this.handleError)
      )
      .subscribe()

    switch(this.newTaskForm.get('sellist4').value) {
      case 'email': {
        this.US.setProp(this.newTaskForm.get('text4').value, sessionStorage.getItem('lastchata'))
        break;
      }
      case 'telegramm': {
        this.US.setProp(sessionStorage.getItem('lastemaila'), this.newTaskForm.get('text4').value)
        break;
      }
      default: {
        break;
      }
    }
    this.newTaskForm.reset()
    this.router.navigate(['list']);
   }

  clickOptions() {
    this.visibleOption=!this.visibleOption
  }

  onChange() {
    if (this.newTaskForm.get('account').value) {
      this.newTaskForm.get('text4').disable();
    } else {
      this.newTaskForm.get('text4').enable();
    }
  }

  onChangeResult() {
    let res: string
    switch(this.newTaskForm.get('sellist4').value) {
      case 'email': {
        res = this.US.getUser().lastemail
        break;
      }
      case 'telegramm': {
        res = this.US.getUser().lastchatid
        break;
      }
      default: {
        break;
      }
    }
    this.newTaskForm.patchValue({
      text4: res
    });
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      '(NewtaskComponent) Проблемы на стороне сервера. Проверьте Интернет или запустили ли вы серверную часть приложения.')
  }
}
