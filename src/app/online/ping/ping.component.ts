import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ping} from "../../classez/classez.module";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.css']
})
export class PingComponent implements OnInit {
  host:string
  count: number = 4
  ping: Ping[]

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  onPing(modal) {
    this.http.get<Ping[]>('http://localhost:8080/rest/ping?host=' + this.host + '&count=' + this.count)
      .subscribe((p) => {
        if (p != null) {
          this.ping = p
        }
        this.modalService.open(modal, { centered: true})
      })
  }
}
