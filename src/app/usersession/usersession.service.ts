import {User} from "../classez/classez.module";
import {Injectable, OnInit} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UsersessionService implements OnInit {

  User: User = new User()

  constructor(private http: HttpClient) {
    console.log("construct US...")
    this.User = new User()
    if (sessionStorage.getItem('token') != null) {
      this.User.name = atob(sessionStorage.getItem('token')).split(':')[0]
      this.User.password = atob(sessionStorage.getItem('token')).split(':')[1]
    } else {
      this.User.name = "none"
      this.User.password = "none"
    }
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

  public getFullUser(): User {
    return this.User
  }

  public isExist(): boolean {
    return this.User != null && this.User.name.length > 0
  }

}
