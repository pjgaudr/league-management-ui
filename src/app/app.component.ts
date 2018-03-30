import { Component, OnInit, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit {

  title = 'Hockey League Management';

  constructor() {

  }


  ngOnInit() {
  }
  
}
