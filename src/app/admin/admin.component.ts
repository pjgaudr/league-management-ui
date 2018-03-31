import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  playerDisplayedColumns = ['id', 'name', 'email', 'position'];
  playerDataSource = new MatTableDataSource(PLAYERS_ELEMENT_DATA);

  gameDisplayedColumns = ['id', 'date', 'asked', 'in', 'out'];
  gameDataSource = new MatTableDataSource(GAMES_ELEMENT_DATA);

  constructor() { }

  ngOnInit() {
  }

}

const PLAYERS_ELEMENT_DATA = [
  {
    "id": 0,
    "firstname": "Patrick",
    "lastname": "Gaudreau",
    "email": "patrick.gaudreau@gmail.com",
    "position": "FORWARD"
  }
];

const GAMES_ELEMENT_DATA = [
  {
    "id": 0,
    "date": "2017-09-01",
    "asked": 5,
    "in": 15,
    "out": 8
  },
  {
    "id": 1,
    "date": "2017-09-08",
    "asked": 0,
    "in": 0,
    "out": 0
  },
  {
    "id": 2,
    "date": "2017-09-15",
    "asked": 0,
    "in": 0,
    "out": 0
  }
];