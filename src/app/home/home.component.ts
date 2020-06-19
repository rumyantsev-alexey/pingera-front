import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {GlobalConstants} from "../classez/global-constants";

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, public Gl: GlobalConstants) { }

    ngOnInit() {
        let url = 'http://localhost:8080/user';

        let headers: HttpHeaders = new HttpHeaders({
            'Authorization': 'Basic ' + sessionStorage.getItem('token')
        });

        let options = { headers: headers };

        this.http.post<Observable<Object>>(url, {}, options).
            subscribe(principal => {
                this.Gl.cuName = principal['name']
            },
            error => {
                if(error.status == 401)
                    alert('Unauthorized');
            }
        );
    }

    logout() {
        sessionStorage.setItem('token', '');
        this.Gl.cuName = ''
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        return throwError(
          'Something bad happened; please try again later.');
      };
}
