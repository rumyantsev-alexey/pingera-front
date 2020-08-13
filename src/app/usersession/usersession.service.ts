import {Injectable, OnInit} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";

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
    console.log(name)
    sessionStorage.setItem('tokena', btoa(name + ':' + pass))
    console.log(sessionStorage.getItem('tokena'))
    console.log(this.getUserName())
  }

  public getAuthHeader(): HttpHeaders {
    let result: HttpHeaders = null
    if (sessionStorage.getItem('tokena') != null ) {
      result = new HttpHeaders({'Authorization': 'Basic ' + sessionStorage.getItem('tokena')})
    }
    return result;
  }

  public delLoginUser() {
    sessionStorage.clear()
  }

}
