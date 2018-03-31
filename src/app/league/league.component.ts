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

