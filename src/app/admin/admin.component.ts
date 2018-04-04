import { Component, OnInit } from '@angular/core';
import { MatDatepicker, MatSort } from '@angular/material';
import { LeagueService } from '../_services/league.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  leagues = [];
  subscription;
  selectedOption = 1;
 
  constructor(
    private leagueService: LeagueService) { }

  ngOnInit() {
    this.leagues = this.leagueService.getLeagues();
    this.subscription = this.leagueService.leaguesChanged.subscribe(
      () => {
        this.leagues = this.leagueService.getLeagues();
      }
    );
  }
}
