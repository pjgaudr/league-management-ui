import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LeagueService } from '../league.service';
import { MatTableDataSource, MatSlideToggle, MatMenu } from '@angular/material';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  league;

  gameDisplayedColumns = ['date', 'available', 'inviteStatus', 'menu'];
  gameDataSource = new MatTableDataSource(GAMES_ELEMENT_DATA);

  constructor(
    private route: ActivatedRoute,
    private leagueService: LeagueService
  )
  { 
    console.log("New LeagueComponent");
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.league = this.leagueService.getLeague(id);
  }
}

const GAMES_ELEMENT_DATA = [
  {
    "id": 0,
    "date": "2017-09-01",
    "available": true,
    "inviteStatus": "Declined",
  },
  {
    "id": 1,
    "date": "2017-09-08",
    "available": true,
    "inviteStatus": "Accepted",
  },
  {
    "id": 2,
    "date": "2017-09-15",
    "available": true,
    "inviteStatus": "Invited",
  },
  {
    "id": 3,
    "date": "2017-09-22",
    "available": false,
    "inviteStatus": "--",
  }
  {
    "id": 4,
    "date": "2017-09-29",
    "available": true,
    "inviteStatus": "--",
  }
];