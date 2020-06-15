import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskDto} from "../classez/classez.module";

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmited(ntask) {
    let newtask: TaskDto = new TaskDto()
    newtask.name1=ntask.form.value.name1
    newtask.cnt = ntask.form.value.cnt
    newtask.date1 = ntask.form.value.date1
    newtask.packetsize = ntask.form.value.packetsize
    newtask.sellist1 = ntask.form.value.sellist1
    newtask.sellist2 = ntask.form.value.sellist2
    newtask.sellist3 = ntask.form.value.sellist3
    newtask.sellist4 = ntask.form.value.sellist4
    newtask.text2 = ntask.form.value.text2
    newtask.text3 = ntask.form.value.text3
    newtask.text4 = ntask.form.value.text4
    newtask.timeout = ntask.form.value.timeout
    newtask.ttl = ntask.form.value.ttl
    console.log(newtask)
  }
}
