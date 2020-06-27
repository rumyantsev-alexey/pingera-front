import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TaskDto} from "../classez/classez.module";
import {Router} from "@angular/router";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {
  newtask: TaskDto;

  constructor(private http: HttpClient, private  router: Router) { }

  ngOnInit(): void {
    this.newtask = new TaskDto()
  }

  onSubmited(ntask) {
    let headers: HttpHeaders = new HttpHeaders({'Authorization': 'Basic ' + sessionStorage.getItem('token')})

    this.http.post<TaskDto>('http://localhost:8080/posttask', this.newtask, {headers})
      .subscribe()
    ntask.reset()
    delay(1000)
    this.router.navigate(['list']);

  }

}
