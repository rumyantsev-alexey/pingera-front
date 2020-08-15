import {Injectable, OnInit} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";
import {User} from "../classez/classez.module";

@Injectable({
  providedIn: "root"
})
export class UsersessionService implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
   }

  public getUserName() {
    let result = 'none'
    let res = sessionStorage.getItem('tokena')
    if (res != null) {
      res= atob(res)
      result = res.substring(0, res.search(':'))
    }
    return result;
  }

  public setToken(name: string, pass: string) {
     sessionStorage.setItem('tokena', btoa(name + ':' + pass))
  }

  public setProp(lastemail: string, lastchat: string) {
    sessionStorage.setItem('lastemaila', lastemail)
    sessionStorage.setItem('lastchata', lastchat)
  }

  public getUser(): User {
    let result: User = new User()
    if (this.isLogin()) {
      result.name = atob(sessionStorage.getItem('tokena')).substring(0, atob(sessionStorage.getItem('tokena')).search(':'))
      result.lastemail = sessionStorage.getItem('lastemaila')
      result.lastchatid = sessionStorage.getItem('lastchata')
    }
    return result
  }

  public getAuthHeader(): HttpHeaders {
    let result: HttpHeaders = null
    if (this.isLogin()) {
      result = new HttpHeaders({'Authorization': 'Basic ' + sessionStorage.getItem('tokena')})
    }
    return result;
  }

  public delLoginUser() {
    sessionStorage.clear()
  }

  public isLogin() {
    return sessionStorage.getItem('tokena') != null
  }


  // todo последние емейл и чатайди получать
}
