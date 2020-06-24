import {Component, OnInit} from '@angular/core';
import {GlobalConstants} from "./global-constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  public UserName: string

  constructor(public  Gl:GlobalConstants) {
    console.log("Constuct App...")
 }

  ngOnInit() {
    console.log("ngOnInit App...")
    localStorage.setItem("cuName",null)
    localStorage.setItem("cuPassword",null)
    this.Gl.getCuName().subscribe((str) => {
      this.UserName = str
      console.log("(App) Change cuName value on",str)
    })
  }
}
