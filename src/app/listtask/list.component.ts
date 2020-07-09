import {Component, OnInit, TemplateRef} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SubTask, Task} from "../classez/classez.module";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit{
  tasks: Task[] = []
  currTask: Task = new Task()
  CompleteSubTasks: SubTask[] = []

  constructor(private http: HttpClient, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.getAllTasks()
  }

  deleteTask(id: number) {
    let headers: HttpHeaders = new HttpHeaders({'Authorization': 'Basic ' + sessionStorage.getItem('token')})
    this.http.delete<void>('http://localhost:8080/deletetask/' + id, {headers})
      .subscribe(() => this.tasks = this.tasks.filter(t => t.id !== id))
  }


  getAllTasks() {
    if (sessionStorage.getItem('token') != null) {
      let headers: HttpHeaders = new HttpHeaders({'Authorization': 'Basic ' + sessionStorage.getItem('token')})

      this.http.get<Task[]>('http://localhost:8080/getalltasksforauthuser', {headers})
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
    if (sessionStorage.getItem('token') != null) {
      let headers: HttpHeaders = new HttpHeaders({'Authorization': 'Basic ' + sessionStorage.getItem('token')})
      this.http.get<SubTask[]>('http://localhost:8080/getallcompletesubtasksfortask/' + this.currTask.id, {headers})
        .subscribe( st =>
          this.CompleteSubTasks = st
        )
    }
     this.modalService.open(modal2, { centered: true})
  }
}