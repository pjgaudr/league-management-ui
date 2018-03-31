import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatCheckbox, MatDatepicker } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  playerDisplayedColumns = ['name', 'email', 'position', 'availability', 'inviteStatus', 'checkbox'];
  playerDataSource = new MatTableDataSource(PLAYERS_ELEMENT_DATA);

  // gameDisplayedColumns = ['id', 'date', 'asked', 'in', 'out'];
  // gameDataSource = new MatTableDataSource(GAMES_ELEMENT_DATA);

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

const PLAYERS_ELEMENT_DATA = [
  {
    "id": 0,
    "firstname": "Patrick",
    "lastname": "Gaudreau",
    "email": "patrick.gaudreau@nnhl.com",
    "type": "regular",
    "position": "forward",
    "available": true,
    "inviteStatus": "Accepted"
  },
  {
    "id": 1,
    "firstname": "Eric",
    "lastname": "Zegers",
    "email": "eric.zegers@nnhl.com",
    "type": "regular",
    "position": "defenseman",
    "available": true,
    "inviteStatus": "Invited"
  },
  {
    "id": 2,
    "firstname": "Eric",
    "lastname": "Ladouceur",
    "email": "eric.ladouceur@nnhl.com",
    "type": "regular",
    "position": "forward",
    "available": false,
    "inviteStatus": "--"
  },
  {
    "id": 3,
    "firstname": "Benoit",
    "lastname": "Roy",
    "email": "benoit.roy@nnhl.com",
    "type": "spare",
    "position": "forward",
    "available": true,
    "inviteStatus": "--"
  },
  {
    "id": 4,
    "firstname": "Guy",
    "lastname": "Beausoleil",
    "email": "guy.beausoleil@nnhl.com",
    "type": "regular",
    "position": "goalie",
    "available": true,
    "inviteStatus": "Invited"
  },
  {
    "id": 5,
    "firstname": "Luc",
    "lastname": "Orsali",
    "email": "luc.orsali@nnhl.com",
    "type": "regular",
    "position": "goalie",
    "available": true,
    "inviteStatus": "Accepted"
  },
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