import { Component, OnInit } from '@angular/core';
import {SubTaskDto, Task} from "../classez/classez.module";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UsersessionService} from "../usersession/usersession.service";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  CompleteTasks: Task[] = []
  CompleteSubTasks: SubTaskDto[] = []
  curTask: Task = new Task()

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private US: UsersessionService
  ) { }

  ngOnInit(): void {
    this.getAllTasks()
  }

  getAllTasks() {
    if (this.US.isLogin()) {
      let headers: HttpHeaders = this.US.getAuthHeader()

      this.http.get<Task[]>('http://localhost:8080/getallcompletetasksforauthuser', {headers})
        .pipe(
          catchError(this.handleError)
        )
        .subscribe(t => {
          this.CompleteTasks = t
        })
    }
  }

 openModalWindows(modal, task: Task) {
    this.curTask = task
    if (this.US.isLogin()) {
      let headers: HttpHeaders =this.US.getAuthHeader()
      this.http.get<SubTaskDto[]>('http://localhost:8080/getallcompletesubtasksfortask/' + task.id, {headers})
        .pipe(
          catchError(this.handleError)
        )
        .subscribe( st =>
          this.CompleteSubTasks = st
        )
     }
    this.modalService.open(modal, { centered: true})
  }

  deleteTask(id: number) {
    let headers: HttpHeaders = this.US.getAuthHeader()
    this.http.delete<void>('http://localhost:8080/deletetask/' + id, {headers})
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(() => this.CompleteTasks = this.CompleteTasks.filter(t => t.id !== id))
  }

  openModalModalWindows(modal2) {
    if (this.US.isLogin()) {
      let headers: HttpHeaders = this.US.getAuthHeader()
      this.http.get<SubTaskDto[]>('http://localhost:8080/getallcompletesubtasksfortask/' + this.curTask.id, {headers})
        .pipe(
          catchError(this.handleError)
        )
        .subscribe( st => {
            this.CompleteSubTasks = st
            console.log(this.CompleteSubTasks)
          }
        )
    }
    this.modalService.open(modal2, { centered: true})
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      '(ResultsComponent) Проблемы на стороне сервера. Проверьте Интернет или запустили ли вы серверную часть приложения.')
  }

}
