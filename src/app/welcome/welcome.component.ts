import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../league.service';
import { MatChip, MatChipList } from '@angular/material';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  title = 'the Hockey League Management App';

  leagues = [];
  subscription;

  constructor(
    private leagueService: LeagueService) {

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
