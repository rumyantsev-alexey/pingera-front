import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "../classez/classez.module";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit{
  tasks: Task[] = []
  tools: string[] = ["ping", "traceroute"]

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<Task[]>('http://localhost:8080/getall')
      .subscribe(t => {
        this.tasks = t
      })
  }

  deleteTask(id: number) {
    this.http.delete<void>('http://localhost:8080/delete/' + id)
      .subscribe(() => this.tasks = this.tasks.filter(t => t.id !== id))
  }

}
