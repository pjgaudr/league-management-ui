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

  playerDisplayedColumns = ['id', 'name', 'email', 'position'];
  playerDataSource = new MatTableDataSource(PLAYERS_ELEMENT_DATA);

  gameDisplayedColumns = ['id', 'date', 'asked', 'in', 'out'];
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
