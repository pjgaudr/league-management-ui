import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../_services/league.service';
import { MatChip, MatChipList } from '@angular/material';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  leagues = [];
  subscription;

  constructor(
    private leagueService: LeagueService) {
    }

  ngOnInit() {  
    this.leagueService.initialize();

    this.subscription = this.leagueService.leaguesChanged.subscribe(
      (leagues) => {
        this.leagues = leagues;
      }
    );

  }

}
