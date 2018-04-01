import { Component, OnInit } from '@angular/core';
import { MatDatepicker, MatSort } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day == 5;
  }
  
  startDate = new Date(2017, 8, 1);
 
  constructor() { }

  ngOnInit() {
  }
}
