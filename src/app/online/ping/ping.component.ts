import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Ping} from "../../classez/classez.module";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";

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

  constructor(
    private http: HttpClient,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  onPingToString(modal) {
    this.textheader = 'Host:' + this.host + ' count:' + this.count
    this.http.get<string>('http://localhost:8080/rest/pingtostring?host=' + this.host + '&count=' + this.count)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((p) => {
          this.pings = p
          this.modalService.open(modal, { centered: true, size: "lg"})
          this.count = 4
      })
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      '(PingComponent) Проблемы на стороне сервера. Проверьте Интернет или запустили ли вы серверную часть приложения.')
  }

}
