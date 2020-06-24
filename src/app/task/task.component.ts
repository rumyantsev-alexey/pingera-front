import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Task} from "../classez/classez.module";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private modalService: NgbModal, private http: HttpClient) { }

  ngOnInit(): void {
  }

  onAddReader(modal) {
    this.modalService.open(modal, { centered: true });
  }

  showTask(id: number) {
    this.http.get<Task>('http://localhost:8080/gettask/' + id)
      .subscribe( task => {

      })
  }
}
