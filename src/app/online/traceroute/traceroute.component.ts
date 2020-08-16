import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-traceroute',
  templateUrl: './traceroute.component.html',
  styleUrls: ['./traceroute.component.css'],
})

export class TracerouteComponent implements OnInit {

  host: string
  traceroute: string

  constructor(
    private http: HttpClient,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  onTraceToString(modal) {
    this.http.get<string>('http://localhost:8080/rest/traceroutetostring?host=' + this.host)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((p) => {
        this.traceroute = p
        this.traceroute.replace("<br>", "/n")
        this.modalService.open(modal, { centered: true, size: "lg"})
      })
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      '(TracerouteComponent) Проблемы на стороне сервера. Проверьте Интернет или запустили ли вы серверную часть приложения.')
  }

}
