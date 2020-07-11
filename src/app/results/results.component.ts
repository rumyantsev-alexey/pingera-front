import { Component, OnInit } from '@angular/core';
import {SubTaskDto, Task} from "../classez/classez.module";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  CompleteTasks: Task[] = []
  CompleteSubTasks: SubTaskDto[] = []
  curTask: Task = new Task()

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllTasks()
  }

  getAllTasks() {
    if (sessionStorage.getItem('token') != null) {
      let headers: HttpHeaders = new HttpHeaders({'Authorization': 'Basic ' + sessionStorage.getItem('token')})

      this.http.get<Task[]>('http://localhost:8080/getallcompletetasksforauthuser', {headers})
        .subscribe(t => {
          this.CompleteTasks = t
        })
    }
  }

 openModalWindows(modal, task: Task) {
    this.curTask = task
    if (sessionStorage.getItem('token') != null) {
      let headers: HttpHeaders = new HttpHeaders({'Authorization': 'Basic ' + sessionStorage.getItem('token')})
      this.http.get<SubTaskDto[]>('http://localhost:8080/getallcompletesubtasksfortask/' + task.id, {headers})
        .subscribe( st =>
          this.CompleteSubTasks = st
        )
     }
    this.modalService.open(modal, { centered: true})
  }

  deleteTask(id: number) {
    let headers: HttpHeaders = new HttpHeaders({'Authorization': 'Basic ' + sessionStorage.getItem('token')})
    this.http.delete<void>('http://localhost:8080/deletetask/' + id, {headers})
      .subscribe(() => this.CompleteTasks = this.CompleteTasks.filter(t => t.id !== id))
  }

  openModalModalWindows(modal2) {
    if (sessionStorage.getItem('token') != null) {
      let headers: HttpHeaders = new HttpHeaders({'Authorization': 'Basic ' + sessionStorage.getItem('token')})
      this.http.get<SubTaskDto[]>('http://localhost:8080/getallcompletesubtasksfortask/' + this.curTask.id, {headers})
        .subscribe( st => {
            this.CompleteSubTasks = st
            console.log(this.CompleteSubTasks)
          }
        )
    }
    this.modalService.open(modal2, { centered: true})
  }

}
