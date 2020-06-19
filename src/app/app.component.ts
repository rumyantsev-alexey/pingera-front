import {Component, OnInit} from '@angular/core';
import {GlobalConstants} from "./classez/global-constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public Gl:GlobalConstants) {
    console.log(Gl.cuName)
  }

  ngOnInit() {

  }
}
