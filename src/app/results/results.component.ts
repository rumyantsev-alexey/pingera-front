import { Component, OnInit } from '@angular/core';
import {SubTask, Task, TaskDto} from "../classez/classez.module";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  CompleteTasks: Task[] = []
  CompleteSubTasks: SubTask[] = []
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
      this.http.get<SubTask[]>('http://localhost:8080/getallcompletesubtasksfortask/' + task.id, {headers})
        .subscribe( st =>
          this.CompleteSubTasks = st
        )
     }
    this.modalService.open(modal, { centered: true})
  }
}
