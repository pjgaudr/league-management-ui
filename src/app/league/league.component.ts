import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LeagueService } from '../league.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  league;
  subscription;

  userDisplayedColumns = ['id', 'name', 'email', 'position'];
  userDataSource = new MatTableDataSource(USERS_ELEMENT_DATA);

  gameDisplayedColumns = ['id', 'date']
  gameDataSource = new MatTableDataSource(GAMES_ELEMENT_DATA);
  
  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService
  )
  { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.league = this.leagueService.getLeague(id);
  }

}
const USERS_ELEMENT_DATA = [
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
  },
  {
    "id": 1,
    "date": "2017-09-08",
  },
  {
    "id": 2,
    "date": "2017-09-15",
  }
];
