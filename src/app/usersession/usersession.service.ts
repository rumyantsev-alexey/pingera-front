import {User} from "../classez/classez.module";
import {Injectable, OnInit} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UsersessionService implements OnInit {

  User: User = new User()

  constructor(private http: HttpClient) {
    this.User = new User()
    if (sessionStorage.getItem('uuser') != null) {
      this.User = JSON.parse(sessionStorage.getItem('uuser'))
    } else {
      this.User = new User()
      this.User.name = "none"
      this.User.password = "none"
    }
  }

  ngOnInit(): void {
   }

  public getUser(): User {
    return this.User
  }

}
