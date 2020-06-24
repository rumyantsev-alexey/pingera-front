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
    this.Gl.getCuName().subscribe((str) => {
      this.UserName = str
      console.log("(App) Change cuName value on",str)
    })
  }
}
