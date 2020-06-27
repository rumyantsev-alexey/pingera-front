import {UserDto} from "../classez/classez.module";
import {Injectable, OnInit} from "@angular/core";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UsersessionService implements OnInit {

  User: UserDto = new UserDto()

  constructor(private http: HttpClient) {
    console.log("construct US...")
    this.User = new UserDto()
    if (sessionStorage.getItem('token') != null) {
      this.User.name = atob(sessionStorage.getItem('token')).split(':')[0]
      this.User.password = atob(sessionStorage.getItem('token')).split(':')[1]
    } else {
      this.User.name = "none"
      this.User.password = "none"
    }
    console.log(this.User)
  }

  ngOnInit(): void {
   }


  public setUserName(name: string) {
    this.User.name = name
  }

  public setUserPassword(pasword: string) {
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

}
