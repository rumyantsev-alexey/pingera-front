import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../global-constants";

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  public UserName: string

  constructor(private Gl:GlobalConstants) {
    console.log("Constuct Home...")
  }

    ngOnInit() {
      console.log("ngOnInit Home...")
      this.Gl.getCuName().subscribe((str) => {
        this.UserName = str
        console.log("(Home) Change cuName value on",str)
      })
    }
}
