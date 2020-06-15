import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskDto} from "../classez/classez.module";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit{
  tasks: TaskDto[] = []
  tools: string[] = ["ping", "traceroute"]

  constructor(private http: HttpClient) {
 }

  ngOnInit() {
    this.http.get<TaskDto[]>('http://localhost:8080/getall')
      .subscribe(t => {
        this.tasks = t
      })
    console.log(this.tasks)
  }

}
