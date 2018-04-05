import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatCheckbox, MatDatepicker, MatSort } from '@angular/material';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {

  playerDisplayedColumns = ['name', 'email', 'position', 'available', 'inviteStatus', 'checkbox'];
  playerDataSource = new MatTableDataSource(REGULAR_PLAYERS_ELEMENT_DATA);
  spareDisplayedColumns = ['name', 'email', 'position', 'available', 'inviteStatus', 'checkbox'];
  spareDataSource = new MatTableDataSource(SPARE_PLAYERS_ELEMENT_DATA);

  @ViewChild(MatSort) sortRegular: MatSort;
  @ViewChild(MatSort) sortSpare: MatSort;
  
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day == 5;
  }  
  startDate = new Date(2017, 8, 1);

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.playerDataSource.sort = this.sortRegular;
    this.playerDataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'name': return item.lastname + "," + item.firstname;
        default: return item[property];
      }
    }

    this.spareDataSource.sort = this.sortSpare;
    this.spareDataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'name': return item.lastname + "," + item.firstname;
        default: return item[property];
      }
    }
  }
}
const REGULAR_PLAYERS_ELEMENT_DATA = [
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
    "firstname": "Guy",
    "lastname": "Beausoleil",
    "email": "guy.beausoleil@nnhl.com",
    "type": "regular",
    "position": "goalie",
    "available": true,
    "inviteStatus": "Invited"
  },
  {
    "id": 4,
    "firstname": "Luc",
    "lastname": "Orsali",
    "email": "luc.orsali@nnhl.com",
    "type": "regular",
    "position": "goalie",
    "available": true,
    "inviteStatus": "Accepted"
  },
];

const SPARE_PLAYERS_ELEMENT_DATA = [
  {
    "id": 10,
    "firstname": "Benoit",
    "lastname": "Roy",
    "email": "benoit.roy@nnhl.com",
    "type": "spare",
    "position": "forward",
    "available": true,
    "inviteStatus": "--"
  },
  {
    "id": 11,
    "firstname": "Matt",
    "lastname": "Bowen",
    "email": "matt.bowen@nnhl.com",
    "type": "spare",
    "position": "forward",
    "available": true,
    "inviteStatus": "--"
  }
];
