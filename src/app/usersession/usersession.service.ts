import {UserDto} from "../classez/classez.module";
import {Injectable, OnInit} from "@angular/core";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UsersessionService implements OnInit {

  User: UserDto = new UserDto()

  constructor(private http:HttpClient) {
  }

  ngOnInit(): void {
    this.User = new UserDto()
    if (sessionStorage.getItem('token') != null) {
      this.User.name = atob(sessionStorage.getItem('token')).split(':')[0]
      this.User.password = atob(sessionStorage.getItem('token')).split(':')[1]
    }
  }


  public setUserName(name:string) {
    this.User.name = name
  }

  public setUserPassword(pasword:string) {
    this.User.password = pasword
  }

  public getUserName(): string {
    return this.User.name
  }

  public getFullUser(): UserDto {
    return this.User
  }

  public isExist(): boolean {
    return this.User != null && this.User.name.length > 0
  }

  public getCuName(): Observable<string> {
    let url = 'http://localhost:8080/user';

    let headers: HttpHeaders = sessionStorage.getItem('token') != null ? new HttpHeaders({
      'Authorization': 'Basic ' + sessionStorage.getItem('token')
    }) : new HttpHeaders();

    let options = { headers: headers };

    this.http.post<Observable<Object>>(url, {}, options).
    subscribe(principal => {
        console.log('Principal:', principal)
        if (principal != null) {
          this.User.name = principal['name']
          this.User.password = principal['password']
          sessionStorage.setItem('token', btoa(this.User.name + ':' + this.User.password))
        }
      },
      error => {
        if(error.status == 401 && sessionStorage.getItem('token') != null) {
          alert('Unauthorized user')
          localStorage.clear()
        }
      }
    );
    return of<string>(this.User.name);
  }

}
