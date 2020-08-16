import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {SubTaskDto, Task} from "../classez/classez.module";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UsersessionService} from "../usersession/usersession.service";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit{
  tasks: Task[] = []
  currTask: Task = new Task()
  CompleteSubTasks: SubTaskDto[] = []

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private  US: UsersessionService
  ) {}

  ngOnInit() {
    this.getAllTasks()
  }

  deleteTask(id: number) {
    let headers: HttpHeaders = this.US.getAuthHeader()
    this.http.delete<void>('http://localhost:8080/deletetask/' + id, {headers})
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(() => this.tasks = this.tasks.filter(t => t.id !== id))
  }


  getAllTasks() {
    if (this.US.isLogin()) {
      let headers: HttpHeaders = this.US.getAuthHeader()

      this.http.get<Task[]>('http://localhost:8080/getalltasksforauthuser', {headers})
        .pipe(
          catchError(this.handleError)
        )
        .subscribe(t => {
          this.tasks = t
        })
    }
  }

  openModalWindows(modal, task: Task) {
    this.currTask = task
    this.modalService.open(modal, { centered: true})
  }

  openModalModalWindows(modal2) {
    if (this.US.isLogin()) {
      let headers: HttpHeaders = this.US.getAuthHeader()
      this.http.get<SubTaskDto[]>('http://localhost:8080/getallcompletesubtasksfortask/' + this.currTask.id, {headers})
        .pipe(
          catchError(this.handleError)
        )
        .subscribe( st =>
          this.CompleteSubTasks = st
        )
    }
     this.modalService.open(modal2, { centered: true})
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      '(ListComponent) Проблемы на стороне сервера. Проверьте Интернет или запустили ли вы серверную часть приложения.')
  }
}
