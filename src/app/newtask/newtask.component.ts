import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Task} from "../classez/classez.module";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {

  newTaskForm: FormGroup
  visibleOption: boolean
  tools: string[]
  toolHeadlers: string[]

  constructor(private http: HttpClient, private  router: Router) { }

  ngOnInit(): void {
    this.visibleOption = false

    if (sessionStorage.getItem('token') != null ) {
      let headers: HttpHeaders = new HttpHeaders({'Authorization': 'Basic ' + sessionStorage.getItem('token')})
      this.http.get<string[]>('http://localhost:8080/gettools',  {headers})
        .subscribe( (s) => this.tools = s )
      this.http.get<string[]>('http://localhost:8080/gettoolhandlers',  {headers})
        .subscribe( (s) => this.toolHeadlers = s )
    }

    this.newTaskForm = new FormGroup({
      cnt: new FormControl(2,[
        Validators.required
      ]),
      date1: new FormControl(new Date(new Date().getTime() + (2 * 60 * 1000)),[
        Validators.required
      ]),
      name1: new FormControl(null,[
        Validators.required
      ]),
      packetsize: new FormControl(32,[
        Validators.required
      ]),
      sellist1: new FormControl("ping",[
        Validators.required
      ]),
      sellist2: new FormControl("hrs",[
        Validators.required
      ]),
      sellist3: new FormControl("result=all",[
        Validators.required
      ]),
      sellist4: new FormControl("email",[
        Validators.required
      ]),
      text2: new FormControl(null,[
        Validators.required
      ]),
      text3: new FormControl(1,[
        Validators.required
      ]),
      text4: new FormControl(null),

      account: new FormControl(true,[
        Validators.required
      ]),
      timeout: new FormControl(53,[
        Validators.required
      ]),
      ttl: new FormControl(53,[
        Validators.required
      ]),
      total: new FormControl(2,[
        Validators.required
      ])
    })
  }

  onSubmited() {
    if (sessionStorage.getItem('token') != null ) {
      let headers: HttpHeaders = new HttpHeaders({'Authorization': 'Basic ' + sessionStorage.getItem('token')})

      this.http.post<Task>('http://localhost:8080/posttask', this.newTaskForm.value, {headers})
        .subscribe()
      this.newTaskForm.reset()
      this.router.navigate(['list']);
    }   }

  clickOptions() {
    this.visibleOption=!this.visibleOption
  }
}
