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
      // leagueService.setSelectedLeague(undefined);
      console.log("New WelcomeComponent");
    }


  ngOnInit() {  
    this.leagueService.fetchLeagues();

    this.subscription = this.leagueService.leaguesChanged.subscribe(
      () => {
        this.leagues = this.leagueService.getLeagues();
      }
    );

  }

}
