import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "../classez/classez.module";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit{
  tasks: Task[] = []
  textheader: string
  textbody:string

  constructor(private http: HttpClient, private modalService: NgbModal) {
  }

  ngOnInit() {
  this.getAllTasks()
  }

  getTask(id: number) {
    this.http.get<Task[]>('http://localhost:8080/getalltasks' + id)
      .subscribe(t => {
        this.tasks = t
      })
  }

  deleteTask(id: number) {
    this.http.delete<void>('http://localhost:8080/deletetask/' + id)
      .subscribe(() => this.tasks = this.tasks.filter(t => t.id !== id))
  }


  getAllTasks() {
    this.http.get<Task[]>('http://localhost:8080/getalltasks')
      .subscribe(t => {
        this.tasks = t
      })
  }

  test(modal, textheader: string, textbody:string) {
    this.textheader = textheader
    this.textbody = textbody
    this.modalService.open(modal, { centered: true})
  }
}
