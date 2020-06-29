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
  pings: string
  ping: Ping[]
  textheader: string

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  onPingToString(modal) {
    this.textheader = 'Host:' + this.host + ' count:' + this.count
    this.http.get<string>('http://localhost:8080/rest/pingtostring?host=' + this.host + '&count=' + this.count)
      .subscribe((p) => {
          this.pings = p
          this.modalService.open(modal, { centered: true, size: "lg"})
          this.count = 4
      })
  }
  onPing(modal) {
    this.textheader = 'Host:' + this.host + ' count:' + this.count
    this.http.get<Ping[]>('http://localhost:8080/rest/ping?host=' + this.host + '&count=' + this.count)
      .subscribe((p) => {
        this.ping = p
        this.modalService.open(modal, { centered: true, size: "lg"})
        this.count = 4
      })
  }

}
