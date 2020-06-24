import {Injectable, OnInit} from "@angular/core";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: "root"
})
export class GlobalConstants{
  cuName: string = localStorage.getItem("cuName")
  cuPassword: string = localStorage.getItem("cuPassword")

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
        this.cuName = principal['name']
        this.cuPassword = principal['password']
        localStorage.setItem("cuName",this.cuName)
        localStorage.setItem("cuPassword",this.cuPassword)
      },
      error => {
        if(error.status == 401)
          alert('Unauthorized');
      }
    );
    return of<string>(this.cuName);
  }

}
