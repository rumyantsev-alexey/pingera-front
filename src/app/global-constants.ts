import {Injectable, OnInit} from "@angular/core";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: "root"
})
export class GlobalConstants{
  cuName: string = localStorage.getItem("userName")

  constructor(private http:HttpClient) {
    console.log("Constuct GC...")
  }

  public getCuName(): Observable<string> {
    let url = 'http://localhost:8080/user';

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + sessionStorage.getItem('token')
    });

    let options = { headers: headers };

    this.http.post<Observable<Object>>(url, {}, options).
    subscribe(principal => {
        localStorage.setItem("userName",principal['name'])
      },
      error => {
        if(error.status == 401)
          alert('Unauthorized');
      }
    );
    this.cuName = localStorage.getItem("userName")
    return of<string>(this.cuName);
  }


  logout() {
    sessionStorage.setItem('token', '');
  }

}
