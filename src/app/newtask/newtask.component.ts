import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskDto} from "../classez/classez.module";

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {
  newtask: TaskDto;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.newtask = new TaskDto()
  }

  onSubmited(ntask) {
     this.http.post<TaskDto>('http://localhost:8080/posttask', this.newtask)
      .subscribe()
    ntask.reset()
  }

}
